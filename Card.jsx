
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-900/5">
      {children}
    </div>
  );
};

export default Card;
