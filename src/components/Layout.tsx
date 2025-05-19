
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, Calendar, Users, Flame, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      title: 'AGENDAR HORA', 
      path: '/schedule', 
      icon: <Calendar className="w-5 h-5" /> 
    },
    { 
      title: 'AGENDAR PERSONAL', 
      path: '/trainers', 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      title: 'ENTRENAR', 
      path: '/level-selection', 
      icon: <Flame className="w-5 h-5" /> 
    }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with logo and mobile menu button */}
      <header className="bg-nova-black text-white p-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-br from-nova-red to-nova-black rounded-full">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-poppins font-bold">NOVA ERA</h1>
        </div>
        
        <button onClick={toggleMenu} className="lg:hidden p-2">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Vertical navigation menu - for desktop */}
        <nav className="hidden lg:block w-64 bg-nova-black text-white">
          <ul className="py-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center px-6 py-4 hover:bg-nova-darkGray transition-colors",
                    location.pathname === item.path && "bg-nova-red"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-70 z-40" onClick={toggleMenu}>
            <div 
              className="bg-nova-black text-white w-3/4 h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="py-4">
                {menuItems.map((item) => (
                  <li key={item.path} className="mb-2">
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center px-6 py-4 hover:bg-nova-darkGray rounded-md transition-colors",
                        location.pathname === item.path && "bg-nova-red"
                      )}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
