'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

export default function NegaraComponent() {
  const [negaras, setNegaras] = useState([]);
  const [kawasans, setKawasans] = useState([]);
  const [direktorats, setDirektorats] = useState([]);
  const [newNegara, setNewNegara] = useState({ namaNegara: '', kodeNegara: '', idKawasan: '', idDirektorat: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentNegaraId, setCurrentNegaraId] = useState(null);

  useEffect(() => {
    fetchNegaras();
    fetchKawasans();
    fetchDirektorats();
  }, []);

  async function fetchNegaras() {
    const response = await fetch('/api/negara');
    const data = await response.json();
    setNegaras(data);
  }

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

  async function createNegara() {
    if (isEditing) {
      await fetch(`/api/negara`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newNegara, idNegara: currentNegaraId }),
      });
      setIsEditing(false);
    } else {
      await fetch('/api/negara', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNegara),
      });
    }
    fetchNegaras();
    setNewNegara({ namaNegara: '', kodeNegara: '', idKawasan: '', idDirektorat: '' });
  }

  async function deleteNegara(id) {
    await fetch('/api/negara', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idNegara: id }),
    });
    fetchNegaras();
  }

  function editNegara(negara) {
    setIsEditing(true);
    setCurrentNegaraId(negara.id);
    setNewNegara({
      namaNegara: negara.namaNegara,
      kodeNegara: negara.kodeNegara,
      idKawasan: negara.id_Kawasan,
      idDirektorat: negara.id_Direktorat,
    });
  }

  const data = useMemo(() => negaras, [negaras]);

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        accessor: (row, i) => i + 1, // Index-based numbering
      },
      {
        Header: 'Nama Negara',
        accessor: 'namaNegara',
      },
      {
        Header: 'Kawasan',
        accessor: 'kawasan.namaKawasan', // Assuming kawasan is populated
      },
      {
        Header: 'Direktorat',
        accessor: 'direktorat.namaDirektorat', // Assuming direktorat is populated
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="bg-yellow-400 text-white p-2 rounded"
              onClick={() => editNegara(row.original)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => confirm(`Delete Negara ${row.original.namaNegara}?`) && deleteNegara(row.original.id)}
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
      <h1 className="text-2xl font-bold mb-4">Negara</h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4">{isEditing ? 'Update Negara' : 'Create Negara'}</h2>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Nama Negara"
            value={newNegara.namaNegara}
            onChange={(e) => setNewNegara({ ...newNegara, namaNegara: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Kode Negara"
            value={newNegara.kodeNegara}
            onChange={(e) => setNewNegara({ ...newNegara, kodeNegara: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={newNegara.idKawasan}
            onChange={(e) => setNewNegara({ ...newNegara, idKawasan: e.target.value })}
          >
            <option value="">Pilih Kawasan</option>
            {kawasans.map((kawasan) => (
              <option key={kawasan.id} value={kawasan.id}>
                {kawasan.namaKawasan}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={newNegara.idDirektorat}
            onChange={(e) => setNewNegara({ ...newNegara, idDirektorat: e.target.value })}
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
          onClick={createNegara}
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
