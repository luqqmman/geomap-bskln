'use client';

import { FiHome, FiSettings, FiLayers, FiGlobe, FiDatabase } from 'react-icons/fi';
import Link from 'next/link';

const Sidebar = () => {

  return (
    <>
      <div className="h-screen w-64 bg-white text-gray-800 flex flex-col shadow-lg fixed">
        <div className="px-6 py-4 font-bold text-xl border-b border-gray-300">
          Menu
        </div>
        <div className="flex-1">
        <div className="px-6 py-4">
          <h2 className="uppercase text-sm text-gray-400 mb-4">Home</h2>
          <ul>
            <li className="mb-2">
              <Link href="/" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiHome className="text-xl" />
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-6 py-4">
          <h2 className="uppercase text-sm text-gray-400 mb-4">Admin</h2>
          <ul>
            <li className="mb-2">
              <Link href="/direktorat" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiSettings className="text-xl" />
                <span className="ml-4">Direktorat</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/kawasan" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiLayers className="text-xl" />
                <span className="ml-4">Kawasan</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/negara" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiGlobe className="text-xl" />
                <span className="ml-4">Negara</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-6 py-4">
          <h2 className="uppercase text-sm text-gray-400 mb-4">API</h2>
          <ul>
            <li className="mb-2">
              <Link href="/api/direktorat" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiDatabase className="text-xl" />
                <span className="ml-4">API Direktorat</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/api/negara" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiDatabase className="text-xl" />
                <span className="ml-4">API Negara</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/api/kawasan" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-blue-50">
                <FiDatabase className="text-xl" />
                <span className="ml-4">API Kawasan</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
