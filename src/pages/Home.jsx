import { useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MarketChart from '../components/MarketChart';

export default function Home() {
  const { coins } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [search, setSearch] = useLocalStorage('search', '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <input
        ref={inputRef}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search"
      />

      <ul>
        {filtered.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>

      <MarketChart />
    </div>
  );
}
