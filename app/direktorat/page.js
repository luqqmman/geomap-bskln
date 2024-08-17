'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

export default function DirektoratComponent() {
  const [direktorats, setDirektorats] = useState([]);
  const [newDirektorat, setNewDirektorat] = useState({ namaDirektorat: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentDirektoratId, setCurrentDirektoratId] = useState(null);

  useEffect(() => {
    fetchDirektorats();
  }, []);

  async function fetchDirektorats() {
    const response = await fetch('/api/direktorat');
    const data = await response.json();
    setDirektorats(data);
  }

  async function createDirektorat() {
    if (isEditing) {
      await fetch(`/api/direktorat`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newDirektorat, idDirektorat: currentDirektoratId }),
      });
      setIsEditing(false);
    } else {
      await fetch('/api/direktorat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDirektorat),
      });
    }
    fetchDirektorats();
    setNewDirektorat({ namaDirektorat: '' });
  }

  async function deleteDirektorat(id) {
    await fetch('/api/direktorat', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idDirektorat: id }),
    });
    fetchDirektorats();
  }

  function editDirektorat(direktorat) {
    setIsEditing(true);
    setCurrentDirektoratId(direktorat.id);
    setNewDirektorat({ namaDirektorat: direktorat.namaDirektorat });
  }

  const data = useMemo(() => direktorats, [direktorats]);

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        accessor: (row, i) => i + 1, // Index-based numbering
      },
      {
        Header: 'Nama Direktorat',
        accessor: 'namaDirektorat',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="bg-yellow-400 text-white p-2 rounded"
              onClick={() => editDirektorat(row.original)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => confirm(`Delete Direktorat ${row.original.namaDirektorat}?`) && deleteDirektorat(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Direktorat</h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4">{isEditing ? 'Update Direktorat' : 'Create Direktorat'}</h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Nama Direktorat"
            value={newDirektorat.namaDirektorat}
            onChange={(e) => setNewDirektorat({ ...newDirektorat, namaDirektorat: e.target.value })}
          />
        </div>
        <button
          className={`${isEditing ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
          onClick={createDirektorat}
        >
          {isEditing ? 'Update' : 'Create'}
        </button>
      </div>

      {/* Table */}
      <table {...getTableProps()} className="min-w-full table-auto bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-4 py-2 border">{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
