import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Activity, RefreshCw, Layers, AlertTriangle, CheckCircle2, Lightbulb, Target, TrendingDown } from 'lucide-react';

export default function Simulation() {
  const [adminRate, setAdminRate] = useState(2.5);
  const [defaultRate, setDefaultRate] = useState(3.2);
  const [operationalCost, setOperationalCost] = useState(890);
  const [adhesions, setAdhesions] = useState(1847);
  const [category, setCategory] = useState('imovel');

  const categories = [
    { value: 'imovel', label: 'Imóvel' },
    { value: 'veiculo', label: 'Veículo' },
    { value: 'servico', label: 'Serviço' }
  ];

  // Calculate projections
  const calculateRevenue = () => (adhesions * adminRate * 100).toFixed(0);
  const calculateLoss = () => (adhesions * defaultRate * 50).toFixed(0);
  const calculateProfit = () => (parseFloat(calculateRevenue()) - parseFloat(calculateLoss()) - operationalCost * 1000).toFixed(0);
  const calculateROI = () => ((parseFloat(calculateProfit()) / (operationalCost * 1000)) * 100).toFixed(1);
  const calculateRentability = () => ((parseFloat(calculateProfit()) / parseFloat(calculateRevenue())) * 100).toFixed(1);

  // Determine cluster based on metrics
  const getCluster = () => {
    const roi = parseFloat(calculateROI());
    const rentability = parseFloat(calculateRentability());
    
    if (roi > 15 && rentability > 20 && defaultRate < 3) {
      return { name: 'Alta Performance', color: '#10b981', icon: CheckCircle2 };
    } else if (roi > 5 && rentability > 10) {
      return { name: 'Performance Moderada', color: '#B38CEB', icon: Target };
    } else {
      return { name: 'Crítico', color: '#ef4444', icon: AlertTriangle };
    }
  };

  // Generate intelligent recommendations
  const getRecommendations = () => {
    const roi = parseFloat(calculateROI());
    const rentability = parseFloat(calculateRentability());
    const profit = parseFloat(calculateProfit());
    const recommendations = [];

    if (defaultRate > 5) {
      recommendations.push({
        type: 'critical',
        title: 'Inadimplência Elevada',
        message: `Taxa de ${defaultRate}% está crítica. Implemente análise de crédito mais rigorosa.`,
        impact: 'Alto Risco'
      });
    }

    if (roi < 10) {
      recommendations.push({
        type: 'warning',
        title: 'ROI Abaixo do Ideal',
        message: `Com ${calculateROI()}%, considere reduzir custos operacionais ou aumentar adesões.`,
        impact: 'Médio'
      });
    }

    if (operationalCost > 1000) {
      recommendations.push({
        type: 'warning',
        title: 'Custo Operacional Alto',
        message: `R$ ${operationalCost}K está acima da média. Revise processos e automações.`,
        impact: 'Médio'
      });
    }

    if (adhesions < 1500) {
      recommendations.push({
        type: 'info',
        title: 'Potencial de Crescimento',
        message: `Aumente as adesões para ${adhesions + 500} e veja o impacto no ROI.`,
        impact: 'Oportunidade'
      });
    }

    if (adminRate < 2) {
      recommendations.push({
        type: 'info',
        title: 'Taxa Administrativa Baixa',
        message: 'Considere aumentar levemente a taxa para melhorar a receita sem perder competitividade.',
        impact: 'Oportunidade'
      });
    }

    if (rentability > 20 && roi > 15 && defaultRate < 3) {
      recommendations.push({
        type: 'success',
        title: 'Cenário Otimizado',
        message: 'Mantenha esses parâmetros. Métricas indicam operação saudável e sustentável.',
        impact: 'Excelente'
      });
    }

    return recommendations.length > 0 ? recommendations : [{
      type: 'info',
      title: 'Continue Ajustando',
      message: 'Experimente diferentes combinações de parâmetros para encontrar o cenário ideal.',
      impact: 'Neutro'
    }];
  };

  // Get status for each metric
  const getMetricStatus = (metric: string, value: number) => {
    if (metric === 'roi') {
      if (value > 15) return { color: '#10b981', label: 'Excelente' };
      if (value > 5) return { color: '#B38CEB', label: 'Bom' };
      return { color: '#ef4444', label: 'Crítico' };
    }
    if (metric === 'rentability') {
      if (value > 20) return { color: '#10b981', label: 'Excelente' };
      if (value > 10) return { color: '#B38CEB', label: 'Bom' };
      return { color: '#ef4444', label: 'Crítico' };
    }
    if (metric === 'default') {
      if (value < 3) return { color: '#10b981', label: 'Excelente' };
      if (value < 7) return { color: '#B38CEB', label: 'Atenção' };
      return { color: '#ef4444', label: 'Crítico' };
    }
    if (metric === 'profit') {
      if (value > 100000) return { color: '#10b981', label: 'Excelente' };
      if (value > 0) return { color: '#B38CEB', label: 'Positivo' };
      return { color: '#ef4444', label: 'Prejuízo' };
    }
    return { color: '#71717a', label: 'Neutro' };
  };

  const resetValues = () => {
    setAdminRate(2.5);
    setDefaultRate(3.2);
    setOperationalCost(890);
    setAdhesions(1847);
    setCategory('imovel');
  };

  const cluster = getCluster();
  const recommendations = getRecommendations();
  const ClusterIcon = cluster.icon;

  const roiStatus = getMetricStatus('roi', parseFloat(calculateROI()));
  const rentabilityStatus = getMetricStatus('rentability', parseFloat(calculateRentability()));
  const profitStatus = getMetricStatus('profit', parseFloat(calculateProfit()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 p-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-white mb-2">Simulação de Cenários</h1>
        <p className="text-zinc-400">Ajuste parâmetros e receba recomendações inteligentes para tomada de decisão</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Left Panel - Controls */}
        <div className="col-span-1 space-y-4">
          {/* Category Selection */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
            <label className="text-zinc-300 text-sm mb-3 block flex items-center gap-2">
              <Layers className="w-4 h-4" strokeWidth={1.5} />
              Categoria do Grupo
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/30 border border-[#B38CEB]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/50 transition-all cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Admin Rate */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
            <label className="text-zinc-300 text-sm mb-3 block">Taxa Administrativa (%)</label>
            <div className="mb-3">
              <input
                type="number"
                value={adminRate}
                onChange={(e) => setAdminRate(parseFloat(e.target.value))}
                step="0.1"
                className="w-full bg-black/30 border border-[#B38CEB]/30 rounded-xl px-4 py-3 text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/50 transition-all"
              />
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={adminRate}
              onChange={(e) => setAdminRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B38CEB] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Default Rate */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
            <label className="text-zinc-300 text-sm mb-3 block">Inadimplência (%)</label>
            <div className="mb-3">
              <input
                type="number"
                value={defaultRate}
                onChange={(e) => setDefaultRate(parseFloat(e.target.value))}
                step="0.1"
                className="w-full bg-black/30 border border-[#B38CEB]/30 rounded-xl px-4 py-3 text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/50 transition-all"
              />
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={defaultRate}
              onChange={(e) => setDefaultRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B38CEB] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Operational Cost */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
            <label className="text-zinc-300 text-sm mb-3 block">Custo Operacional (K)</label>
            <div className="mb-3">
              <input
                type="number"
                value={operationalCost}
                onChange={(e) => setOperationalCost(parseInt(e.target.value))}
                step="10"
                className="w-full bg-black/30 border border-[#B38CEB]/30 rounded-xl px-4 py-3 text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/50 transition-all"
              />
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              value={operationalCost}
              onChange={(e) => setOperationalCost(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B38CEB] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Adhesions */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
            <label className="text-zinc-300 text-sm mb-3 block">Adesões</label>
            <div className="mb-3">
              <input
                type="number"
                value={adhesions}
                onChange={(e) => setAdhesions(parseInt(e.target.value))}
                step="10"
                className="w-full bg-black/30 border border-[#B38CEB]/30 rounded-xl px-4 py-3 text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/50 transition-all"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={adhesions}
              onChange={(e) => setAdhesions(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#B38CEB] [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetValues}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900/40 hover:bg-zinc-800/50 text-zinc-400 hover:text-white border border-zinc-800/50 py-3 rounded-xl transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
            Resetar
          </button>
        </div>

        {/* Right Panel - Results */}
        <div className="col-span-3 space-y-6">
          {/* Category Banner + Cluster Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B38CEB]/15 rounded-xl flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[#B38CEB]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Categoria</div>
                  <div className="text-white">{categories.find(c => c.value === category)?.label}</div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${cluster.color}20` }}
                >
                  <ClusterIcon className="w-5 h-5" strokeWidth={1.5} style={{ color: cluster.color }} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Cluster</div>
                  <div className="text-white">{cluster.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-[#B38CEB]/15 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#B38CEB]" strokeWidth={1.5} />
                </div>
                <div 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${profitStatus.color}15`,
                    color: profitStatus.color
                  }}
                >
                  {profitStatus.label}
                </div>
              </div>
              <div className="text-zinc-400 text-sm mb-1">Lucro Projetado</div>
              <div className="text-white text-2xl">R$ {parseInt(calculateProfit()).toLocaleString()}</div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${rentabilityStatus.color}15`,
                    color: rentabilityStatus.color
                  }}
                >
                  {rentabilityStatus.label}
                </div>
              </div>
              <div className="text-zinc-400 text-sm mb-1">Rentabilidade</div>
              <div className="text-white text-2xl">{calculateRentability()}%</div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-amber-500/15 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                </div>
                <div 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${roiStatus.color}15`,
                    color: roiStatus.color
                  }}
                >
                  {roiStatus.label}
                </div>
              </div>
              <div className="text-zinc-400 text-sm mb-1">ROI</div>
              <div className="text-white text-2xl">{calculateROI()}%</div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                </div>
                <div className="text-xs text-[#B38CEB] bg-[#B38CEB]/10 px-2 py-1 rounded-full">
                  Receita
                </div>
              </div>
              <div className="text-zinc-400 text-sm mb-1">Receita Total</div>
              <div className="text-white text-2xl">R$ {parseInt(calculateRevenue()).toLocaleString()}</div>
            </div>
          </div>

          {/* Intelligent Recommendations */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[#B38CEB] rounded-full"></div>
              <h2 className="text-white">Recomendações Inteligentes</h2>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec, index) => {
                const iconColor = 
                  rec.type === 'critical' ? '#ef4444' : 
                  rec.type === 'warning' ? '#f59e0b' :
                  rec.type === 'success' ? '#10b981' : '#B38CEB';
                
                const Icon = 
                  rec.type === 'critical' ? AlertTriangle : 
                  rec.type === 'warning' ? TrendingDown :
                  rec.type === 'success' ? CheckCircle2 : Lightbulb;

                return (
                  <div 
                    key={index} 
                    className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${iconColor}15` }}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: iconColor }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <div className="text-white">{rec.title}</div>
                          <div 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: `${iconColor}15`,
                              color: iconColor
                            }}
                          >
                            {rec.impact}
                          </div>
                        </div>
                        <div className="text-sm text-zinc-400">{rec.message}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-gradient-to-r from-[#B38CEB] to-[#9d6fd4] hover:from-[#c9a8f0] hover:to-[#b38ceb] text-black py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#B38CEB]/20 hover:shadow-[#B38CEB]/40">
            Salvar Simulação
          </button>
        </div>
      </div>
    </div>
  );
}