'use client'; // Ensure this is a client component

import { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

import Loading from '@/components/Loading';

export default function KawasanComponent() {
  const [kawasans, setKawasans] = useState([]);
  const [direktorats, setDirektorats] = useState([]); // For related Direktorat data
  const [newKawasan, setNewKawasan] = useState({ namaKawasan: '', idDirektorat: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentKawasanId, setCurrentKawasanId] = useState(null);

  useEffect(() => {
    fetchKawasans();
    fetchDirektorats(); // Fetch Direktorat options
  }, []);

  async function fetchKawasans() {
    const response = await fetch('/api/kawasan');
    const data = await response.json();
    setKawasans(data);
  }

  async function fetchDirektorats() {
    const response = await fetch('/api/direktorat');
    const data = await response.json();
    setDirektorats(data);
  }

  async function createKawasan() {
    if (isEditing) {
      await fetch(`/api/kawasan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newKawasan, idKawasan: currentKawasanId }),
      });
      setIsEditing(false);
    } else {
      await fetch('/api/kawasan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKawasan),
      });
    }
    fetchKawasans();
    setNewKawasan({ namaKawasan: '', idDirektorat: '' });
  }

  async function deleteKawasan(id) {
    await fetch('/api/kawasan', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idKawasan: id }),
    });
    fetchKawasans();
  }

  function editKawasan(kawasan) {
    setIsEditing(true);
    setCurrentKawasanId(kawasan.id);
    setNewKawasan({
      namaKawasan: kawasan.namaKawasan,
      idDirektorat: kawasan.idDirektorat,
    });
  }

  const data = useMemo(() => kawasans, [kawasans]);

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        accessor: (row, i) => i + 1,
      },
      {
        Header: 'Nama Kawasan',
        accessor: 'namaKawasan',
      },
      {
        Header: 'Direktorat',
        accessor: 'direktorat.namaDirektorat',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="bg-yellow-400 text-white p-2 rounded"
              onClick={() => editKawasan(row.original)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => confirm(`Delete Kawasan ${row.original.namaKawasan}?`) && deleteKawasan(row.original.id)}
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

  if (!kawasans.length) return <Loading />;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Kawasan</h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4">{isEditing ? 'Update Kawasan' : 'Create Kawasan'}</h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Nama Kawasan"
            value={newKawasan.namaKawasan}
            onChange={(e) => setNewKawasan({ ...newKawasan, namaKawasan: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <select
            id="direktorat"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={newKawasan.idDirektorat}
            onChange={(e) => setNewKawasan({ ...newKawasan, idDirektorat: e.target.value })}
          >
            <option value="">Pilih Direktorat</option>
            {direktorats.map((direktorat) => (
              <option key={direktorat.id} value={direktorat.id}>
                {direktorat.namaDirektorat}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`${isEditing ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
          onClick={createKawasan}
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
                <th {...column.getHeaderProps()} className="px-4 py-2 border">
                  {column.render('Header')}
                </th>
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
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
