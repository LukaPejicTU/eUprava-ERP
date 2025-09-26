import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Tasks from "./pages/TasksPage";
import DocumentsPage from "./pages/DocumentsPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from "./components/TaskForm";
import AdminRoute from "./components/AdminRoute";
import UserManagementPage from "./pages/UserManagementPage";

function App() {
  return (
    
    <Routes>
    <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />}>
      <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="tasks/create" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        <Route path="documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
        <Route path="admin/users" element={<AdminRoute><UserManagementPage /></AdminRoute>} />
      </Route>
    </Routes>
    
  );
}

export default App;
