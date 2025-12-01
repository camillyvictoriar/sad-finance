import { LayoutDashboard, TrendingUp, Settings, LogOut, BarChart3 } from 'lucide-react';

interface SidebarProps {
  currentView: 'dashboard' | 'simulation';
  onViewChange: (view: 'dashboard' | 'simulation') => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'simulation' as const, label: 'Simulação', icon: TrendingUp },
  ];

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-900/50 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-[#B38CEB] to-[#9d6fd4] rounded-xl flex items-center justify-center shadow-lg shadow-[#B38CEB]/20">
            <BarChart3 className="w-6 h-6 text-black" strokeWidth={2} />
          </div>
          <div>
            <div className="text-white tracking-tight">SAD-Finance</div>
            <div className="text-xs text-zinc-500">Sistema de Apoio à Decisão</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#B38CEB]/10 text-[#B38CEB] border border-[#B38CEB]/20 shadow-lg shadow-[#B38CEB]/5'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 space-y-2 border-t border-zinc-900/50">
        <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all duration-200">
          <Settings className="w-5 h-5" strokeWidth={1.5} />
          <span>Configurações</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-900/50 transition-all duration-200">
          <LogOut className="w-5 h-5" strokeWidth={1.5} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}