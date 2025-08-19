import { useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    assigned_to_fullname: string;
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await AuthService.authorizedFetch(`/api/tasks/?search=${search}`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    console.warn("Unexpected response:", data);
                    setTasks([]);
                }
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
                navigate("/login"); // Redirect to login on error
            }
        }

        fetchTasks();
    }, [search]);

    return(
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista Zadataka</h1>
            <input
                type="text"
                placeholder="Pretraži taskove..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 w-full mb-4 rounded"
            />
            {tasks.length === 0 ? (
                <div className="text-red-600">Nije pronađen nijedan zadatak.</div>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 border rounded shadow">
                            <h2 className="text-xl text-blue-600 font-semibold">{task.title}</h2>
                            <p className="text-sm text-gray-600">Assigned to: {task.assigned_to_fullname}</p>
                            <p className="text-sm text-gray-600">Status: {task.status}</p>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}