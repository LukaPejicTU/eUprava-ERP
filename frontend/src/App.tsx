import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="tasks/create" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
          <Route path="documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
       </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
