from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS
from datetime import datetime, timedelta
import joblib
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor


app = Flask(__name__)
cors = CORS(app, resources={
    r"/chart": {"origins": "http://localhost:3000"},
    r"/notifs": {"origins": "http://localhost:3000"},
    r"/predict": {"origins": "http://localhost:3000"},
    r"/today": {"origins": "http://localhost:3000"},
    r"/compare": {"origins": "http://localhost:3000"},
    # r"/train": {"origins": "http://localhost:3000"},
})


# Load pre-trained machine learning model
model = joblib.load('random_forest_model_new.pkl')



from xgboost import XGBRegressor
from sklearn.ensemble import RandomForestRegressor




@app.route('/chart', methods=['GET', 'POST'])
def chart_predict():
    try:
        
        # Get input data from the frontend
        data = request.json
        print(data)
        Commodity = int(data['commodity'])
        start_day = int(data['start_day'])
        start_month = int(data['start_month'])
        start_year = int(data['start_year'])
        end_day = int(data['end_day'])
        end_month = int(data['end_month'])
        end_year = int(data['end_year'])
        state = int(data.get('state'))  # Default value is 1, update as needed
        district = int(data.get('district'))  # Default value is 17, update as needed
        market = int(data.get('market'))  # Default value is 109, update as needed
    
        # Create a start date and end date object
        start_date = datetime(start_year, start_month, start_day)
        end_date = datetime(end_year, end_month, end_day)
        state_name = state
        district_name = district
        market_center_name = market

        # Initialize an empty list to store predictions
        predictions = []

        # Loop through the date range and make predictions
        while start_date <= end_date:
            # Extract relevant features from the current date
            # Modify these as needed to match your dataset
            # state_name = 1
            # district_name = 1
            # market_center_name = 1
            Commodity = Commodity
            # state_name = 1
            # district_name = 17
            # market_center_name = 109
            Variety = 2
            group_name = 1
            Arrival = 118
            day = start_date.day
            month = start_date.month
            year = start_date.year

            # Perform predictions using your model
            feature_values = [Commodity, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
            prediction = model.predict([feature_values])

            # Append the prediction to the list
            predictions.append({
                'date': start_date.strftime('%d-%m-%Y'),
                'modal': prediction[0][0],
                'min': prediction[0][1],
                'max': prediction[0][2]
            })

            # Increment the date by one day
            start_date += timedelta(days=1)

        # Construct the response with predictions
        response = {'predictions': predictions}
        return jsonify(response)

    except Exception as e:
        # Handle exceptions
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors

@app.route('/notifs', methods=['GET', 'POST'])
def notifs_predict():
    try:
        # Calculate the end date as 10 days from the current date
        current_date = datetime.now().date()
        end_date = current_date + timedelta(days=3)

        # Initialize an empty list to store predictions
        all_predictions = []

        # Loop through commodities 1 to 3
        for commodity in range(1, 4):  # Assumes 1 is tomatoes, 2 is onions, 3 is potatoes
            commodity_predictions = []

            # Reset the current_date for each commodity
            current_date = datetime.now().date()

            # Loop through the date range and make predictions
            while current_date <= end_date:
                # Extract relevant features from the current date
                # Modify these as needed to match your dataset
                state_name = 1
                district_name = 17
                market_center_name = 109
                Variety = 2
                group_name = 1
                Arrival = 118
                day = current_date.day
                month = current_date.month
                year = current_date.year

                # Perform predictions using your model
                feature_values = [commodity, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
                prediction = model.predict([feature_values])

                # Append the prediction to the list
                commodity_predictions.append({
                    'date': current_date.strftime('%d-%m-%Y'),
                    'modal': prediction[0][0],
                    'min': prediction[0][1],
                    'max': prediction[0][2],
                    'commodity': commodity
                })

                # Increment the date by one day
                current_date += timedelta(days=1)

            # Append the commodity predictions to the all_predictions list
            all_predictions.extend(commodity_predictions)

        # Construct the response with all predictions
        response = {'predictions': all_predictions}
        return jsonify(response)

    except Exception as e:
        # Handle exceptions
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors



# @app.route('/predict', methods=['GET', 'POST'])
# def predict_price():
#     try:
#         # Handle the incoming data
#         input_data = request.get_json()  # Assuming the data is sent as JSON
#         print(input_data)
        
#         # Extract relevant features from the input data
#         Commodity = input_data.get('Commodity')
#         state_name = input_data.get('state_name')
#         district_name = input_data.get('district_name')
#         market_center_name = input_data.get('market_center_name')
#         Variety = input_data.get('variety_name')
#         group_name = input_data.get('group_name')
#         Arrival = 118
#         day = input_data.get('day')
#         month = input_data.get('month')
#         year = input_data.get('year')

#         # Perform predictions using your model
#         feature_values = [Commodity, state_name, district_name, market_center_name,Variety, group_name, Arrival, day, month, year]
#         prediction = model.predict([feature_values])

#         # Construct the response with the prediction result
#         response = {
#             'modal': prediction[0][0],
#             'min': prediction[0][1],
#             'max': prediction[0][2],
#         }

#         return jsonify(response)

#     except Exception as e:
#         # Handle exceptions, e.g., invalid input data
#         error_response = {
#             'error_message': str(e)
#         }
#         return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors

@app.route('/predict', methods=['GET', 'POST'])
def predict_price():

    # Read dataset from a CSV file 
    dataset_path = 'src/static/agmarket_dataset.csv'
    dataset = pd.read_csv(dataset_path)
    print(dataset)

    # Retrieve data from the request (commodity, district, market, and training data)
    print("entered loop")
    data = request.get_json()

    # Commodity = input_data.get('Commodity')
    print(data)
    print("yesss")
    commodity = int(data['Commodity'])
    district = int(data['district_name'])
    market = int(data['market_center_name'])
    day = int(data['day'])
    month = int(data['month'])
    year = int(data['year'])
    # training_data = pd.DataFrame(data['training_data'])

    # Filter the training data based on the selected commodity, district, and market
    selected_data = dataset[(dataset['Commodity'] == int(commodity)) & 
                                  (dataset['District'] == int(district)) & 
                                  (dataset['Market'] == int(market))]
     # Filter the dataset based on the selected commodity
    # selected_data = dataset[dataset['Commodity'] == 1]
    print("Unique Commodity values in the dataset:", dataset['Commodity'].unique())

    print("Selected Commodity value:", commodity)

    
    


    # selected_data = [(dataset['Commodity'] == commodity)]
    print(selected_data)
   

     # Check if there is data to train the models
    if selected_data.empty:
        return jsonify({'error': 'No data available for the specified conditions'})

    # Feature selection
    selected_features = selected_data[[ 'Day', 'Month', 'Year']]
    target = selected_data[['MODAL','MIN', 'MAX']]

    # Train Random Forest model
    rf_model = RandomForestRegressor()
    rf_model.fit(selected_features, target)

    # Train XGBoost model
    xgb_reg = XGBRegressor(random_state=42)
    xgb_reg.fit(selected_features, target)

    # Save the trained models (you might want to use a more robust serialization method)
    joblib.dump(rf_model, 'rf_model.joblib')
    joblib.dump(xgb_reg, 'xgb_model.joblib')

    # feature_values = [Commodity, state_name, district_name, market_center_name,Variety, group_name, Arrival, day, month, year]
    input_data = pd.DataFrame({'Day': day, 'Month': month, 'Year': year} , index=[0])
    # input_data = pd.DataFrame({'Day': day, 'Month': month, 'Year': year})

    # input_data_2d = input_data.values.reshape(1, -1)
    
    rf_prediction = rf_model.predict(input_data)
    print(rf_prediction)
    xgb_prediction = xgb_reg.predict(input_data)
    print(xgb_prediction)

        # Construct the response with the prediction result
    response = {
            'modal': (rf_prediction[0][0] + xgb_prediction[0][0]) / 2,
            'min': (rf_prediction[0][1] + xgb_prediction[0][1]) / 2,
            'max': (rf_prediction[0][2] + xgb_prediction[0][2]) / 2,
            
        }
    return jsonify(response)






    # return jsonify({'message': 'Models trained and saved successfully'})

@app.route('/today', methods=['GET','POST'])
def today_price():
    try:
        current_date = datetime.now().date()

         # Read dataset from a CSV file 
        dataset_path = 'src/static/agmarket_dataset.csv'
        dataset = pd.read_csv(dataset_path)
        print(dataset)

        commodities = {
            'Tomato': 1,
            'Potato': 2,
            'Onion': 3,
        }

        # Initialize an empty dictionary to store responses
        predictions = {}
        
        # state_name = 1
        # district_name = 1
        # market_center_name = 1
        day = current_date.day
        month = current_date.month
        year = current_date.year

        for commodity, commodity_value in commodities.items():
            selected_data = dataset[(dataset['Commodity'] == commodity_value) & 
                                      (dataset['District'] == 1) & 
                                      (dataset['Market'] == 1)]
            print(selected_data)

            if not selected_data.empty:
                # Feature selection
                selected_features = selected_data[['Day', 'Month', 'Year']]
                target = selected_data[['MODAL', 'MIN', 'MAX']]

                # Train Random Forest model
                rf_model = RandomForestRegressor()
                rf_model.fit(selected_features, target)

                # Train XGBoost model
                xgb_reg = XGBRegressor(random_state=42)
                xgb_reg.fit(selected_features, target)

                # Save the trained models (you might want to use a more robust serialization method)
                joblib.dump(rf_model, f'rf_model_{commodity}.joblib')
                joblib.dump(xgb_reg, f'xgb_model_{commodity}.joblib')

                # feature_values = [commodity_value, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
                input_data = pd.DataFrame({'Day': [day], 'Month': [month], 'Year': [year]}, index=[0])

                rf_prediction = rf_model.predict(input_data)
                print(rf_prediction)
                xgb_prediction = xgb_reg.predict(input_data)
                print(xgb_prediction)

                # Construct the response with the prediction result
                predictions[commodity] = {
                    'modal': (rf_prediction[0][0] + xgb_prediction[0][0]) / 2,
                    'min': (rf_prediction[0][1] + xgb_prediction[0][1]) / 2,
                    'max': (rf_prediction[0][2] + xgb_prediction[0][2]) / 2,
                }

        # Return predictions for all commodities
        return jsonify(predictions)

    except Exception as e:
        # Handle exceptions, e.g., invalid input data
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400
    
@app.route('/compare', methods=['GET','POST'])
def compare_price():
    try:
        data = request.json
        print(data)
        # Extract parameters from the request
        state_name = data['state']
        district_name = data['district']
        day = data['day']
        month = data['month']
        year = data['year']
        market_values = data['markets']
        Variety = 2
        group_name = 1
        Arrival = 118

        # Sample commodities
        commodities = {
            'Onion': 2,
            'Tomato': 1,
            'Potato': 3
        }

        # Initialize an empty dictionary to store responses
        predictions = {}

        for commodity, commodity_value in commodities.items():
            # Assuming your model features are in the following order
            feature_values = [commodity_value, state_name, district_name, None, Variety, group_name, Arrival, day, month, year]

            # Loop through market values and make predictions
            for market_value in market_values:
                # Update market center name for each iteration
                feature_values[3] = market_value

                # Perform predictions using your model
                prediction = model.predict([feature_values])

                # Store the prediction in the dictionary
                predictions.setdefault(commodity, {})[market_value] = {
                    'modal': prediction[0][0],
                    'min': prediction[0][1],
                    'max': prediction[0][2],
                }
            
            print(predictions)

        return jsonify(predictions)

    except Exception as e:
        # Handle exceptions, e.g., invalid input data
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400

if __name__ == '__main__':
    app.run(debug=True)
