import React, { useState } from 'react';
import '../../styles/components.css';

const DataTable = ({ title, data, columns, pageSize = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const handleExportCSV = () => {
    const headers = columns.map(c => c.header).join(',');
    const rows = data.map(row => columns.map(c => JSON.stringify(row[c.accessor] ?? '')).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const startIdx = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIdx, startIdx + pageSize);

  return (
    <div className="data-table-container card flex-col">
      <div className="table-header flex justify-between items-center">
        <h3 className="card-title">{title}</h3>
        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.75rem' }} onClick={handleExportCSV}>Export CSV</button>
      </div>

      <div className="table-wrapper mt-lg">
        <table className="modern-table">
          <thead>
            <tr>
              {columns.map((col, idx) => <th key={idx}>{col.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, i) => (
                  <td key={i}>
                    {col.accessor === 'status' ? (
                      <span className={`badge badge-${row[col.accessor] === 'Active' ? 'success' : row[col.accessor] === 'Completed' ? 'primary' : 'warning'}`}>
                        {row[col.accessor]}
                      </span>
                    ) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-between items-center mt-lg">
        <span className="text-muted text-sm">
          Showing <span className="font-bold">{startIdx + 1}</span>-
          <span className="font-bold">{Math.min(startIdx + pageSize, data.length)}</span> of {data.length}
        </span>
        <div className="pagination-buttons flex gap-sm">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          <button className="btn btn-primary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      <style>{`
        .table-wrapper { overflow-x: auto; }
        .modern-table { width: 100%; border-collapse: collapse; }
        .modern-table th {
          text-align: left;
          padding: 12px 16px;
          background: var(--bg-main);
          color: var(--text-muted);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
        }
        .modern-table td {
          padding: 16px;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-main);
          word-break: break-all;
          overflow-wrap: break-word;
        }
        .modern-table tr:last-child td { border-bottom: none; }
        .modern-table tr:hover { background: rgba(99, 102, 241, 0.02); }
      `}</style>
    </div>
  );
};

export default DataTable;
