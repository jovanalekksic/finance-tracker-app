import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

interface AddIncomeModalProps {
  isIncomeModalVisible: boolean;
  handleIncomeCancel: () => void;
  onFinish: (values: any, type: string) => void;
}

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}: AddIncomeModalProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields(); // Clear form fields
          handleIncomeCancel(); // Close the modal
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the description of the transaction.",
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
            { required: true, message: "Please input the income amount." },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date." },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category." }]}
        >
          <Select className="select-input-2">
            <Select.Option value="Salary">Employment</Select.Option>
            <Select.Option value="Freelancing">Freelancing</Select.Option>
            <Select.Option value="Investment">Investment</Select.Option>
            <Select.Option value="Rental">Rental Income</Select.Option>
            <Select.Option value="Gifts">Gifts</Select.Option>
            <Select.Option value="Bonuses">Bonuses</Select.Option>
            <Select.Option value="Miscellaneous">
              Miscellaneous Income
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
