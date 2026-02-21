import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MarketChart from '../components/MarketChart';
import { Search, ArrowUpRight, ArrowDownRight, Star, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

const Home = () => {
  const { coins } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [searchQuery, setSearchQuery] = useLocalStorage('cryptoSearchQuery', '');
  const [sortBy, setSortBy] = useState('market_cap');
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const totalMarketCap = coins.reduce((acc, coin) => acc + coin.market_cap, 0);
  const totalVolume = coins.reduce((acc, coin) => acc + coin.total_volume, 0);
  const topGainer = coins.length > 0 
    ? coins.reduce((prev, current) => (prev.price_change_percentage_24h > current.price_change_percentage_24h ? prev : current))
    : null;
  const topLoser = coins.length > 0
    ? coins.reduce((prev, current) => (prev.price_change_percentage_24h < current.price_change_percentage_24h ? prev : current))
    : null;

  const filteredCoins = coins
    .filter(coin => 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return b.current_price - a.current_price;
      if (sortBy === 'change') return b.price_change_percentage_24h - a.price_change_percentage_24h;
      return b.market_cap - a.market_cap;
    });

  const toggleWatchlist = (coinId) => {
    setWatchlist(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="w-16 h-16 border-4 border-[#00D4AA]/20 border-t-[#00D4AA] rounded-full animate-spin"></div>
        <p className="text-[#848E9C]">Scanning blockchain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-[#F6465D]/10 border border-[#F6465D]/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-[#F6465D] mb-2">Connection Error</h3>
          <p className="text-[#848E9C]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-1">Market Overview</h2>
          <p className="text-[#848E9C]">Real-time cryptocurrency market data</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#848E9C]">Last updated: {new Date().toLocaleTimeString()}</span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0ECB81]/10 border border-[#0ECB81]/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-[#0ECB81] animate-pulse"></div>
            <span className="text-sm text-[#0ECB81] font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Stats Grid - MAY GAP NA */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard 
    title="Total Market Cap"
    value={`$${(totalMarketCap / 1e12).toFixed(2)}T`}
    change="+2.4%"
    positive={true}
    icon={DollarSign}
  />
  <StatCard 
    title="24h Volume"
    value={`$${(totalVolume / 1e9).toFixed(2)}B`}
    change="+5.1%"
    positive={true}
    icon={BarChart3}
  />
  <StatCard 
    title="Top Gainer"
    value={topGainer?.symbol.toUpperCase()}
    change={`+${topGainer?.price_change_percentage_24h.toFixed(2)}%`}
    positive={true}
    icon={TrendingUp}
    subtext={`$${topGainer?.current_price.toLocaleString()}`}
  />
  <StatCard 
    title="Top Loser"
    value={topLoser?.symbol.toUpperCase()}
    change={`${topLoser?.price_change_percentage_24h.toFixed(2)}%`}
    positive={false}
    icon={TrendingUp}
    subtext={`$${topLoser?.current_price.toLocaleString()}`}
  />
</div>

      {/* Chart */}
      <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Price Chart</h3>
          <div className="flex gap-2">
            {['1H', '24H', '7D', '30D'].map((tf) => (
              <button 
                key={tf}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  tf === '24H' 
                    ? 'bg-[#00D4AA] text-[#0B0E11]' 
                    : 'text-[#848E9C] hover:bg-[#2B3139] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <MarketChart />
      </div>

      {/* Search Bar - AYOS NA: Walang overlap */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="search-icon-fix w-5 h-5 text-[#848E9C]" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-fix"
          />
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3.5 bg-[#0B0E11] border border-[#2B3139] rounded-xl text-white focus:border-[#00D4AA] focus:outline-none cursor-pointer"
        >
          <option value="market_cap" className="bg-[#151A21] text-white">Sort by Market Cap</option>
          <option value="price" className="bg-[#151A21] text-white">Sort by Price</option>
          <option value="change" className="bg-[#151A21] text-white">Sort by 24h Change</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2B3139] bg-[#0B0E11]">
                <th className="text-left py-4 px-6 text-xs font-medium text-[#848E9C] uppercase">Asset</th>
                <th className="text-right py-4 px-6 text-xs font-medium text-[#848E9C] uppercase">Price</th>
                <th className="text-right py-4 px-6 text-xs font-medium text-[#848E9C] uppercase">24h Change</th>
                <th className="text-right py-4 px-6 text-xs font-medium text-[#848E9C] uppercase hidden md:table-cell">Market Cap</th>
                <th className="text-right py-4 px-6 text-xs font-medium text-[#848E9C] uppercase hidden lg:table-cell">Volume (24h)</th>
                <th className="text-center py-4 px-6 text-xs font-medium text-[#848E9C] uppercase">Watch</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#848E9C]">
                    No coins found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredCoins.map((coin, index) => (
                  <tr key={coin.id} className="border-b border-[#2B3139] hover:bg-[#2B3139]/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <span className="text-[#848E9C] w-6 text-sm">{index + 1}</span>
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <h4 className="font-semibold">{coin.name}</h4>
                          <span className="text-sm text-[#848E9C]">{coin.symbol.toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-mono font-medium">
                        ${coin.current_price.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-sm ${
                        coin.price_change_percentage_24h >= 0 
                          ? 'bg-[#0ECB81]/10 text-[#0ECB81]' 
                          : 'bg-[#F6465D]/10 text-[#F6465D]'
                      }`}>
                        {coin.price_change_percentage_24h >= 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right hidden md:table-cell">
                      <span className="font-mono text-[#848E9C]">
                        ${(coin.market_cap / 1e9).toFixed(2)}B
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right hidden lg:table-cell">
                      <span className="font-mono text-[#848E9C]">
                        ${(coin.total_volume / 1e6).toFixed(2)}M
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => toggleWatchlist(coin.id)}
                        className={`p-2 rounded-lg transition-all ${
                          watchlist.includes(coin.id)
                            ? 'text-[#F0B90B] bg-[#F0B90B]/10'
                            : 'text-[#848E9C] hover:bg-[#2B3139] hover:text-white'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${watchlist.includes(coin.id) ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, positive, icon: Icon, subtext }) => (
  <div className="bg-[#151A21] border border-[#2B3139] rounded-2xl p-5 hover:border-[#00D4AA]/30 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${positive ? 'bg-[#0ECB81]/10' : 'bg-[#F6465D]/10'}`}>
        <Icon className={`w-5 h-5 ${positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
        {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <h3 className="text-[#848E9C] text-sm mb-1">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
    {subtext && <p className="text-sm text-[#848E9C] mt-1">{subtext}</p>}
  </div>
);

export default Home;