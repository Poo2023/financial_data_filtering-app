import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";


const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "http://financialdata-env.eba-mvpftxqp.us-east-1.elasticbeanstalk.com/data";

// Type definition for financial data
type FinancialData = {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
};

const Table: React.FC = () => {
  // Initial filter state
  const initialFilters = {
    from_date: "",
    to_date: "",
    min_revenue: "",
    max_revenue: "",
    min_net_income: "",
    max_net_income: "",
  };

  const [filteredData, setFilteredData] = useState<FinancialData[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [sortConfig, setSortConfig] = useState<{ key: keyof FinancialData; ascending: boolean } | null>(null);

  // Fetching data from the backend API
  const fetchData = async (filtersApplied = false) => {
    try {
      const params = filtersApplied ? { ...filters } : {};
      const response = await axios.get(backendUrl, { params });
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Unable to fetch data. Please try again later.");
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters
  const applyFilters = () => {
    fetchData(true);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters(initialFilters); // Reset filters to initial state
    fetchData(); // Optionally refetch data without filters
  };

  // Handle sorting
  const handleSort = (key: keyof FinancialData, ascending: boolean) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return ascending ? -1 : 1;
      if (a[key] > b[key]) return ascending ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortConfig({ key, ascending });
  };

  return (
    <div className="bg-[#fecaca] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#333333]">
          Financial Data Filtering App
        </h1>
        <p className="text-gray-600 text-center mb-8">
          This application allows you to explore, filter, and organize financial data seamlessly. Apply search criteria and sort data to suit your needs.
        </p>

        {/* Filter Options Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Options</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {/* Filter Inputs */}
            {Object.keys(initialFilters).map((filter) => (
              <div key={filter}>
                <label className="block text-gray-600 mb-2 capitalize">{filter.replace("_", " ")}</label>
                <input
                  type={filter.includes("date") ? "date" : "number"}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Enter ${filter.replace("_", " ")}`}
                  value={(filters as any)[filter]}
                  onChange={(e) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      [filter]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={applyFilters}
              className="bg-[#f87171] text-white py-3 px-6 rounded-lg shadow hover:bg-[#ef4444] transition"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow hover:bg-gray-400 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Sorting Options Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Sorting Options</h2>
          <div className="flex justify-between items-center">
            <select
              className="w-1/2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => handleSort(e.target.value as keyof FinancialData, true)}
            >
              <option value="">Sort Ascending By</option>
              <option value="date">Date</option>
              <option value="revenue">Revenue</option>
              <option value="netIncome">Net Income</option>
            </select>
            <select
              className="w-1/2 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ml-4"
              onChange={(e) => handleSort(e.target.value as keyof FinancialData, false)}
            >
              <option value="">Sort Descending By</option>
              <option value="date">Date</option>
              <option value="revenue">Revenue</option>
              <option value="netIncome">Net Income</option>
            </select>
          </div>

          {/* Display current sorting information */}
          {sortConfig && (
            <p className="text-gray-600 mt-4">
              Currently sorting by <strong>{sortConfig.key}</strong> in{" "}
              <strong>{sortConfig.ascending ? "ascending" : "descending"}</strong> order.
            </p>
          )}
        </div>

        {/* Table Section */}
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Financial Data Table</h3>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-4 text-left">Date</th>
                  <th className="border p-4 text-left">Revenue</th>
                  <th className="border p-4 text-left">Net Income</th>
                  <th className="border p-4 text-left">Gross Profit</th>
                  <th className="border p-4 text-left">EPS</th>
                  <th className="border p-4 text-left">Operating Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-4">{item.date}</td>
                    <td className="border p-4">{item.revenue}</td>
                    <td className="border p-4">{item.netIncome}</td>
                    <td className="border p-4">{item.grossProfit}</td>
                    <td className="border p-4">{item.eps}</td>
                    <td className="border p-4">{item.operatingIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">No data available</div>
        )}
      </div>
    </div>
  );
};

export default Table;
