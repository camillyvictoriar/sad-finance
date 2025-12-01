import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Simulation from "./components/Simulation";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "simulation"
  >("dashboard");

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="flex-1 overflow-auto">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "simulation" && <Simulation />}
      </main>
    </div>
  );
}