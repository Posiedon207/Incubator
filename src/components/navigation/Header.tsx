
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
    <header className="sticky top-0 z-10 bg-white dark:bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center h-16 px-4">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-foreground">{title}</h1>
      </div>
    </header>
  );
};
