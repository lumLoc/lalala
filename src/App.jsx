import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import { TrendingUp, BarChart3, Bell, Settings as SettingsIcon, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import SettingsPage from './pages/Settings'; // IMPORT MO ITO

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CryptoProvider>
      <Router>
        <div className="flex h-screen bg-[#0B0E11] text-white">
          
          {/* Sidebar - ADD MO YUNG SETTINGS DITO */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#151A21] border-r border-[#2B3139]
            transform transition-transform duration-300 lg:transform-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col
          `}>
            {/* Logo */}
            <div className="p-6 border-b border-[#2B3139]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4AA] to-[#00B4D8] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">CRYPTO<span className="text-[#00D4AA]">PULSE</span></h1>
                  <p className="text-xs text-[#848E9C]">Pro Trading</p>
                </div>
              </div>
            </div>

            {/* Nav - DAGDAG MO YUNG SETTINGS LINK */}
            <nav className="flex-1 p-4 space-y-2">
              <NavLink 
                to="/" 
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20' 
                    : 'text-[#848E9C] hover:bg-[#2B3139] hover:text-white'
                  }
                `}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Market</span>
              </NavLink>

              <NavLink 
                to="/analysis" 
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20' 
                    : 'text-[#848E9C] hover:bg-[#2B3139] hover:text-white'
                  }
                `}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Analysis</span>
              </NavLink>

              {/* DAGDAG MO ITO - SETTINGS LINK */}
              <NavLink 
                to="/settings" 
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20' 
                    : 'text-[#848E9C] hover:bg-[#2B3139] hover:text-white'
                  }
                `}
              >
                <SettingsIcon className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </NavLink>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#2B3139]">
              <div className="bg-[#0B0E11] rounded-xl p-4 border border-[#2B3139]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0ECB81] animate-pulse"></div>
                  <span className="text-xs text-[#848E9C]">Market Open</span>
                </div>
                <p className="text-xs text-[#848E9C]">Real-time data via CoinGecko</p>
              </div>
            </div>
          </aside>

          {/* Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            
            {/* Header - CONNECT MO YUNG SETTINGS ICON */}
            <header className="h-16 bg-[#151A21] border-b border-[#2B3139] flex items-center justify-between px-4 lg:px-6 shrink-0">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-[#848E9C] hover:text-white hover:bg-[#2B3139] rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                <div className="hidden md:block text-[#848E9C] text-sm">
                  Crypto-Pulse Pro Trading
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Notification - decoration lang */}
                <button className="relative p-2.5 text-[#848E9C] hover:text-white hover:bg-[#2B3139] rounded-xl transition-all">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#F6465D] rounded-full"></span>
                </button>
                
                {/* SETTINGS ICON - CONNECTED NA */}
                <NavLink 
                  to="/settings"
                  className={({ isActive }) => `
                    p-2.5 rounded-xl transition-all
                    ${isActive 
                      ? 'text-[#00D4AA] bg-[#00D4AA]/10' 
                      : 'text-[#848E9C] hover:text-white hover:bg-[#2B3139]'
                    }
                  `}
                >
                  <SettingsIcon className="w-5 h-5" />
                </NavLink>
                
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4AA] to-[#00B4D8] flex items-center justify-center text-sm font-bold ml-2">
                  U
                </div>
              </div>
            </header>

            {/* Page Content - DAGDAG MO YUNG SETTINGS ROUTE */}
            <main className="flex-1 overflow-auto p-4 lg:p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/settings" element={<SettingsPage />} /> {/* DAGDAG MO ITO */}
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;