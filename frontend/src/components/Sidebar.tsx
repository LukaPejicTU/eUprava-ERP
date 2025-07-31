import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const linkClass = (path: string) =>
        `block px-4 py-2 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-800 text-white" : "text-gray-300"
    }`;

    return (
        <aside className='w-64 h-full bg-gray-900 text-white hidden md:block'>
            <nav className='p-4 space-y-2'>
                <Link to="/" className={linkClass('/')}>Home</Link>
                <Link to="/tasks" className={linkClass('/tasks')}>Tasks</Link>
                <Link to="/documents" className={linkClass('/documents')}>Documents</Link>
            </nav>
        </aside>
    );
}
