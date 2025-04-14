import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">eUprava ERP</h1>
      <nav className="flex gap-6">
        <Link to="/" className="inline-block text-green-600 hover:text-blue-800 font-medium">Početna</Link>
        <Link to="/tasks" className="inline-block text-blue-600 hover:text-blue-800 font-medium">Zadaci</Link>
        <Link to="/documents" className="inline-block text-blue-600 hover:text-blue-800 font-medium">Dokumenti</Link>
      </nav>


    </header>
  );
}
