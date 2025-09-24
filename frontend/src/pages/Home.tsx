import { DashboardData } from "../services/DashboardService"
import { useState, useEffect } from "react";
import { DashboardService } from "../services/DashboardService";

const Home = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);


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

}