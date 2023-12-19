import React, { useState, useEffect } from "react";
import "./TablePagin.css";

const TablePagin = ({ data }) => {
  const [maxRows, setMaxRows] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [filter, setFilter] = useState("");
  const [rowsData, setRowsData] = useState(data || []);

  useEffect(() => {
    setRowsData(data);
    setTotalRows(data.length);
  }, [data]);

  const handleMaxRowsChange = (event) => {
    setMaxRows(parseInt(event.target.value));
  };

  const handlePaginationClick = (pageNumber) => {
    setPageNum(pageNumber);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showigRowsCount = () => {
    const end_index = maxRows * pageNum;
    const start_index = maxRows * pageNum - maxRows + 1;
    return `Showing ${start_index} to ${end_index} of ${totalRows} entries`;
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = Math.ceil(totalRows / maxRows);

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li
          key={i}
          className={pageNum === i ? "active" : ""}
          onClick={() => handlePaginationClick(i)}
        >
          <span>{i}</span>
        </li>
      );
    }

    return buttons;
  };

  const filteredRows = rowsData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="container" style={{ backgroundColor: "#eee" }}>
      <div className="header_wrap" style={{ padding: "30px 0" }}>
        <div className="num_rows" style={{ width: "20%", float: "left" }}>
          <div className="form-group">
            <select
              className="form-control"
              value={maxRows}
              onChange={handleMaxRowsChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="70">70</option>
              <option value="100">100</option>
              <option value="5000">Show ALL Rows</option>
            </select>
          </div>
        </div>
        <div className="tb_search" style={{ width: "20%", float: "right" }}>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search.."
            className="form-control"
          />
        </div>
      </div>
      <table className="table table-striped table-class" id="table-id">
        <thead>
          <tr>
            {Object.keys(rowsData[0]).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows
            .slice((pageNum - 1) * maxRows, pageNum * maxRows)
            .map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div
        className="pagination-container"
        style={{ width: "70%", float: "left" }}
      >
        <nav>
          <ul className="pagination">{renderPaginationButtons()}</ul>
        </nav>
      </div>
      <div
        className="rows_count"
        style={{
          width: "20%",
          float: "right",
          textAlign: "right",
          color: "#999",
        }}
      >
        {showigRowsCount()}
      </div>
    </div>
  );
};

export default TablePagin;
