from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression


app = Flask(__name__)
cors = CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Import and load your pre-trained machine learning model
# from random_forest_model.plk import load_model  # Replace with your actual model import

# model = joblib.load('random_forest_model.pkl') # Load your pre-trained model


# original_model = joblib.load('random_forest_model.pkl')
original_model: RandomForestRegressor = joblib.load('random_forest_model_new.pkl')
# joblib.dump(original_model, 'compatible_model.pkl')
@app.route('/predict', methods=['GET','POST'])


# @app.route('/test')
# def test_route():
#     return 'Test route works'

def predict():
    print("inside predicting function")
    try:
        # Handle the incoming data
        input_data = request.get_json()  # Assuming the data is sent as JSON
        print(input_data)
        print("Received headers:", request.headers)
        print("Received data:", request.data)
        
        #Extract relevant features from the input data
        Commodity = input_data.get('Commodity')
        state_name = input_data.get('state_name')
        district_name = input_data.get('district_name')
        market_center_name = input_data.get('market_center_name')
        Variety = input_data.get('Variety')
        group_name = input_data.get('group_name')
        Arrival = 192
        day = input_data.get('day')
        month = input_data.get('month')
        year = input_data.get('year')

        # Commodity = 1
        # state_name = 1
        # district_name = 17
        # market_center_name = 109
        # Variety = 2
        # group_name = 1
        # Arrival = 192
        # day = 22
        # month = 9
        # year = 2023

        # Add more features as needed

        # Perform predictions using your model
        print("before")
        #prediction = original_model.predict([[ 'Commodity', 'state_name', 'district_name', 'market_center_name', 'Variety', 'group_name', 'Arrival', 'day', 'month', 'year']])  # Replace with your model's predict function
        # original_model.set_params(feature_names=['Commodity', 'state_name', 'district_name', 'market_center_name', 'Variety', 'group_name', 'Arrival', 'day', 'month', 'year']) # Replace with your actual feature names
        # prediction = original_model.predict(feature_names)

        #trial1
        feature_values = [Commodity, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
        print(feature_values)

        # Perform predictions using your model
        prediction = original_model.predict([feature_values])
        print(prediction)
        


        print(prediction[0][0])
        print("after")
        # Construct the response with the prediction result
        response = {
            'modal': prediction[0][0], # Assuming a single prediction result
            'min': prediction[0][1], # Assuming a single prediction result
            'max': prediction[0][2],  # Assuming a single prediction result
        }
        print("incoming")
        print(response)

        return jsonify(response)

    except Exception as e:
        # Handle exceptions, e.g., invalid input data
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors

if __name__ == '__main__':
    app.run(debug=True)
