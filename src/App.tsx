import { useContext, useState } from "react";
import "./App.css";
import Header from "./components/Headers/Header";
import Cards from "./components/Cards/Cards";
import AddExpenseModal from "./components/Modals/AddExpenseModal";
import AddIncomeModal from "./components/Modals/AddIncomeModal";
import { TransactionsContext } from "./context/TransactionsContext";
import TransactionsTable from "./components/Table/TransactionsTable";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

function App() {
  const [isVisibleExpense, setIsVisibleExpense] = useState(false);
  const [isVisibleIncome, setIsVisibleIncome] = useState(false);

  const showIncomeModal = () => {
    setIsVisibleIncome(true);
  };

  const showExpenseModal = () => {
    setIsVisibleExpense(true);
  };

  const handleCancelIncomeModal = () => {
    setIsVisibleIncome(false);
  };

  const handleCancelExpenseModal = () => {
    setIsVisibleExpense(false);
  };

  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useContext(TransactionsContext)!;

  const handleEditTransaction = (updatedTransaction: Transaction) => {
    updateTransaction(updatedTransaction);
  };

  const handleDeleteTransaction = (id: number) => {
    deleteTransaction(id);
  };

  const onFinish = (values: any, type: string) => {
    addTransaction({
      ...values,
      type,
      amount: type === "expense" ? -Math.abs(values.amount) : values.amount,
    });
  };

  return (
    <>
      <Header />
      <Cards
        showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
      />

      <AddIncomeModal
        isIncomeModalVisible={isVisibleIncome}
        handleIncomeCancel={handleCancelIncomeModal}
        onFinish={onFinish}
      />
      <AddExpenseModal
        isExpenseModalVisible={isVisibleExpense}
        handleExpenseCancel={handleCancelExpenseModal}
        onFinish={onFinish}
      />

      <TransactionsTable
        transactions={transactions}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </>
  );
}

export default App;
