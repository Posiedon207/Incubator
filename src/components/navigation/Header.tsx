
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center h-16 px-4">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-500 hover:text-gray-800"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
};
