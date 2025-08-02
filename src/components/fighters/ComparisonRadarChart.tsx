import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Fighter } from '../../types';

interface ComparisonRadarChartProps {
  fighter1: Fighter;
  fighter2: Fighter;
}

const ComparisonRadarChart: React.FC<ComparisonRadarChartProps> = ({ fighter1, fighter2 }) => {
  const data = fighter1.attributes!.map((attr: { skill: string; value: number }, index: number) => ({
    skill: attr.skill,
    [fighter1.name]: attr.value,
    [fighter2.name]: fighter2.attributes![index].value,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#4A5568" />
        <PolarAngleAxis dataKey="skill" stroke="#E0E0E0" tick={{ fontSize: 16 }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#111111', border: '1px solid #FFD700' }}
        />
        <Legend />
        <Radar name={fighter1.name} dataKey={fighter1.name} stroke="#FFD700" fill="#FFD700" fillOpacity={0.6} />
        <Radar name={fighter2.name} dataKey={fighter2.name} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonRadarChart;