import { useCrypto } from '../context/CryptoContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { PieChart as PieIcon, BarChart3, TrendingUp } from 'lucide-react';

export default function Analysis() {
  const { coins } = useCrypto();

  const pieData = coins.slice(0, 6).map(coin => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap,
    price: coin.current_price
  }));

  const volumeData = coins.slice(0, 8).map(coin => ({
    name: coin.symbol.toUpperCase(),
    volume: coin.total_volume / 1e9
  }));

  const COLORS = ['#00F5D4', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981', '#3B82F6'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Market Analysis</h1>
          <p className="text-gray-400">Deep dive into market metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="glass rounded-xl p-6 border border-dark-600">
          <div className="flex items-center gap-2 mb-6">
            <PieIcon className="w-5 h-5 text-accent-cyan" />
            <h3 className="text-lg font-semibold text-white">Market Cap Distribution</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151A21', 
                    border: '1px solid #2A3038',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => `$${(value / 1e9).toFixed(2)}B`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm text-gray-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Chart */}
        <div className="glass rounded-xl p-6 border border-dark-600">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-accent-purple" />
            <h3 className="text-lg font-semibold text-white">Trading Volume (24h)</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#2A3038" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#2A3038" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}B`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#151A21', 
                    border: '1px solid #2A3038',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => `$${value.toFixed(2)}B`}
                />
                <Bar dataKey="volume" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="glass rounded-xl border border-dark-600 overflow-hidden">
        <div className="p-6 border-b border-dark-600">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-trade-green" />
            <h3 className="text-lg font-semibold text-white">Top Performers</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Coin</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Price</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">24h Change</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-3">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {coins.slice(0, 5).map((coin) => (
                <tr key={coin.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium text-white">{coin.name}</p>
                        <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-medium">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      coin.price_change_percentage_24h >= 0 
                        ? 'bg-trade-green/10 text-trade-green' 
                        : 'bg-trade-red/10 text-trade-red'
                    }`}>
                      {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-300">
                    ${(coin.market_cap / 1e9).toFixed(2)}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}