from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Import and load your pre-trained machine learning model
# from random_forest_model.plk import load_model  # Replace with your actual model import

# model = joblib.load('random_forest_model.pkl') # Load your pre-trained model
original_model = joblib.load('random_forest_model.pkl')
joblib.dump(original_model, 'compatible_model.pkl')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Handle the incoming data
        input_data = request.json  # Assuming the data is sent as JSON
        print(input_data)
        
        # Extract relevant features from the input data
        feature1 = input_data.get('feature1')
        feature2 = input_data.get('feature2')
        # Add more features as needed

        # Perform predictions using your model
        prediction = original_model.predict([[feature1, feature2]])  # Replace with your model's predict function

        # Construct the response with the prediction result
        response = {
            'prediction_result': prediction[0]  # Assuming a single prediction result
        }

        return jsonify(response)

    except Exception as e:
        # Handle exceptions, e.g., invalid input data
        error_response = {
            'error_message': str(e)
        }
        return jsonify(error_response), 400  # Return a 400 Bad Request status code for errors

if __name__ == '__main__':
    app.run(debug=True, port=8080)
