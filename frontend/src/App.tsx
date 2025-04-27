import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Documents from "./pages/Documents";

function App() {
  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center">
      <h1 className="text-3xl font-bold underline">
        Hello Tailwind!
      </h1>
    </div>
  );
}

export default App;
