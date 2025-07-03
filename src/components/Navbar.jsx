import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-12 py-7 bg-gradient-to-r from-[#10193a] via-[#1a237e] to-[#10193a] shadow-2xl min-h-[80px] border-b border-blue-900/60">
      <div className="flex items-center space-x-4">
        <span className="text-4xl drop-shadow-lg">💰</span>
        <span className="text-white text-3xl font-extrabold tracking-wide drop-shadow-lg">Finance Dashboard</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 text-white text-lg ${
            location.pathname === "/" ? "bg-[#212b5e] shadow-md" : "hover:bg-[#283593]/80"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 text-white text-lg ${
            location.pathname === "/transactions" ? "bg-[#212b5e] shadow-md" : "hover:bg-[#283593]/80"
          }`}
        >
          Transactions
        </Link>
        <Link
          to="/add-transaction"
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 text-white text-lg ${
            location.pathname === "/add-transaction" ? "bg-[#212b5e] shadow-md" : "hover:bg-[#283593]/80"
          }`}
        >
          + Add Transaction
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;