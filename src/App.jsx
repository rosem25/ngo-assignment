import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Navbar from "./components/navbar";
import AddTransaction from "./components/AddTransaction";
import mockTransactions from "./assets/mockdata";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Router>
      <div style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard transactions={transactions} />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} />} />
          <Route path="/add-transaction" element={<AddTransaction transactions={transactions} setTransactions={setTransactions} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
