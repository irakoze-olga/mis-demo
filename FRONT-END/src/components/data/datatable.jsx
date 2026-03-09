import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Eye, Edit, Trash2 } from 'lucide-react';
import '../../styles/components.css';

const DataTable = ({ title, data, columns, onAction }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIdx, startIdx + pageSize);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const getSortIcon = (column) => {
    if (sortConfig.key !== column.accessor) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="data-table-container card flex-col">
      <div className="table-header flex justify-between items-center">
        <h3 className="card-title">{title}</h3>
        <div className="table-info text-sm text-muted">
          {data.length} total items
        </div>
      </div>

      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>
                  {col.sortable ? (
                    <button
                      className="sort-button flex items-center gap-xs"
                      onClick={() => handleSort(col.accessor)}
                    >
                      {col.header}
                      {getSortIcon(col)}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
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
                    ) : col.accessor === 'actions' ? (
                      <div className="table-actions flex gap-xs">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => onAction && onAction('view', row[col.accessor])}
                          title="View project"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => onAction && onAction('edit', row[col.accessor])}
                          title="Edit project"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-danger"
                          onClick={() => onAction && onAction('delete', row[col.accessor])}
                          title="Delete project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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
          <button className="btn btn-secondary btn-sm" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          <button className="btn btn-primary btn-sm" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      <style>{`
        .data-table-container {
          padding: 1.5rem;
        }
        .table-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .table-wrapper { 
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .modern-table { 
          width: 100%; 
          border-collapse: collapse; 
        }
        .modern-table th {
          text-align: left;
          padding: 12px 16px;
          background: var(--bg-main);
          color: var(--text-muted);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
          font-weight: 600;
        }
        .sort-button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font: inherit;
          padding: 0;
          transition: var(--transition);
        }
        .sort-button:hover {
          color: var(--primary);
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
        .table-actions {
          opacity: 0;
          transition: var(--transition);
        }
        .modern-table tr:hover .table-actions {
          opacity: 1;
        }
        .btn-sm {
          padding: 6px 10px;
          font-size: 0.8rem;
          border-radius: 6px;
          min-width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-danger {
          color: var(--danger);
          border-color: var(--danger);
        }
        .btn-danger:hover {
          background: var(--danger);
          color: white;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .badge-success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }
        .badge-primary {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }
        .badge-warning {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }
        
        @media (max-width: 768px) {
          .table-wrapper {
            overflow-x: scroll;
          }
          .modern-table th,
          .modern-table td {
            padding: 8px 12px;
            font-size: 0.8rem;
          }
          .table-actions {
            opacity: 1;
          }
          .pagination {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default DataTable;
