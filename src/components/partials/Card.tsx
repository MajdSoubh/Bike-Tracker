import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full border border-slate-200 bg-white gap-3 rounded-xl md:p-5 max-md:p-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
