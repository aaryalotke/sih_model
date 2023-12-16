from flask import Flask, jsonify, request
from flask_cors import CORS

from firebase_admin import credentials, firestore, db
import firebase_admin

import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestRegressor
import xgboost as xgb
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split

from datetime import datetime, timedelta
import holidays

import plotly.express as px

cred = credentials.Certificate("./permissions.json")

firebase_admin.initialize_app(cred)

app = Flask(__name__)
cors = CORS(app)

df = pd.read_csv("food_sales2.csv")
df = df.dropna()

all_dish_id = df['DishID'].unique()

db = firestore.client()

dishes = db.collection("products")

le = LabelEncoder()
df_with_id = df
df_with_id['Vegetarian'] = le.fit_transform(df_with_id['Vegetarian'])
df_with_id['DayOfWeek'] = le.fit_transform(df_with_id['DayOfWeek'])

def generate_transactions(date, vegetarian_value, price_value, dishID_value):
    return [{'Date': date,
             'DishID': dishID_value,
             'Vegetarian': vegetarian_value,
             'Price': price_value,
             'DayOfWeek': date.strftime('%A'),
             'Occasion': get_occasion_name(date)}]
    
def get_occasion_name(date):
    india_holidays = holidays.India(years=[date.year])
    occasion_name = india_holidays.get(date)
    return str(occasion_name) if occasion_name else 'None'

def generate_dates(start_date, end_date):
    date_range = (end_date - start_date).days
    return [start_date + timedelta(days=i) for i in range(date_range + 1)]

start_date = datetime(2023, 1, 1)
end_date = datetime(2023, 1, 31)
date_range = pd.date_range(start_date, end_date)

all_dates = generate_dates(start_date, end_date)

next_day_date = datetime.strptime('02-01-2023', '%d-%m-%Y').strftime('%Y-%m-%d')


@app.route("/dishes/update/<int:dishId>")
def update(dishId):
    
    dish_ref = dishes.document(str(dishId))
    dish = dish_ref.get().to_dict()
    dish["price"] = 100
    dish_ref.set(dish)

    return jsonify({"success": True}), 200

@app.route("/dishes/read/<string:dishId>")
def read(dishId):
    
    dish = dishes.document(dishId).get()
    return jsonify(dish.to_dict()), 200

@app.route("/dishes/create")
def create():
    all_dish_data = []
    
    for dish in dishes.stream():
        dish_data = dish.to_dict()
        all_dish_data.append(dish_data)
        
    last_element_id = all_dish_data[-1]['id']
    
    description = "Created"
    name = "Tandoori"
    price = 300
    
    dishes.document(str(last_element_id + 1)).set({"description": description, "name": name, "id": last_element_id + 1, "price": price})
    return jsonify({"success": True}), 200

@app.route("/dishes/delete/<string:dishId>")
def delete(dishId):
    
    dishes.document(dishId).delete()

    return jsonify({"success": True}), 200


@app.route("/dishes/alldishes")
def all_dish():
    all_dish_data = []
    
    for doc_snapshot in dishes.stream():
        doc_data = doc_snapshot.to_dict()
        all_dish_data.append(doc_data)
    
    return jsonify({"documents": all_dish_data}), 200

