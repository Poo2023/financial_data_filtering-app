from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
API_KEY = os.getenv("API_KEY")
API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"

app = Flask(__name__)
application = app

CORS(app, resources={r"/*": {"origins": "http://financialdataapp.s3-website-us-east-1.amazonaws.com"}})


# API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=h9Sy7ZeXxljQH9kFio2wixoU6tdvJCIU"

@app.route("/data", methods=["GET"])
def get_data():
    params = request.args
    start_date = params.get("from_date")
    end_date = params.get("to_date")
    revenue_min = params.get("min_revenue")
    revenue_max = params.get("max_revenue")
    net_income_min = params.get("min_net_income")
    net_income_max = params.get("max_net_income")


    response = requests.get(API_URL)
    data = response.json()

    filtered_data = []
    for item in data:
        if start_date and item["date"] < start_date:
            continue
        if end_date and item["date"] > end_date:
            continue
        if revenue_min and float(item["revenue"]) < float(revenue_min):
            continue
        if revenue_max and float(item["revenue"]) > float(revenue_max):
            continue
        if net_income_min and float(item["netIncome"]) < float(net_income_min):
            continue
        if net_income_max and float(item["netIncome"]) > float(net_income_max):
            continue
        filtered_data.append(item)

    return jsonify({"data": filtered_data})

if __name__ == "__main__":
    app.run(port=8000, debug=True)