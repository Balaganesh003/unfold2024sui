import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler
import pickle

# Example training data with 6 features
data = {
    'accountAge': [5, 3, 8, 10],
    'balance': [5000, 15000, 3000, 20000],
    'noOfTransactions': [100, 200, 50, 300],
    'numberOfContracts': [10, 20, 5, 15],
    'totalVolume': [200000, 300000, 50000, 400000],
    'uniqueCounterParties': [5, 10, 2, 8]
}

# Combine all features into a 2D array (each row is a data point)
features = np.array(list(zip(
    data['accountAge'],
    data['balance'],
    data['noOfTransactions'],
    data['numberOfContracts'],
    data['totalVolume'],
    data['uniqueCounterParties']
)))

# Normalize the data using MinMaxScaler
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(features)

# Sample target reputation scores
y = np.array([80, 90, 60, 85])

# Initialize and train the Random Forest model
model = RandomForestRegressor(n_estimators=100)
model.fit(scaled_data, y)

# Save the trained model and the scaler to disk
with open("reputation_model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

with open("scaler.pkl", "wb") as scaler_file:
    pickle.dump(scaler, scaler_file)

print("Model and scaler saved successfully.")