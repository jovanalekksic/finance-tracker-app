import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useState } from "react";
import "./TransactionsTable.css";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: number) => void;
}

function TransactionsTable({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}: TransactionsTableProps) {
  const [filterCategory, setFilterCategory] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const columns = [
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, transaction: Transaction) => (
        <>
          <Button
            onClick={(event) => handleEditClick(transaction, event)}
            className="button-actions"
          >
            Edit
          </Button>
          <Button
            danger
            onClick={(event) => handleDeleteClick(transaction, event)}
            className="button-actions"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleRowClick = (record: Transaction) => {
    setSelectedTransaction(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleEditClick = (
    transaction: Transaction,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setSelectedTransaction(transaction);
    setIsEditModalVisible(true);
  };

  const handleDeleteClick = (
    transaction: Transaction,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setSelectedTransaction(transaction);
    setIsDeleteModalVisible(true);
  };

  const handleEditFinish = (updatedTransaction: Transaction) => {
    if (selectedTransaction) {
      onEditTransaction({ ...selectedTransaction, ...updatedTransaction });
      setIsEditModalVisible(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setIsDeleteModalVisible(false);
    }
  };

  let filteredTransactionsCategory = transactions.filter((item) =>
    item.category.includes(filterCategory)
  );

  return (
    <div className="table-wrap">
      <div className="table">
        <h1>Previous transactions</h1>
        <div className="select-category">
          <label htmlFor="category-filter" className="filter-label">
            Filter by Category:{" "}
          </label>
          <Select
            defaultValue="lucy"
            value={filterCategory}
            style={{ width: 200 }}
            onChange={(value) => setFilterCategory(value)}
            options={[
              { value: "", label: "All" },
              { value: "Employment", label: "Employment" },
              { value: "Freelancing", label: "Freelancing" },
              { value: "Gifts", label: "Gifts" },
              { value: "Travel", label: "Travel" },
              { value: "Investment", label: "Investment" },
              { value: "Bonuses", label: "Bonuses" },
              { value: "Housing", label: "Housing" },
              { value: "Groceries", label: "Groceries" },
              { value: "Health & Fitness", label: "Health & Fitness" },
            ]}
          />
        </div>

        <Table
          dataSource={filteredTransactionsCategory}
          columns={columns}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          className="table-component"
        />

        {/* Modal for Transaction Details */}
        <Modal
          title="Transaction Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
          {selectedTransaction && (
            <div>
              <p>
                <strong>Description:</strong> {selectedTransaction.description}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedTransaction.amount}
              </p>
              <p>
                <strong>Type:</strong> {selectedTransaction.type}
              </p>
              <p>
                <strong>Category:</strong> {selectedTransaction.category}
              </p>
              <p>
                <strong>Date:</strong> {selectedTransaction.date}
              </p>
            </div>
          )}
        </Modal>

        {/* Edit Modal */}
        <Modal
          title="Edit Transaction"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
        >
          {selectedTransaction && (
            <Form
              initialValues={selectedTransaction}
              onFinish={handleEditFinish}
            >
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
              <Form.Item name="amount" label="Amount">
                <Input type="number" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
          )}
        </Modal>

        {/* Delete Modal */}
        <Modal
          title="Confirm Delete"
          visible={isDeleteModalVisible}
          onOk={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalVisible(false)}
          okText="Yes, Delete"
          cancelText="No"
        >
          <p>Are you sure you want to delete this transaction?</p>
        </Modal>
      </div>
    </div>
  );
}

export default TransactionsTable;
