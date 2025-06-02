import fridgeLogo from '../assets/fridge_rescue.png';
import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
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

return (
    <div className="max-w-7xl mx-auto px-5 min-h-screen bg-recipe-50">
      <div className="max-w-3xl mx-auto pt-20 pb-16"> 
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-12">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <img 
              src={fridgeLogo} 
              alt="Fridge Rescue" 
              className="w-32 h-32 mx-auto mb-8 animate-float"
            />
            <h2 className="text-4xl font-bold text-recipe-800 mb-3">
              Welcome Back
            </h2>
            <p className="text-recipe-600">
              Sign in to start finding recipes
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-lg font-medium text-recipe-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-recipe-200 
                          focus:ring-2 focus:ring-recipe-500 focus:border-recipe-500
                          transition-colors duration-200 bg-white text-recipe-800
                          placeholder-recipe-400"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-lg font-medium text-recipe-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-6 py-4 text-lg border border-recipe-200 
                          focus:ring-2 focus:ring-recipe-500 focus:border-recipe-500
                          transition-colors duration-200 bg-white text-recipe-800
                          placeholder-recipe-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="inline-block bg-gray-600 !text-white px-6 py-3 rounded-lg font-semibold 
                         transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
            >
              Sign In
            </button>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-4">
              <Link to="/homepage" className="block text-recipe-500 hover:text-recipe-600 font-medium">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;