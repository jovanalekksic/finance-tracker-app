# Personal Finance Tracker (React + TypeScript + Vite)

This project is a personal finance tracking application built with React (using Vite for fast bundling and Ant Design for UI) and json-server to mock a backend for transaction data. Users can add, edit, and delete transactions, filter by category, and view details of each transaction.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#set-up-instructions)
- [Running the Application](#running-the-application)
- [Usage](#usage)

## Features

- Track income and expenses
- Filter transactions by category
- Add, edit, and delete transactions
- View transaction details in a modal
- View total balance, income, and expense summary

## Technologies used

- React with Vite for fast, optimized builds
- Ant Design for UI components
- JSON Server to simulate a backend API for transactions data
- Axios for HTTP requests

## Setup Instructions

1.  **Clone the repository**:

    ```sh
    git clone https://github.com/jovanalekksic/finance-tracker-app
    ```

2.  **Navigate to the project directory**:

    ```sh
    cd finance-tracker-app
    ```

3.  **Install Dependencies**

    ```sh
    npm install
    ```

4.  **Set up JSON Server**

    1. Create a transactions.json file in the root directory:

       ```sh
       {
          "transactions": [
          {
          "id": "1",
          "description": "Employment",
          "amount": 5000,
          "type": "income",
          "category": "Employment",
          "date": "2024-06-01"
          },
          {
          "id": "2",
          "description": "Groceries",
          "amount": -150,
          "type": "expense",
          "category": "Groceries",
          "date": "2024-06-02"
          }
       }


       ```

## Running the Application

1. **Start JSON Server**
   ```sh
        json-server --watch transactions.json --port 5000
   ```
2. **Start the React Application:** Open another terminal window and run:
   ```sh
        npm run dev
   ```
   The application should now be running at http://localhost:5173

## Usage

1. **Adding Transactions:** Use the "Add Income" or "Add Expense" buttons to add a new transaction. A modal will appear to enter transaction details.
2. **Filtering Transactions:** Filter transactions by category in the transactions table.
3. **Editing or Deleting Transactions:** Click on a transaction to open a details modal, and choose "Edit" or "Delete" for respective actions.

Make sure JSON Server is running on port 5000, as the app expects it at http://localhost:5000/transactions. If you need to use a different port, update the URLs in TransactionsContext.tsx.
