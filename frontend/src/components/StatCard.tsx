interface StatCardProps {
    title: string;
    value: number | string;
}

const StatCard = ({ title, value }: StatCardProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    )
};

export default StatCard;