import { Link } from "react-router-dom";
import fridgeLogo from "../assets/fridge_rescue.png"; 

function ErrorPage(){

 return (
    <div className="max-w-7xl mx-auto px-5 min-h-screen bg-recipe-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto min-h-screen py-16">

          <div className="mb-4">
            <img
              src={fridgeLogo}
              alt="Fridge Rescue"
              className="w-32 h-auto mx-auto animate-float"
            />
          </div>

        {/* Error Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 max-w-2xl w-full text-center">
          
          <p className="text-recipe-500 dark:text-recipe-400 text-xl font-semibold mb-4">
            404
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-recipe-800 dark:text-white mb-6">
           Page not found
          </h1>
          
          <p className="text-lg text-recipe-600 dark:text-gray-300 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/homepage" 
              className="inline-block bg-gray-600 !text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
            
            <Link 
              to="/login" 
              className="inline-block bg-gray-600 !text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
            >
              Try Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ErrorPage;