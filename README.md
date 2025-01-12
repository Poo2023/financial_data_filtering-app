# Financial Data Filtering App

## Overview
The Financial Data Filtering App is a web application that allows users to explore and analyze Apple Inc.'s annual income statements. Users can filter, sort, and view key financial metrics such as revenue, net income, and gross profit.

## Features
- **Data Display**:
  - Fetch and display financial data from the Financial Modeling Prep API.
  - Show key metrics: Date, Revenue, Net Income, Gross Profit, EPS, and Operating Income.
- **Filtering**:
  - Filter data by date range.
  - Filter by revenue and net income ranges.
- **Sorting**:
  - Sort data by Date, Revenue, and Net Income in ascending or descending order.
- **Responsive Design**:
  - Fully responsive layout for both desktop and mobile devices.

## Live Demo
Access the live application here: [Financial Data App](http://financialdataapp.s3-website-us-east-1.amazonaws.com/)

## Technologies Used
### Frontend:
- **React (TypeScript)**
- **TailwindCSS**

### Backend:
- **Flask** (Python)
- **Requests** library for API calls
- **Flask-CORS** for handling cross-origin requests

### Deployment:
- **Frontend**: Hosted on AWS S3 (Static Website Hosting)
- **Backend**: Deployed on AWS Elastic Beanstalk

## Installation and Setup
### Prerequisites:
- Node.js and npm installed
- Python 3.x installed

### Clone the Repository:
```bash
git clone https://github.com/your-repository/financial-data-filtering-app.git
cd financial-data-filtering-app
```

### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the backend URL:
   ```env
   REACT_APP_BACKEND_URL=http://financialdata-env.eba-mvpftxqp.us-east-1.elasticbeanstalk.com/data
   ```
4. Run the app locally:
   ```bash
   npm start
   ```

### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables (optional for security):
   ```bash
   export FLASK_APP=application.py
   export API_KEY=your_api_key
   ```
5. Run the backend locally:
   ```bash
   flask run --port=8000
   ```

### Deployment Instructions:
#### Frontend Deployment:
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Upload the build files to your S3 bucket:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

#### Backend Deployment:
1. Zip your backend code:
   ```bash
   zip -r backend.zip *
   ```
2. Deploy to Elastic Beanstalk:
   ```bash
   eb deploy
   ```

## API Reference
**Endpoint**: [https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=YOUR_API_KEY](https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=YOUR_API_KEY)

Response:
```json
[
  {
    "date": "2024-09-28",
    "revenue": 100000000,
    "netIncome": 20000000,
    "grossProfit": 50000000,
    "eps": 3.25,
    "operatingIncome": 30000000
  }
]
```

## Project Structure
```
financial-data-filtering-app/
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- .env
|-- backend/
|   |-- application.py
|   |-- requirements.txt
|-- README.md
```
## License
This project is licensed under the MIT License.

---

For questions or feedback, please contact: [your-email@example.com](mailto:poojashanmugananthan23@gmail.com).

