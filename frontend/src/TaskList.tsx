import { useEffect, useState } from "react";
import { AuthService } from "./services/AuthService";

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`/api/tasks/?search=${search}`, {
            headers: {
                "Authorization": `Bearer ${AuthService.getToken()}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched tasks:", data);
            // Defensive check: backend might send { detail: ... } when unauthorized
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.warn("Unexpected response:", data);
                setTasks([]); // avoid map error
            }
        })
        .catch((err) => {
            console.error("Failed to fetch tasks:", err);
            setTasks([]); // fallback on failure
        });
    }, [search]);

    return(
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Task Lista</h1>
            <input
                type="text"
                placeholder="Pretraži taskove..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 w-full mb-4 rounded"
            />
            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li key={task.id} className="p-4 border rounded shadow">
                        <h2 className="text-xl font-semibold">{task.title}</h2>
                        <p>{task.description}</p>
                        <p className="text-sm text-gray-600">Status: {task.status}</p>
                    </li>
                ))}
            </ul>
            {tasks.length === 0 ? (
                <div className="text-red-600">Nije pronađen nijedan zadatak.</div>
            ) : (
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{task.title}</h2>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-600">Status: {task.status}</p>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}