import { Button } from "@mui/material";
import React, { useState } from "react";

const DataTable = ({ title, data, columns, options, component }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    data.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const exportToCSV = () => {
    const csvData = data.map((row) => {
      let formattedRow = {};
      columns.forEach((col) => {
        formattedRow[col.label] = row[col.name];
      });
      return formattedRow;
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(csvData[0]).join(","),
        ...csvData.map((row) => Object.values(row).join(",")),
      ].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${options.downloadOptions.filename}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="table-container">
      <h2>{title}</h2>
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {options.downloadOptions && (
          <div className="table-action">
            <Button
              variant="contained"
              style={{ margin: "2px" }}
              onClick={exportToCSV}
            >
              Download CSV
            </Button>

            <div style={{ margin: "2px" }}>{component}</div>
          </div>
        )}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map(
              (col) =>
                col.options.display !== false && (
                  <th
                    key={col.name}
                    onClick={() => col.options.sort && handleSort(col.name)}
                  >
                    {col.label}{" "}
                    {sortConfig.key === col.name
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map(
                (col) =>
                  col.options.display !== false && (
                    <td key={col.name}>
                      {col.options.customBodyRender
                        ? col.options.customBodyRender(row[col.name], row)
                        : ["createdAt", "updatedAt"].includes(col.name)
                        ? row[col.name].replace(/[TZ]/g, " ")
                        : row[col.name]}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value="5">5 rows</option>
          <option value="10">10 rows</option>
          <option value="15">15 rows</option>
          <option value="20">20 rows</option>
        </select>
      </div>
    </div>
  );
};

export default DataTable;
