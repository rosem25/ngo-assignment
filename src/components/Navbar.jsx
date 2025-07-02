import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Transactions", path: "/transactions" },
  { name: "Add", path: "/add-transaction" }
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <span role="img" aria-label="wallet">💰</span>
          <span>Finance Dashboard</span>
        </h1>

        <div className="flex space-x-6 text-base font-medium">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1 rounded-md transition duration-200 ${
                location.pathname === link.path
                  ? "bg-white text-blue-700 font-semibold shadow"
                  : "hover:bg-blue-600 hover:text-yellow-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
