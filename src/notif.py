from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
cors = CORS(app, resources={r"/notifs": {"origins": "http://localhost:3000"}})

# Load your pre-trained machine learning model
model = joblib.load('random_forest_model_new.pkl')

@app.route('/notifs', methods=['GET', 'POST'])
def predict():
    try:
        # Get the current date
        current_date = datetime.now().date()
        print(current_date.day)
        
        # Calculate the end date as 7 days from the current date
        end_date = current_date + timedelta(days=10)

        # Initialize an empty list to store predictions
        predictions = []

        # Loop through the date range and make predictions
        while current_date <= end_date:
            # Extract relevant features from the current date
            # Modify these as needed to match your dataset
            Commodity = 1
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
            feature_values = [Commodity, state_name, district_name, market_center_name, Variety, group_name, Arrival, day, month, year]
            prediction = model.predict([feature_values])

            # Append the prediction to the list
            predictions.append({
                'date': current_date.strftime('%d-%m-%Y'),
                'modal': prediction[0][0],
                'min': prediction[0][1],
                'max': prediction[0][2]
            })

            # Increment the date by one day
            current_date += timedelta(days=1)

        # Construct the response with predictions
        response = {'predictions': predictions}
        return jsonify(response)

    except Exception as e:
        # Handle exceptions
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors

if __name__ == '__main__':
    app.run(debug=True)
