import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Fighter } from '../../types';

interface ComparisonBarChartProps {
  fighter1: Fighter;
  fighter2: Fighter;
}

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({ fighter1, fighter2 }) => {
  const data = [
    { name: 'Wins', [fighter1.name]: fighter1.record.wins, [fighter2.name]: fighter2.record.wins },
    { name: 'Losses', [fighter1.name]: fighter1.record.losses, [fighter2.name]: fighter2.record.losses },
    { name: 'Reach', [fighter1.name]: parseFloat(fighter1.stats.reach), [fighter2.name]: parseFloat(fighter2.stats.reach) },
    { name: 'Height', [fighter1.name]: parseFloat(fighter1.stats.height), [fighter2.name]: parseFloat(fighter2.stats.height) },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" stroke="#A0A0A0" />
        <Tooltip
          cursor={{ fill: '#1D1D1D' }}
          contentStyle={{ backgroundColor: '#111111', border: '1px solid #FFD700' }}
        />
        <Bar dataKey={fighter1.name} fill="#FFD700" barSize={30}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry[fighter1.name] > entry[fighter2.name] ? '#FFD700' : '#4A5568'} />
          ))}
        </Bar>
        <Bar dataKey={fighter2.name} fill="#4A5568" barSize={30}>
           {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry[fighter2.name] > entry[fighter1.name] ? '#FFD700' : '#4A5568'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonBarChart;
