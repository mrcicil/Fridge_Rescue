import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import fridgeLogo from '../assets/fridge_rescue.png';
import AuthContext from '../context/Authcontext';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const navigation = !localStorage.getItem("userName") 
  ? [
      { name: 'Home', href: '/homepage' },
      { name: 'Team', href: '/team' },
    ]
  : localStorage.getItem("memberType") === "ADMIN"
    ? [
        { name: 'Home', href: '/homepage' },
        { name: 'Search', href: '/search' },
        { name: 'Team', href: '/team' },
        { name: 'Profile', href: '/profile' },
        { name: 'Userlist', href: '/userlist' },
      ]
    : [
        { name: 'Home', href: '/homepage' },
        { name: 'Search', href: '/search' },
        { name: 'Team', href: '/team' },
        { name: 'Profile', href: '/profile' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 dark:bg-gray-800/95 
                        backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo and User Section - Left */}
            <div className="flex-1 flex items-center gap-4">
              <Link 
                to="/homepage" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  className="h-8 w-auto" 
                  src={fridgeLogo} 
                  alt="Fridge Rescue" 
                />
              </Link>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-200">
                Hi {localStorage.getItem("userName") || "guest"}!
              </p>
            </div>

            {/* Navigation Links - Center */}
            <div className="hidden md:flex items-center justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors px-4
                            ${isActive(item.href)
                              ? 'text-gray-700 dark:text-gray-300 hover:text-recipe-500 dark:hover:text-gray-200'
                              : 'text-gray-700 dark:text-gray-300 hover:text-recipe-500 dark:hover:text-gray-200'
                            }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Login/Logout Button - Right */}
            <div className="flex-1 flex items-center justify-end">
              <div className="hidden md:block">
                {!!localStorage.getItem("userName") ? (
                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Log out
                    <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg
                             bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Log in
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg
                         text-gray-700 dark:text-gray-300 hover:bg-gray-100 
                         dark:hover:bg-gray-800 transition-colors ml-4"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <Dialog
          as="div"
          className="md:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
          
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs
                                 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-4 py-4 
                            border-b border-gray-200 dark:border-gray-700">
                <Link to="/homepage">
                  <img 
                    className="h-8 w-auto" 
                    src={fridgeLogo} 
                    alt="Fridge Rescue" 
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300
                           hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile menu items */}
              <div className="flex-1 px-4 py-6 space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-base font-medium
                              ${isActive(item.href)
                                ? 'text-recipe-500 dark:text-gray-200'
                                : 'text-gray-700 dark:text-gray-300'
                              }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile menu footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                {!!localStorage.getItem("userName") ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full items-center gap-1 px-4 py-2 text-center rounded-lg
                             bg-gray-100 dark:bg-gray-700 text-gray-700 
                             dark:text-gray-300 hover:bg-gray-200 
                             dark:hover:bg-gray-600 transition-colors"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-1 px-4 py-2 
                             rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 
                             dark:text-gray-300 hover:bg-gray-200 
                             dark:hover:bg-gray-600 transition-colors"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Main content - add padding to account for fixed header */}
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}

export default Header;