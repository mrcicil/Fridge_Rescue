import fridgeLogo from '../assets/fridge_rescue.png';
import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import memberAPI from '../api/memberapi';

function Confirmation(){
    const { id } = useParams();
    const [output, setOutput] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();

    useEffect(() => {
    confirmationGet(id);
  }, [])

    const confirmationGet = async (id) => {
  try {
    const response = await memberAPI.get(`/user/confirm?token=${id}`);
    setOutput(response.data);
    console.log(response.data);
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1800);
    return () => clearTimeout(timer);
    
  } catch (error) {
    setErrorMsg(error.response.data.message);
       const timer = setTimeout(() => {
      navigate("/homepage");
    }, 1800);
    return () => clearTimeout(timer);
 
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
              Welcome
            </h2>
            <p className="text-xl text-recipe-600 dark:text-gray-600">
              {output} {errorMsg}
            </p>
          </div>

      
          
        </div>
      </div>
    </div>
  );
}

export default Confirmation;