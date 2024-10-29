// In TransactionsContext.tsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  addTransaction: (newTransaction: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (updatedTransaction: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

export const TransactionsContext = createContext<
  TransactionsContextType | undefined
>(undefined);

export const TransactionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const calculateTotals = (transactions: Transaction[]) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount);
      if (transaction.type === "income") {
        income += amount;
      } else {
        expense -= amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalBalance(income - expense);
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>(
        "http://localhost:5000/transactions"
      );
      setTransactions(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const addTransaction = async (newTransaction: Omit<Transaction, "id">) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/transactions",
        newTransaction
      );
      const updatedTransactions = [...transactions, response.data];
      setTransactions(updatedTransactions);
      calculateTotals(updatedTransactions);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };
  const updateTransaction = async (updatedTransaction: Transaction) => {
    try {
      await axios.put(
        `http://localhost:5000/transactions/${updatedTransaction.id}`,
        updatedTransaction
      );
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      );
      setTransactions(updatedTransactions);
      calculateTotals(updatedTransactions);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
      calculateTotals(updatedTransactions);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpense,
        totalBalance,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
