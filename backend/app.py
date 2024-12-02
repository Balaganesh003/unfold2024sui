from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS 


app = Flask(__name__)

CORS(app)

# Load the trained model and scaler
with open('reputation_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

# Function to generate a summary based on input data
def generate_summary(account_data):
    accountAge,balance,noOfTransactions,numberOfContracts,totalVolume,uniqueCounterParties = account_data
    return (
        f"The account has been active for {accountAge} days, with a balance of ${balance}. "
        f"Over the course of {noOfTransactions} transactions, it has developed {uniqueCounterParties} unique counterparties "
        f"and entered into {numberOfContracts} contracts, with a total volume of ${totalVolume}. "
        f"This indicates a stable and trustworthy account."
    )

# API endpoint to accept real-time data and return reputation score and summary
@app.route('/update_data', methods=['POST'])
def update_data():
    data = request.json
    
    # Correctly extract fields from the object sent by the frontend
    account_data = [
        data.get('account_data', {}).get('accountAge', 0),
        data.get('account_data', {}).get('balance', 0),
        data.get('account_data', {}).get('noOfTransactions', 0),
        data.get('account_data', {}).get('numberOfContracts', 0),
        data.get('account_data', {}).get('totalVolume', 0),
        data.get('account_data', {}).get('uniqueCounterParties', 0),
    ]

    # Validate the data
    if len(account_data) != 6:
        return jsonify({"error": "Input data must have exactly 6 features"}), 400

    try:
        # Scale the data and make predictions
        scaled_data = scaler.transform([account_data])
        reputation_score = model.predict(scaled_data)[0]

        # Generate summary
        summary = generate_summary(account_data)

        return jsonify({
            "reputation_score": float(reputation_score),
            "summary": summary
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run( port=5000)
