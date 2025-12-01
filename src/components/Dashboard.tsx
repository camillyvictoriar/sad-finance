import { useState } from 'react';
import { Filter } from 'lucide-react';
import SummarizationCards from './SummarizationCards';
import CorrelationMatrix from './CorrelationMatrix';
import ClusterView from './ClusterView';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'imovel', label: 'Imóvel' },
    { value: 'veiculo', label: 'Veículo' },
    { value: 'servico', label: 'Serviço' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-12">
      {/* Header with Filter */}
      <div className="mb-10">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-white mb-2">Dashboard Analítico</h1>
            <p className="text-zinc-400">Visão integrada com análise estatística e correlações</p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/40 focus:border-[#B38CEB]/40 transition-all cursor-pointer min-w-[200px]"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Badge */}
        {selectedCategory !== 'all' && (
          <div className="inline-flex items-center gap-2 bg-[#B38CEB]/10 border border-[#B38CEB]/20 rounded-xl px-4 py-2">
            <div className="w-2 h-2 bg-[#B38CEB] rounded-full"></div>
            <span className="text-sm text-[#B38CEB]">
              Filtrando por: {categories.find(c => c.value === selectedCategory)?.label}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Section 1: Sumarização */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-[#B38CEB] rounded-full"></div>
            <h2 className="text-white">Sumarização Estatística</h2>
          </div>
          <SummarizationCards category={selectedCategory} />
        </div>

        {/* Section 2: Correlação e Agrupamento em Grid */}
        <div className="grid grid-cols-5 gap-6">
          {/* Correlation Matrix - 3 columns */}
          <div className="col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 bg-[#B38CEB] rounded-full"></div>
              <h2 className="text-white">Matriz de Correlação</h2>
            </div>
            <CorrelationMatrix category={selectedCategory} />
          </div>

          {/* Cluster View - 2 columns */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 bg-[#B38CEB] rounded-full"></div>
              <h2 className="text-white">Agrupamento (Clusters)</h2>
            </div>
            <ClusterView category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}