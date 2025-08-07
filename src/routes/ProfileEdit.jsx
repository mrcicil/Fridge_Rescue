import fridgeLogo from '../assets/fridge_rescue.png';
import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { useEffect } from 'react';
import memberAPI from '../api/memberapi';

function ProfileEdit(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [memberType, setMemberType] = useState("");
  const [id, setId] = useState("");

  // Rahmatapi
  const [item, setItem] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const [error, setError] = useState(false);
  const navigate = useNavigate();

    // setUsername(localStorage.getItem("userName"));
    // setId(localStorage.getItem("userId"));
    // setMemberType(localStorage.getItem("memberType"));
    // setEmail(localStorage.getItem("email"));

  // Rahmat - if user already login, they will be direct to homepage
  useEffect(() => {
    if(!localStorage.getItem("userName")){
      navigate("/login")
    }
    setMemberType(localStorage.getItem("memberType"));

    //Rahmat - error msg ends after 1.5s
    const timer = setTimeout(() => {
      setError(false); 
    }, 1800);
    return () => clearTimeout(timer);
  })

  const handleSubmit = (e) => {
  e.preventDefault();
  const form = { ...item, userName: username, password: password, email: email, memberType: memberType };
  editPut(localStorage.getItem("userId"), form);
  
};

const editPut = async (id, item) => {
  try {
    const response = await memberAPI.put(`/user/${id}`, item);
    localStorage.setItem("userName", response.data.userName);
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("memberType", response.data.memberType);
    localStorage.setItem("email", response.data.email);
    navigate("/homepage");
  } catch (error) {
    setUsername("");
    setPassword("");
    setError(true);
    setErrorMsg(error.response.data.message);
 
  }
};

return (
    <div className="max-w-7xl mx-auto px-2 min-h-screen bg-recipe-50">
      <div className="max-w-3xl mx-auto pt-20 pb-16"> 
        {/* Card Container */}
        <div className="bg-white dark:bg-white rounded-2xl shadow-lg p-12">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <img 
              src={fridgeLogo} 
              alt="Fridge Rescue" 
              className="w-32 h-32 mx-auto mb-8 animate-float"
            />
            <h2 className="text-4xl font-bold text-recipe-800 dark:text-gray-800 mb-3">
              Hi {localStorage.getItem("userName")}
            </h2>
            <p className="text-xl text-recipe-600 dark:text-gray-600">
              Your Profile
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="relative space-y-8">
            {/* Username Field */}
           <div>
              <label 
                htmlFor="username" 
                className="block text-lg font-medium text-recipe-700 dark:text-gray-700 mb-3"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                required
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-recipe-200 dark:border-gray-600 
                          focus:ring-2 focus:ring-recipe-500 dark:focus:ring-blue-500
                          focus:border-recipe-500 dark:focus:border-gray-500
                          transition-colors duration-200 
                          bg-white dark:bg-gray-700
                          text-recipe-800 dark:text-white
                          placeholder-recipe-400 dark:placeholder-gray-400"
                placeholder={localStorage.getItem("userName")}
              />
            </div>

            {/* Email Field */}
               <div>
              <label 
                htmlFor="email" 
                className="block text-lg font-medium text-recipe-700 dark:text-gray-700 mb-3"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                required
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-recipe-200 dark:border-gray-600 
                          focus:ring-2 focus:ring-recipe-500 dark:focus:ring-blue-500
                          focus:border-recipe-500 dark:focus:border-gray-500
                          transition-colors duration-200 
                          bg-white dark:bg-gray-700
                          text-recipe-800 dark:text-white
                          placeholder-recipe-400 dark:placeholder-gray-400"
                placeholder={localStorage.getItem("email")}
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-lg font-medium text-recipe-700 dark:text-gray-700 mb-3"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-recipe-200 dark:border-gray-600
                          focus:ring-2 focus:ring-recipe-500 dark:focus:ring-gray-500
                          focus:border-recipe-500 dark:focus:border-gray-500
                          transition-colors duration-200 
                          bg-white dark:bg-gray-700
                          text-recipe-800 dark:text-white
                          placeholder-recipe-400 dark:placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

               {/* Member Type Field */}
                <div>
                <label 
                    htmlFor="memberType" 
                    className="block text-lg font-medium text-recipe-700 dark:text-gray-700 mb-3"
                >
                    User Type
                </label>
                <div
                    id="memberType"
                    className="w-full px-6 py-4 text-lg border border-recipe-200 dark:border-gray-600 
                            bg-gray-100 dark:bg-gray-700
                            text-recipe-800 dark:text-white
                            rounded"
                >
                    {memberType}
                </div>
                </div>
            
            {/* Error message if wrong username or password */}
            {/* {error? (<div className="font-bold text-red-500 h-1/3"> */}
            {/* {error? (<div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm p-3 bg-red-500 text-white rounded-lg shadow-lg">
              <p>The username or password you <br></br>entered is incorrect</p>
            </div>) : (<></>)} */}

            {error? (<p className="font-bold text-red-500 h-1/3">
              <p>{errorMsg}</p>
            </p>) : (<p><br></br></p>)}
            
            {/* Submit Button */}
         
            <button
              type="submit"
              className="inline-block bg-gray-600 !text-white dark:bg-gray-600 px-6 py-3 rounded-lg font-semibold 
                         transition-all duration-300 hover:bg-gray-700 dark:hover:bg-gray-700 hover:-translate-y-0.5"
            >
              Confirm
            </button>
            

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-4">
              <Link to="/homepage" className="text-recipe-500 dark:text-gray-500 
                         hover:text-recipe-600 dark:hover:text-gray-400 
                         font-medium">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;