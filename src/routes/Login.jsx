import fridgeLogo from '../assets/fridge_rescue.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext';
import { useContext } from 'react';
import { useEffect } from 'react';

function Login(){
  const [username, setUsername] = useState();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!!localStorage.getItem("userToken")){
      navigate("/homepage")
    }
  })


const handleSubmit = (e) => {
    e.preventDefault();

    login({ username });
    navigate("/search");
  };

    return(
        <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="w-20 h-20" src={fridgeLogo} alt="Fridge Rescue" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
         
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* <div className='bg-sky-400'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md hover:bg-indigo-500"
              >

                Sign in
              </button>
            </div> */}

            <div className="bg-sky-400">
  <button
    type="submit"
    className="flex w-full justify-center rounded-md bg-green-500 text-black hover:bg-green-700"
  >
    Sign in
  </button>
</div>


            
          </form>

        
        </div>
      </div>
    </>
    )
}

export default Login;