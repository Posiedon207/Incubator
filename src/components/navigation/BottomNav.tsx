
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shirt, PlusSquare, User } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      icon: Shirt,
      label: 'Wardrobe',
      href: '/wardrobe',
      active: pathname === '/wardrobe',
    },
    {
      icon: PlusSquare,
      label: 'Add Item',
      href: '/add-item',
      active: pathname === '/add-item',
    },
    {
      icon: User,
      label: 'Profile',
      href: '/profile',
      active: pathname === '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex flex-col items-center justify-center py-1 ${
              item.active ? 'text-clos8-primary' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} strokeWidth={item.active ? 2 : 1.5} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
