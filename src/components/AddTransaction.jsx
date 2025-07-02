import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTransaction = ({ transactions, setTransactions }) => {
  const [form, setForm] = useState({ date: "", description: "", amount: "", category: "", type: "Expense" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newTx = { id: Date.now(), ...form, amount: parseFloat(form.amount) };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="custom-heading">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add</button>
      </form>
    </div>
  );
};

export default AddTransaction;
