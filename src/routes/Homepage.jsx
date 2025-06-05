import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import fridgeLogo from "../assets/fridge_rescue.png";
import foodWasteImage from "../assets/food_waste.png"; 
import cookingImage from "../assets/cooking.jpg"; 

function Homepage() {
  return (
    <div className="max-w-7xl mx-auto px-5">
      {/* Hero Section */}
      <section className="py-10 text-center mb-10">
        <div className="mb-6">
          <img
            src={fridgeLogo}
            alt="Fridge Rescue"
            className="w-32 h-auto mx-auto"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Turn Your Leftovers into Culinary Magic
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stop wasting food! Input what's in your fridge, and we'll suggest delicious recipes tailored just for you.
          </p>

          {!!localStorage.getItem("userToken")? <Link 
            to="/search" 
            className="inline-block bg-gray-600 !text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
          >
            Get Started Now
          </Link> : <Link 
            to="/login" 
            className="inline-block bg-gray-600 !text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
          >
            Get Started Now
          </Link>}
          
         
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 bg-gray-50 rounded-2xl mb-10 pr-4 pl-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-4 md:px-8">
          {/* Left Column */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Fridge Rescue?
            </h2>
            <div className="flex flex-col flex-grow px-4 md:px-6"> 
              <p className="text-gray-600 mb-6 leading-relaxed">
                Did you know that approximately one-third of all food produced globally goes to waste? That's about 1.3 billion tonnes per year!
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our mission is to help home cooks like you reduce food waste by making the most of what's already in your fridge.
              </p>
              <div className="mt-auto"> 
                <img
                  src={foodWasteImage}
                  alt="Food waste illustration"
                  className="w-full max-w-md h-auto rounded-xl shadow-md mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              How It Works
            </h3>
            <div className="flex flex-col flex-grow px-4 md:px-6"> 
              <div className="space-y-6 mb-8"> 
                <div className="flex items-start"> 
                  <div className="flex-shrink-0"> 
                    <span className="w-8 h-8 bg-gray-600 text-white rounded-full 
                                  flex items-center justify-center font-bold"> 
                      1
                    </span>
                  </div>
                  <p className="text-gray-600 ml-4 pt-1 text-left">
                    Input ingredients you have in your fridge
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="w-8 h-8 bg-gray-600 text-white rounded-full 
                                  flex items-center justify-center font-bold">
                      2
                    </span>
                  </div>
                  <p className="text-gray-600 ml-4 pt-1 text-left">
                    Get instant recipe suggestions
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="w-8 h-8 bg-gray-600 text-white rounded-full 
                                  flex items-center justify-center font-bold">
                      3
                    </span>
                  </div>
                  <p className="text-gray-600 ml-4 pt-1 text-left">
                    Cook delicious meals and reduce waste!
                  </p>
                </div>
              </div>
              <div className="mt-auto"> 
                <img
                  src={cookingImage}
                  alt="Cooking illustration"
                  className="w-full max-w-md h-auto rounded-xl shadow-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center py-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Meet the Team Behind Fridge Rescue
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          We're passionate about reducing food waste and making cooking easier for everyone.
        </p>
        <Link 
          to="/team" 
          className="inline-block bg-gray-600 !text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:-translate-y-0.5"
        >
          Meet Our Team
        </Link>
      </section>
    </div>
  );
}

export default Homepage;