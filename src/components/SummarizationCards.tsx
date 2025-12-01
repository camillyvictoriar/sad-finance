import { TrendingUp, TrendingDown, DollarSign, Users, AlertCircle, Activity, ArrowUp, ArrowDown, UserX } from 'lucide-react';

interface SummarizationCardsProps {
  category: string;
}

export default function SummarizationCards({ category }: SummarizationCardsProps) {
  // Simulated data based on category
  const getMetrics = () => {
    const baseMetrics = [
      {
        label: 'Rentabilidade',
        icon: TrendingUp,
        color: '#B38CEB',
        stats: {
          media: '12.4%',
          min: '8.2%',
          max: '15.8%',
          variacao: '+2.3%',
          trend: 'up'
        }
      },
      {
        label: 'Inadimplência',
        icon: AlertCircle,
        color: '#ef4444',
        stats: {
          media: '3.2%',
          min: '1.8%',
          max: '5.6%',
          variacao: '-0.5%',
          trend: 'down'
        }
      },
      {
        label: 'Fluxo de Caixa',
        icon: DollarSign,
        color: '#10b981',
        stats: {
          media: 'R$ 2.4M',
          min: 'R$ 1.8M',
          max: 'R$ 3.1M',
          variacao: '+18%',
          trend: 'up'
        }
      },
      {
        label: 'Adesões Mensais',
        icon: Users,
        color: '#3b82f6',
        stats: {
          media: '1.847',
          min: '1.425',
          max: '2.234',
          variacao: '+12.4%',
          trend: 'up'
        }
      },
      {
        label: 'Cancelamentos',
        icon: UserX,
        color: '#f97316',
        stats: {
          media: '284',
          min: '198',
          max: '356',
          variacao: '-5.2%',
          trend: 'down'
        }
      },
      {
        label: 'Custo Operacional',
        icon: Activity,
        color: '#f59e0b',
        stats: {
          media: 'R$ 890K',
          min: 'R$ 720K',
          max: 'R$ 1.1M',
          variacao: '-3.1%',
          trend: 'down'
        }
      }
    ];

    // Adjust values based on category
    if (category === 'imovel') {
      baseMetrics[0].stats.media = '14.2%';
      baseMetrics[1].stats.media = '2.1%';
      baseMetrics[3].stats.media = '892';
    } else if (category === 'veiculo') {
      baseMetrics[0].stats.media = '11.8%';
      baseMetrics[1].stats.media = '4.5%';
      baseMetrics[3].stats.media = '2.145';
    } else if (category === 'servico') {
      baseMetrics[0].stats.media = '10.9%';
      baseMetrics[1].stats.media = '3.8%';
      baseMetrics[3].stats.media = '1.523';
    }

    return baseMetrics;
  };

  const metrics = getMetrics();

  return (
    <div className="grid grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositiveTrend = metric.stats.trend === 'up';
        
        return (
          <div
            key={index}
            className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-700/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                <Icon className="w-6 h-6" style={{ color: metric.color }} strokeWidth={1.5} />
              </div>
              <div className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${isPositiveTrend ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {isPositiveTrend ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {metric.stats.variacao}
              </div>
            </div>

            {/* Label */}
            <div className="text-zinc-400 text-sm mb-4">{metric.label}</div>

            {/* Main Value */}
            <div className="text-white text-3xl mb-6">{metric.stats.media}</div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
              <div>
                <div className="text-xs text-zinc-500 mb-1">Mínimo</div>
                <div className="text-zinc-300 text-sm">{metric.stats.min}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-1">Máximo</div>
                <div className="text-zinc-300 text-sm">{metric.stats.max}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