@app.route("/dishes/topdish", methods=['GET', 'POST'])
def top_dish():
    future_df_for_all_dishes = pd.DataFrame(columns=['DishID', 'Total Quantity Sales'])
    next_day_df = pd.DataFrame(columns=['DishID', 'Quantity Sales'])
    for i in all_dish_id:
        dish_1_data = df_with_id[df_with_id['DishID'] == i]
        vegetarian_value = dish_1_data.at[dish_1_data.index[1], 'Vegetarian']
        price_value = dish_1_data.at[dish_1_data.index[1], 'Price']
        dishID_value = dish_1_data.at[dish_1_data.index[1], 'DishID']

        all_transactions = [transaction for date in all_dates for transaction in generate_transactions(date, vegetarian_value, price_value, dishID_value)]
        # all_transactions_df = pd.DataFrame([all_transactions])
        # future_X = pd.DataFrame(columns=['Date','DishID', 'Vegetarian', 'Price', 'DayOfWeek', 'Occasion'])
        future_X = pd.DataFrame(all_transactions, columns=['Date', 'DishID', 'Vegetarian', 'Price', 'DayOfWeek', 'Occasion'])
        # future_X = pd.concat([future_X, all_transactions_df], ignore_index=True)

        future_X.set_index('Date', inplace=True)

        no_of_unique_occasion = future_X['Occasion'].unique()
        dish_1_data = dish_1_data[dish_1_data['Occasion'].isin(no_of_unique_occasion)]
        future_X = pd.get_dummies(future_X, columns=['Occasion'], prefix='Occasion')
        future_X['DayOfWeek'] = le.fit_transform(future_X['DayOfWeek'])

        dish_1_data['Date'] = pd.to_datetime(dish_1_data['Date'])
        dish_1_data = dish_1_data.sort_values(by='Date')

        features = ['DishID', 'Vegetarian', 'Price', 'DayOfWeek', 'Occasion']
        target = 'QuantitySold'

        df_encoded = pd.get_dummies(dish_1_data[features + [target]])

        train_size = int(0.8 * len(df_encoded))
        train, test = df_encoded.iloc[:train_size, :], df_encoded.iloc[train_size:, :]

        X_train, y_train = train.drop(target, axis=1), train[target]
        X_test, y_test = test.drop(target, axis=1), test[target]

        model_rf = RandomForestRegressor()
        model_rf.fit(X_train, y_train)

        y_pred = model_rf.predict(X_test)

        future_y_pred = model_rf.predict(future_X)

        xgb_model = xgb.XGBRegressor(objective="reg:squarederror", random_state=42)
        xgb_model.fit(X_train, y_train)

        y_pred_xgb = model_rf.predict(X_test)

        future_y_pred_xgb = model_rf.predict(future_X)

        ensemble_model = GradientBoostingRegressor(n_estimators=100, random_state=42)

        ensemble_train_data = np.column_stack((y_pred_xgb, y_pred))
        ensemble_model.fit(ensemble_train_data, y_test)

        ensemble_predictions_gbr = ensemble_model.predict(ensemble_train_data)

        ensemble_future_data = np.column_stack((future_y_pred_xgb, future_y_pred))

        future_y_pred_ensemble_gbr = ensemble_model.predict(ensemble_future_data)

        future_results_df_ensemble_gbr = pd.DataFrame({'Predicted': future_y_pred_ensemble_gbr}, index=future_X.index)

        future_results_df_ensemble_gbr['Predicted'] = future_results_df_ensemble_gbr['Predicted'].round().astype(int)
        
        row_next_day = future_results_df_ensemble_gbr.loc[next_day_date]
        
        if not row_next_day.empty:
            next_day_sales = row_next_day['Predicted']

        total_quant = future_results_df_ensemble_gbr["Predicted"].sum()

        add_dish_in_total_pred = {"DishID": i, "Total Quantity Sales": total_quant}
        add_dish_in_total_pred = pd.DataFrame([add_dish_in_total_pred])

        add_dish_in_next_day = {"DishID": i, "Quantity Sales": next_day_sales}
        add_dish_in_next_day = pd.DataFrame([add_dish_in_next_day])

        # future_df_for_all_dishes = future_df_for_all_dishes.append(add_dish_in_total_pred, ignore_index=True)
        future_df_for_all_dishes = pd.concat([future_df_for_all_dishes, add_dish_in_total_pred], ignore_index=True)
        # next_day_df = next_day_df.append(add_dish_in_next_day, ignore_index=True)
        next_day_df = pd.concat([next_day_df, add_dish_in_next_day], ignore_index=True)
        
        json_data_future_df_for_all_dishes = future_df_for_all_dishes.to_json(orient='records')
        json_data_next_day_df = next_day_df.to_json(orient='records')
    
    return {"document1": json_data_future_df_for_all_dishes, "document2": json_data_next_day_df}



if __name__ == "__main__":
    app.run(debug=True)