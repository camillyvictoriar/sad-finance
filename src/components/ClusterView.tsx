import { Circle } from 'lucide-react';

interface ClusterViewProps {
  category: string;
}

export default function ClusterView({ category }: ClusterViewProps) {
  // Adjust cluster data based on category
  const getClusters = () => {
    const baseClusters = [
      {
        name: 'Alta Performance',
        color: '#10b981',
        count: 12,
        characteristics: ['Baixa inadimplência', 'Alta rentabilidade', 'Custos otimizados'],
        groups: ['Grupo Alpha', 'Grupo Beta', 'Grupo Sigma']
      },
      {
        name: 'Performance Moderada',
        color: '#B38CEB',
        count: 18,
        characteristics: ['Inadimplência média', 'Rentabilidade estável', 'Custos normais'],
        groups: ['Grupo Gamma', 'Grupo Delta', 'Grupo Epsilon']
      },
      {
        name: 'Crítico',
        color: '#ef4444',
        count: 6,
        characteristics: ['Alta inadimplência', 'Baixa rentabilidade', 'Custos elevados'],
        groups: ['Grupo Omega', 'Grupo Zeta']
      }
    ];

    // Adjust counts based on category
    if (category === 'imovel') {
      baseClusters[0].count = 15;
      baseClusters[1].count = 14;
      baseClusters[2].count = 4;
    } else if (category === 'veiculo') {
      baseClusters[0].count = 10;
      baseClusters[1].count = 20;
      baseClusters[2].count = 8;
    } else if (category === 'servico') {
      baseClusters[0].count = 11;
      baseClusters[1].count = 19;
      baseClusters[2].count = 7;
    }

    return baseClusters;
  };

  const clusters = getClusters();

  return (
    <div className="space-y-4">
      {clusters.map((cluster, index) => (
        <div
          key={index}
          className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-700/50 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cluster.color }}
              ></div>
              <div>
                <h3 className="text-white">{cluster.name}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{cluster.count} grupos identificados</p>
              </div>
            </div>
            <div 
              className="px-3 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${cluster.color}15`,
                color: cluster.color
              }}
            >
              {cluster.count}
            </div>
          </div>

          {/* Characteristics */}
          <div className="space-y-2 mb-4">
            {cluster.characteristics.map((char, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                <Circle className="w-1.5 h-1.5" fill="currentColor" style={{ color: cluster.color }} />
                {char}
              </div>
            ))}
          </div>

          {/* Groups */}
          <div className="pt-4 border-t border-zinc-800/50">
            <div className="text-xs text-zinc-500 mb-2">Principais grupos</div>
            <div className="flex flex-wrap gap-2">
              {cluster.groups.map((group, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-black/20 rounded-lg text-xs text-zinc-400 border border-zinc-800/30"
                >
                  {group}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Distribution Chart */}
      <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 mt-6">
        <div className="text-sm text-zinc-400 mb-4">Distribuição dos Clusters</div>
        <div className="flex gap-1 h-16 rounded-lg overflow-hidden">
          {clusters.map((cluster, index) => {
            const total = clusters.reduce((sum, c) => sum + c.count, 0);
            const percentage = (cluster.count / total) * 100;
            
            return (
              <div
                key={index}
                className="flex items-center justify-center text-xs text-white transition-all duration-300 hover:brightness-110"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: cluster.color
                }}
              >
                {percentage.toFixed(0)}%
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-3">
          {clusters.map((cluster, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cluster.color }}></div>
              <span className="text-xs text-zinc-500">{cluster.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
