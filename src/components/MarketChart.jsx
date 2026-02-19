import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

export default function MarketChart() {
  const { coins } = useCrypto();

  const data = coins.map(c => ({
    name: c.symbol.toUpperCase(),
    price: c.current_price
  }));

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="price" stroke="#00ffff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
