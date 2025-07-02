import { useState, useEffect } from "react";
import { format, parseISO, isWithinInterval } from "date-fns";

const Transactions = ({ transactions }) => {
  const [filtered, setFiltered] = useState(transactions);
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let result = [...transactions];
    if (startDate && endDate) {
      result = result.filter(t => isWithinInterval(parseISO(t.date), {
        start: parseISO(startDate),
        end: parseISO(endDate),
      }));
    }
    if (search) {
      result = result.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(result);
  }, [startDate, endDate, search, transactions]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="custom-heading">Transaction History</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input type="date" value={startDate} onChange={e => setStart(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={endDate} onChange={e => setEnd(e.target.value)} className="p-2 border rounded" />
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="p-2 border rounded flex-grow" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2">Date</th><th>Description</th><th>Category</th><th>Type</th><th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id} className="text-sm text-gray-700 hover:bg-gray-50">
                <td className="p-2">{format(new Date(tx.date), 'MMM dd, yyyy')}</td>
                <td>{tx.description}</td>
                <td>{tx.category}</td>
                <td>{tx.type}</td>
                <td className={tx.type === "Income" ? "text-green-600" : "text-red-600"}>₹{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
