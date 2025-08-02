import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

type Attributes = {
  skill: string;
  value: number;
}[];

interface FighterRadarChartProps {
  attributes: Attributes;
}

const FighterRadarChart: React.FC<FighterRadarChartProps> = ({ attributes }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={attributes}>
        <defs>
          <radialGradient id="goldGradient">
            <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#FFD700" stopOpacity={0.2}/>
          </radialGradient>
        </defs>
        <PolarGrid stroke="#4A5568" />
        <PolarAngleAxis dataKey="skill" stroke="#E0E0E0" tick={{ fontSize: 16 }} />
        <Radar name="Value" dataKey="value" stroke="#FFD700" fill="url(#goldGradient)" fillOpacity={0.6} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1A1A1A',
            borderColor: '#FFD700',
            color: '#E0E0E0'
          }}
          labelStyle={{ color: '#FFD700' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default FighterRadarChart;
