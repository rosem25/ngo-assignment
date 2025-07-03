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
    <div className="p-10 w-full min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-extrabold text-white mb-10 text-center tracking-wide">Transaction History</h2>
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        <input type="date" value={startDate} onChange={e => setStart(e.target.value)} className="p-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="date" value={endDate} onChange={e => setEnd(e.target.value)} className="p-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} className="p-3 border border-gray-600 rounded-lg bg-gray-900 text-white flex-grow min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-gray-900 text-white rounded-lg">
          <thead>
            <tr className="bg-blue-700 text-white uppercase tracking-wide">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id} className="text-base hover:bg-gray-700 transition-colors duration-200" style={{ height: "56px" }}>
                <td className="p-4">{format(new Date(tx.date), 'MMM dd, yyyy')}</td>
                <td className="p-4">{tx.description}</td>
                <td className="p-4">{tx.category}</td>
                <td className="p-4">{tx.type}</td>
                <td className={`p-4 text-right font-semibold ${tx.type === "Income" ? "text-green-400" : "text-red-400"}`}>
                  ₹{tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;