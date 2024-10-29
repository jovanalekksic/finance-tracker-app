import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

interface AddExpenseModalProps {
  isExpenseModalVisible: boolean;
  handleExpenseCancel: () => void;
  onFinish: (values: any, type: string) => void;
}

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}: AddExpenseModalProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields(); // Clear form fields
          handleExpenseCancel(); // Close the modal
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction.",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount." },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date." },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select a category." }]}
        >
          <Select className="select-input-2">
            <Select.Option value="Housing">Housing</Select.Option>
            <Select.Option value="Education">Utilities</Select.Option>
            <Select.Option value="Groceries">Groceries</Select.Option>
            <Select.Option value="Transportation">Transportation</Select.Option>
            <Select.Option value="Insurance">Insurance</Select.Option>
            <Select.Option value="Health">Health & Fitness</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="Travel">Travel</Select.Option>
            <Select.Option value="Miscellaneous">
              Miscellaneous Expenses
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
