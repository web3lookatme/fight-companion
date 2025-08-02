import React from 'react';

interface SectionHeaderProps {
  title: string;
  accent: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, accent }) => {
  return (
    <h2 className="text-5xl font-bold text-white tracking-wider mb-8 uppercase">
      {title} <span className="text-gold">{accent}</span>
    </h2>
  );
};

export default SectionHeader;
