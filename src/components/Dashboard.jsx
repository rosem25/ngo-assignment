import { useMemo } from "react";
import PropTypes from "prop-types";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const Dashboard = ({ transactions = [] }) => {
  const { income, expenses, balance, recent } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;
    const recent = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    return { income, expenses, balance, recent };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-300 text-lg">Track your finances with style</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <SummaryCard
            title="Account Balance"
            value={currency.format(balance)}
            color={balance >= 0 ? "text-emerald-400" : "text-red-400"}
            bgGradient="from-gray-800/80 to-gray-700/80"
            icon={
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-3 shadow-lg">
                <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8M12 8v8"/>
                </svg>
              </div>
            }
            trend={balance >= 0 ? "positive" : "negative"}
          />
          <SummaryCard
            title="Total Income"
            value={currency.format(income)}
            color="text-emerald-400"
            bgGradient="from-emerald-800/80 to-green-700/80"
            icon={
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-3 shadow-lg">
                <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 19V5M5 12l7 7 7-7"/>
                </svg>
              </div>
            }
            trend="positive"
          />
          <SummaryCard
            title="Total Expenses"
            value={currency.format(expenses)}
            color="text-red-400"
            bgGradient="from-red-800/80 to-pink-700/80"
            icon={
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-3 shadow-lg">
                <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 5v14M19 12l-7-7-7 7"/>
                </svg>
              </div>
            }
            trend="negative"
          />
        </div>

        {/* Recent Transactions Card */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-600/30">
          <div className="flex items-center justify-between border-b border-gray-600/50 pb-6 mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2 mr-4">
                <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 3h18v18H3zM3 9h18M9 21V9"/>
                </svg>
              </div>
              Recent Transactions
            </h3>
            <div className="text-sm text-gray-400 bg-gray-700/50 px-4 py-2 rounded-full">
              Last 5 transactions
            </div>
          </div>
          
          <div className="overflow-hidden rounded-2xl">
            {recent.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-700/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="1.5">
                    <path d="M9 12h6M9 16h6M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">No transactions available</p>
                <p className="text-gray-500 text-sm mt-2">Add your first transaction to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((tx, index) => (
                  <div 
                    key={tx.id} 
                    className="bg-gradient-to-r from-gray-700/30 to-gray-600/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/20 hover:border-gray-500/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'slideInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          tx.type === "Income" 
                            ? "bg-gradient-to-r from-emerald-500 to-green-600" 
                            : "bg-gradient-to-r from-red-500 to-pink-600"
                        } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {tx.type === "Income" ? (
                            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5">
                              <path d="M12 19V5M5 12l7 7 7-7"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5">
                              <path d="M12 5v14M19 12l-7-7-7 7"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">
                            {tx.description || "No description"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(tx.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          tx.type === "Income" ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {tx.type === "Expense" ? "-" : "+"}
                          {currency.format(tx.amount)}
                        </p>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                          tx.type === "Income" 
                            ? "bg-emerald-500/20 text-emerald-300" 
                            : "bg-red-500/20 text-red-300"
                        }`}>
                          {tx.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const SummaryCard = ({ title, value, color, bgGradient, icon, trend }) => (
  <div className={`bg-gradient-to-br ${bgGradient} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500 hover:shadow-3xl hover:scale-105 group`}>
    <div className="flex items-start justify-between mb-6">
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className={`text-xs px-3 py-1 rounded-full ${
        trend === 'positive' ? 'bg-emerald-500/20 text-emerald-300' : 
        trend === 'negative' ? 'bg-red-500/20 text-red-300' : 
        'bg-gray-500/20 text-gray-300'
      }`}>
        {trend === 'positive' ? '↗' : trend === 'negative' ? '↘' : '→'}
      </div>
    </div>
    <div>
      <p className="text-gray-300 text-sm font-medium mb-2 uppercase tracking-wider">{title}</p>
      <p className={`text-3xl font-bold ${color} group-hover:scale-105 transition-transform duration-300`}>
        {value}
      </p>
    </div>
    <div className="mt-4 h-1 bg-gray-600/30 rounded-full overflow-hidden">
      <div className={`h-full ${
        trend === 'positive' ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 
        trend === 'negative' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
        'bg-gradient-to-r from-blue-500 to-purple-500'
      } rounded-full group-hover:animate-pulse`} style={{width: '75%'}}></div>
    </div>
  </div>
);

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  bgGradient: PropTypes.string,
  icon: PropTypes.node,
  trend: PropTypes.oneOf(['positive', 'negative', 'neutral']),
};

Dashboard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string,
      amount: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["Income", "Expense"]).isRequired,
    })
  ),
};

export default Dashboard;