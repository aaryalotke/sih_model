from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
cors = CORS(app, resources={
    r"/chart": {"origins": "http://localhost:3000"},
    r"/notifs": {"origins": "http://localhost:3000"},
    r"/predict": {"origins": "http://localhost:3000"},
    r"/today": {"origins": "http://localhost:3000"},
     r"/compare": {"origins": "http://localhost:3000"},
})

# Load your pre-trained machine learning model
model = joblib.load('random_forest_model_new.pkl')

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



@app.route('/predict', methods=['GET', 'POST'])
def predict_price():
    try:
        # Handle the incoming data
        input_data = request.get_json()  # Assuming the data is sent as JSON
        
        # Extract relevant features from the input data
        Commodity = input_data.get('Commodity')
        state_name = input_data.get('state_name')
        district_name = input_data.get('district_name')
        market_center_name = input_data.get('market_center_name')
        Variety = input_data.get('variety_name')
        group_name = input_data.get('group_name')
        Arrival = 118
        day = input_data.get('day')
        month = input_data.get('month')
        year = input_data.get('year')

        # Perform predictions using your model
        feature_values = [Commodity, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
        prediction = model.predict([feature_values])

        # Construct the response with the prediction result
        response = {
            'modal': prediction[0][0],
            'min': prediction[0][1],
            'max': prediction[0][2],
        }

        return jsonify(response)

    except Exception as e:
        # Handle exceptions, e.g., invalid input data
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors

@app.route('/today', methods=['GET','POST'])
def today_price():
    try:
        current_date = datetime.now().date()

        commodities = {
            'Onion': 2,
            'Tomato': 1,
            'Potato': 3
        }

        # Initialize an empty dictionary to store responses
        predictions = {}
        
        state_name = 1
        district_name = 17
        market_center_name = 109
        Variety = 2
        group_name = 1
        Arrival = 118
        day = current_date.day
        month = current_date.month
        year = current_date.year

        # Loop through commodities and make predictions
        for commodity, commodity_value in commodities.items():
            # Perform predictions using your model
            feature_values = [commodity_value, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
            prediction = model.predict([feature_values])

            # Store the prediction in the dictionary
            predictions[commodity] = {
                'modal': prediction[0][0],
                'min': prediction[0][1],
                'max': prediction[0][2],
            }
           
            print("predictions",predictions)
            print("onion", predictions['Onion']['modal'])
            # print("onion",predictions[2])

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
