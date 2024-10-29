import React, { useContext } from "react";
import "./Cards.css";
import { Button, Card, Row } from "antd";
import { TransactionsContext } from "../../context/TransactionsContext";

interface CardsProps {
  showIncomeModal: () => void;
  showExpenseModal: () => void;
}

const Cards: React.FC<CardsProps> = ({ showIncomeModal, showExpenseModal }) => {
  const { totalIncome, totalExpense, totalBalance } =
    useContext(TransactionsContext)!;

  return (
    <div className="card">
      <Row className="balance-row">
        <Card
          className="balance-card-available"
          title="Total available"
          headStyle={{ borderBottom: "none", fontSize: "2rem" }}
        >
          <p className="total-balance">${totalBalance}</p>
        </Card>
        <Card
          className="balance-card"
          title="Total income"
          headStyle={{ borderBottom: "none", fontSize: "25px" }}
        >
          <p className="in-ex">${totalIncome}</p>
          <Button type="primary" block onClick={showIncomeModal}>
            Add income
          </Button>
        </Card>
        <Card
          className="balance-card"
          title="Total expenses"
          headStyle={{ borderBottom: "none", fontSize: "25px" }}
        >
          <p className="in-ex">${totalExpense}</p>
          <Button type="primary" block onClick={showExpenseModal}>
            Add expense
          </Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
