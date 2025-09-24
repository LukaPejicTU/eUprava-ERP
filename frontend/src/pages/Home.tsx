import { DashboardData } from "../services/DashboardService"
import { useState, useEffect } from "react";
import { DashboardService } from "../services/DashboardService";
import StatCard from "../components/StatCard";
import { useUser } from "../context/UserContext";
import RecentTasksWidget from "../components/RecentTasksWidget";

const Home = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useUser();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardService.getDashboardData();
        if (data != null) {
          setDashboardData(data);
        } else {
          console.warn("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-6 font-semibold">Učitavanje početne stranice...</div>;
  }

  if (!dashboardData) {
    return <div className="p-6 text-red-500">Greška prilikom učitavanja početne stranice.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dobro došao/došla, {user?.first_name || user?.username}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Moji Zadaci"
          value={dashboardData.my_open_tasks_count}
        />
      </div>

      <div className="mt-8">
        <RecentTasksWidget tasks={dashboardData.recent_tasks} />
      </div>
    </div>
  )

}

export default Home;