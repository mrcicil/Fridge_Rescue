import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import fridgeLogo from '../assets/fridge_rescue.png';
import AuthContext from '../context/Authcontext';
import { Link } from 'react-router-dom';

function Header(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    console.log(user);
  
    let navigation = [];

    if (localStorage.getItem("userToken") === null){
      navigation = [
      { name: 'Home', href: '/homepage' },
      { name: 'Company', href: '/company' },
    ]
    }
    else{
      navigation = [
      { name: 'Home', href: '/homepage' },
      { name: 'Recipe', href: '/search' },
      { name: 'Company', href: '/company' },
      ]
    }

    return(
        <>
         <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/homepage" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <img
                alt={fridgeLogo}
                src=""
                className="h-8 w-auto"
              /> */}
               
                      <img className="h-8 w-auto" src={fridgeLogo} alt="Fridge Rescue" />
                    
            </a>
            <p>Hi {!!localStorage.getItem("userToken")? localStorage.getItem("userToken") : "guest"}!</p>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 ">
          {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </Link>
            ))}

          
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* Rahmat - after user logout which page to land? */}
            {!!localStorage.getItem("userToken")? (<a href="/login" onClick={logout} className="text-sm/6 font-semibold text-gray-900">
              Log out<span aria-hidden="true">&rarr;</span>
            </a>) : (<Link to="/login" className="text-sm/6 font-semibold text-gray-900">
              Log in<span aria-hidden="true">&rarr;</span>
            </Link>)}
            
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/homepage" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={fridgeLogo} alt="Fridge Rescue" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                 {navigation.map((item) => (
             <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </Link>
         
              
            ))}

           
                </div>
                <div className="py-6">
                   {user? (<a href="#" onClick={logout} className="text-sm/6 font-semibold text-gray-900">
              Log out<span aria-hidden="true">&rarr;</span>
            </a>) : (<a href="/login" className="text-sm/6 font-semibold text-gray-900">
              Log in<span aria-hidden="true">&rarr;</span>
            </a>)}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <Outlet/>
        </>
    )

}

export default Header;