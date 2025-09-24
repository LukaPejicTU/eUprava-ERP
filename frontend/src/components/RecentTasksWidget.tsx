import { Link } from "react-router-dom";
import { DashboardTask } from "../services/DashboardService";

interface RecentTasksWidgetProps {
    tasks: DashboardTask[];
}

const RecentTasksWidget: React.FC<RecentTasksWidgetProps> = ({ tasks }: RecentTasksWidgetProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Najnoviji Zadaci</h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500">Trenutno nemate otvorenih zadataka.</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map(task => (
                        <li key={task.id} className="border-b border-gray-200 pb-2">
                            <Link
                                to={`/tasks/${task.id}`}
                                className="font-semibold text-blue-600 hover:underline"
                            >
                                {task.title}
                            </Link>
                            <p className="text-sm text-gray-500 capitalize">
                                Status: {task.status.replace('_', ' ')}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default RecentTasksWidget;