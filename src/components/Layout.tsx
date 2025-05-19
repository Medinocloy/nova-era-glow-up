
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
    <div className="min-h-screen flex flex-col bg-nova-black">
      {/* Header con estilo más amigable */}
      <header className="bg-nova-black text-white border-b border-nova-red/30 p-4 flex justify-between items-center shadow-md relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-nova-red to-transparent"></div>
        
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="flex items-center justify-center h-10 w-10 nova-button-gradient rounded-md">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-poppins tracking-wide font-bold text-white uppercase">NOVA <span className="text-nova-red">ERA</span></h1>
        </div>
        
        <button onClick={toggleMenu} className="lg:hidden p-2 text-nova-red">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Navegación vertical estilo moderno - para desktop */}
        <nav className="hidden lg:block w-64 bg-nova-black border-r border-nova-gray/20 text-white">
          <ul className="py-4">
            {menuItems.map((item) => (
              <li key={item.path} className="my-1 mx-2">
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center px-6 py-4 transition-colors rounded-md",
                    "border-l-2 hover:bg-nova-darkGray/30 font-poppins tracking-wide",
                    location.pathname === item.path 
                      ? "border-l-nova-red text-nova-red bg-nova-darkGray/30" 
                      : "border-l-transparent"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 px-6">
            <div className="gothic-divider"></div>
            <div className="text-center text-nova-gold text-xs font-poppins tracking-wider mt-4">
              ENTRENAMIENTO DE ÉLITE
            </div>
          </div>
        </nav>

        {/* Menú móvil estilo más amigable */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-90 z-40" onClick={toggleMenu}>
            <div 
              className="bg-nova-black text-white w-3/4 h-full p-4 border-r border-nova-red/30 rounded-r-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center h-10 w-10 nova-button-gradient rounded-md">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-poppins tracking-wider font-bold">NOVA <span className="text-nova-red">ERA</span></h1>
              </div>
              
              <div className="gothic-divider"></div>
              
              <ul className="py-4">
                {menuItems.map((item) => (
                  <li key={item.path} className="mb-2">
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center px-4 py-3 transition-colors rounded-md",
                        "border-l-2 font-poppins tracking-wide",
                        location.pathname === item.path 
                          ? "border-l-nova-red text-nova-red bg-nova-darkGray/30"
                          : "border-l-transparent hover:bg-nova-darkGray/20"
                      )}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="gothic-divider mt-8"></div>
              <div className="text-center text-nova-gold text-xs font-poppins tracking-wider mt-4">
                ENTRENAMIENTO DE ÉLITE
              </div>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 bg-nova-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
