import { useCrypto } from '../context/CryptoContext';
import { TrendingUp, TrendingDown, Target, Activity, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Analysis = () => {
  const { coins } = useCrypto();

  const totalMarketCap = coins.reduce((acc, coin) => acc + coin.market_cap, 0);
  const avgChange = coins.length > 0 ? coins.reduce((acc, coin) => acc + coin.price_change_percentage_24h, 0) / coins.length : 0;
  const positiveCoins = coins.filter(c => c.price_change_percentage_24h > 0).length;
  const negativeCoins = coins.filter(c => c.price_change_percentage_24h < 0).length;

  const sentimentData = [
    { name: 'Bullish', value: positiveCoins || 1, color: '#0ECB81' },
    { name: 'Bearish', value: negativeCoins || 1, color: '#F6465D' },
  ];

  const topGainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
  const topLosers = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);

  const dominanceData = coins.slice(0, 3).map(coin => ({
    name: coin.symbol.toUpperCase(),
    value: ((coin.market_cap / totalMarketCap) * 100).toFixed(1),
    color: coin.symbol === 'btc' ? '#F7931A' : coin.symbol === 'eth' ? '#627EEA' : '#00D4AA'
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">Market Analysis</h2>
        <p className="text-[#848E9C]">Deep dive into market metrics and performance</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Market Sentiment" value={avgChange >= 0 ? 'Bullish' : 'Bearish'} subtext={`${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}% avg`} icon={avgChange >= 0 ? TrendingUp : TrendingDown} positive={avgChange >= 0} />
        <MetricCard title="Market Dominance" value="BTC" subtext="Leading asset" icon={Target} positive={true} />
        <MetricCard title="Volatility" value="Moderate" subtext="Stable conditions" icon={Activity} positive={true} />
        <MetricCard title="Active Assets" value={coins.length} subtext="Top 10 tracked" icon={Zap} positive={true} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sentiment */}
        <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Market Sentiment</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#151A21', border: '1px solid #2B3139', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[#848E9C] text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dominance */}
        <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Market Dominance</h3>
          <div className="space-y-4">
            {dominanceData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-[#848E9C]">{item.value}%</span>
                </div>
                <div className="h-2 bg-[#0B0E11] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                </div>
              </div>
            ))}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white font-medium">Others</span>
                <span className="text-[#848E9C]">{(100 - dominanceData.reduce((a, b) => a + parseFloat(b.value), 0)).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-[#0B0E11] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#848E9C]" style={{ width: `${100 - dominanceData.reduce((a, b) => a + parseFloat(b.value), 0)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gainers */}
        <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#0ECB81]" />
            <h3 className="text-lg font-semibold text-white">Top Gainers</h3>
          </div>
          <div className="space-y-3">
            {topGainers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-white text-sm">{coin.name}</p>
                    <p className="text-xs text-[#848E9C]">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-white text-sm">${coin.current_price.toLocaleString()}</p>
                  <p className="text-sm text-[#0ECB81] font-medium">+{coin.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-[#F6465D]" />
            <h3 className="text-lg font-semibold text-white">Top Losers</h3>
          </div>
          <div className="space-y-3">
            {topLosers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between p-3 bg-[#0B0E11] rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-white text-sm">{coin.name}</p>
                    <p className="text-xs text-[#848E9C]">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-white text-sm">${coin.current_price.toLocaleString()}</p>
                  <p className="text-sm text-[#F6465D] font-medium">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtext, icon: Icon, positive }) => (
  <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-5">
    <div className={`p-3 rounded-xl w-fit mb-3 ${positive ? 'bg-[#0ECB81]/10' : 'bg-[#F6465D]/10'}`}>
      <Icon className={`w-5 h-5 ${positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`} />
    </div>
    <h3 className="text-[#848E9C] text-sm mb-1">{title}</h3>
    <p className={`text-xl font-bold ${positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{value}</p>
    <p className="text-sm text-[#848E9C] mt-1">{subtext}</p>
  </div>
);

export default Analysis;