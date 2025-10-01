import { memo } from "react";

const Table = memo(
  ({
    columns,
    data,
    loading = false,
    error = null,
    emptyMessage = "No data found",
  }) => {
    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error)
      return (
        <div className="text-center py-8 text-red-600">
          Error: {error.message}
        </div>
      );
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="py-2 px-4 border-b text-left font-semibold"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id || `row-${index}`} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="py-2 px-4 border-b">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export default Table;
