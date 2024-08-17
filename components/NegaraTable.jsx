'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import Link from 'next/link';

export default function NegaraComponent() {
  const [negaras, setNegaras] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState(''); // State untuk search query
  const [filteredNegaras, setFilteredNegaras] = useState([]); // State untuk negara yang sudah difilter

  useEffect(() => {
    fetchNegaras();
  }, []);

  useEffect(() => {
    filterNegaras();
  }, [negaras, searchQuery, pageIndex, pageSize]);

  async function fetchNegaras() {
    const response = await fetch(`/api/negara`); // Mengambil semua data negara
    const data = await response.json();
    setNegaras(data);
  }

  function filterNegaras() {
    let filtered = negaras;

    if (searchQuery) {
      filtered = negaras.filter((negara) =>
        negara.namaNegara.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Menghitung jumlah halaman berdasarkan hasil filter
    setPageCount(Math.ceil(filtered.length / pageSize));

    // Membatasi data yang ditampilkan berdasarkan page index dan page size
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredNegaras(filtered.slice(startIndex, endIndex));
  }

  const handleDelete = async (idNegara) => {
    if (confirm('Are you sure you want to delete this country?')) {
      await fetch(`/api/negara`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idNegara }),
      });
      fetchNegaras();
    }
  };

  const data = useMemo(() => filteredNegaras, [filteredNegaras]);

  const columns = useMemo(
    () => [
      {
        Header: 'No.',
        accessor: (row, i) => i + 1 + (pageIndex - 1) * pageSize,
      },
      {
        Header: 'Nama Negara',
        Cell: ({ row }) => (
          <Link className='text-blue' href={`/api/negara/${row.original.id}`}>
            {row.original.namaNegara}
          </Link>
        ),
      },
      {
        Header: 'Nama Kawasan',
        Cell: ({ row }) => (
          <Link className='text-blue' href={`/api/kawasan/${row.original.idKawasan}`}>
            {row.original.kawasan.namaKawasan}
          </Link>
        ),
      },
      {
        Header: 'Nama Direktorat',
        Cell: ({ row }) => (
          <Link className='text-blue' href={`/api/direktorat/${row.original.idDirektorat}`}>
            {row.original.direktorat.namaDirektorat}
          </Link>
        ),
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <button
            className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    [pageIndex, pageSize]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount,
    },
    usePagination
  );

  return (
    <div className='items-self-left mt-16'>
      <h1 className="text-2xl font-bold mb-4">Negara</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by country name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Jumlah Entri */}
      <div className="mb-4">
        <label htmlFor="pageSize" className="mr-2">Show</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span className="ml-2">entries</span>
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

      {/* Pagination */}
      <div className="pagination mt-4">
        <button onClick={() => setPageIndex(1)} disabled={pageIndex === 1}>
          {'<<'}
        </button>{' '}
        <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 1}>
          {'<'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex} of {pageCount}
          </strong>{' '}
        </span>{' '}
        <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex === pageCount}>
          {'>'}
        </button>{' '}
        <button onClick={() => setPageIndex(pageCount)} disabled={pageIndex === pageCount}>
          {'>>'}
        </button>
      </div>
    </div>
  );
}
 