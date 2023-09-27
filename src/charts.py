from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

app = Flask(__name__)

# Load your pre-trained machine learning model
model = joblib.load('random_forest_model_new.pkl')

@app.route('/chart', methods=['POST'])
def predict():
    try:
        # Get input data from the frontend
        data = request.json
        start_day = int(data['start_day'])
        start_month = int(data['start_month'])
        start_year = int(data['start_year'])
        end_day = int(data['end_day'])
        end_month = int(data['end_month'])
        end_year = int(data['end_year'])
    


        # Create a start date and end date object
        start_date = datetime(start_year, start_month, start_day)
        end_date = datetime(end_year, end_month, end_day)

        # Initialize an empty list to store predictions
        predictions = []

        # Loop through the date range and make predictions
        while start_date <= end_date:
            # Extract relevant features from the current date
            # Modify these as needed to match your dataset
            Commodity = 1
            state_name = 1
            district_name = 17
            market_center_name = 109
            Variety = 2
            group_name = 1
            Arrival = 192
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

if __name__ == '__main__':
    app.run(debug=True)
