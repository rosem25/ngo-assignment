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
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] w-full bg-gradient-to-br from-gray-900 to-gray-800 py-12">
      <div className="w-full max-w-lg bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700 p-10">
        <h2 className="text-3xl font-extrabold text-white mb-10 text-center tracking-wide">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-7">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;