interface CorrelationMatrixProps {
  category: string;
}

export default function CorrelationMatrix({ category }: CorrelationMatrixProps) {
  const variables = ['Rentabilidade', 'Inadimplência', 'Custos', 'Adesões', 'Cancelamentos'];
  
  // Correlation matrix data adjusted by category
  const getCorrelations = () => {
    const baseCorrelations = [
      [1.00, -0.78, -0.42, 0.85, -0.65],
      [-0.78, 1.00, 0.56, -0.72, 0.88],
      [-0.42, 0.56, 1.00, -0.38, 0.45],
      [0.85, -0.72, -0.38, 1.00, -0.58],
      [-0.65, 0.88, 0.45, -0.58, 1.00]
    ];

    // Slight variations based on category
    if (category === 'imovel') {
      baseCorrelations[0][3] = 0.92; // Rentabilidade × Adesões stronger
      baseCorrelations[3][0] = 0.92;
    } else if (category === 'veiculo') {
      baseCorrelations[1][4] = 0.93; // Inadimplência × Cancelamentos stronger
      baseCorrelations[4][1] = 0.93;
    }

    return baseCorrelations;
  };

  const correlations = getCorrelations();

  // Helper function to get color based on correlation strength
  const getCorrelationColor = (value: number) => {
    if (value === 1) return 'bg-zinc-800/30';
    const absValue = Math.abs(value);
    if (absValue >= 0.7) return value > 0 ? 'bg-[#B38CEB]/30' : 'bg-red-400/30';
    if (absValue >= 0.4) return value > 0 ? 'bg-[#B38CEB]/15' : 'bg-red-400/15';
    return 'bg-zinc-800/10';
  };

  const getTextColor = (value: number) => {
    if (value === 1) return 'text-zinc-500';
    const absValue = Math.abs(value);
    if (absValue >= 0.7) return value > 0 ? 'text-[#B38CEB]' : 'text-red-400';
    if (absValue >= 0.4) return value > 0 ? 'text-[#B38CEB]/70' : 'text-red-400/70';
    return 'text-zinc-500';
  };

  const insights = [
    { vars: 'Rentabilidade × Adesões', value: correlations[0][3].toFixed(2), type: 'forte', color: '#B38CEB' },
    { vars: 'Inadimplência × Cancelamentos', value: correlations[1][4].toFixed(2), type: 'forte', color: '#ef4444' },
    { vars: 'Rentabilidade × Inadimplência', value: correlations[0][1].toFixed(2), type: 'forte', color: '#f59e0b' }
  ];

  return (
    <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8">
      {/* Correlation Matrix */}
      <div className="mb-6">
        <div className="grid gap-2" style={{ gridTemplateColumns: `120px repeat(${variables.length}, 1fr)` }}>
          {/* Header Row */}
          <div></div>
          {variables.map((variable, i) => (
            <div key={i} className="text-center text-xs text-zinc-500 pb-2">
              {variable}
            </div>
          ))}

          {/* Data Rows */}
          {variables.map((rowVar, i) => (
            <>
              <div key={`label-${i}`} className="text-xs text-zinc-400 flex items-center pr-3">
                {rowVar}
              </div>
              {correlations[i].map((value, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-all duration-200 hover:scale-105 ${getCorrelationColor(value)} ${getTextColor(value)}`}
                >
                  {value.toFixed(2)}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-6 border-t border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#B38CEB]/30 rounded"></div>
          <span className="text-xs text-zinc-500">Correlação Positiva</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400/30 rounded"></div>
          <span className="text-xs text-zinc-500">Correlação Negativa</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-800/30 rounded"></div>
          <span className="text-xs text-zinc-500">Neutro</span>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 pt-6 border-t border-zinc-800/50">
        <div className="text-sm text-zinc-400 mb-4">Relações Identificadas</div>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-zinc-800/30">
              <span className="text-sm text-zinc-300">{insight.vars}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-zinc-800/50 text-zinc-400">{insight.type}</span>
                <span className="text-sm" style={{ color: insight.color }}>{insight.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
