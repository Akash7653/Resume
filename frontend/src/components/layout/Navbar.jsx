import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useState } from 'react';

export const Navbar = ({ onMenuClick = () => {}, showWelcome = false, pageTitle = "" }) => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      return names.length > 1 
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 dark:bg-dark-surface/80 dark:border-dark-border theme-transition">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors theme-transition"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Page title in top nav - desktop/tablet only */}
            {pageTitle && !showWelcome && (
              <h1 className="hidden lg:block text-xl font-semibold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
            )}
            
            {/* Welcome message - Dashboard only */}
            {showWelcome && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Welcome back!</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track your resume performance</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-red-400"></span>
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">{getUserInitials()}</span>
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle size="sm" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
