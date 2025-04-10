import { useEffect, useState } from "react";

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
        fetch(`/api/tasks/?search=${search}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched tasks:", data);
                setTasks(data);
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
        </div>
    );
}