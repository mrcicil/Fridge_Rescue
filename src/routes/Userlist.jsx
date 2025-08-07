import fridgeLogo from '../assets/fridge_rescue.png';
import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import memberAPI from '../api/memberapi';

function Userlist(){
    const { id } = useParams();
    const [output, setOutput] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();

   

    const getUserList = async (type) => {
  try {
    const response = await memberAPI.get(`/user?type=${type}`);
    const sortedUsers = [...response.data].sort((a, b) => a.id.localeCompare(b.id));
    setOutput(sortedUsers);
    console.log(response.data);
    
  } catch (error) {
    setErrorMsg(error.response.data.message);
       const timer = setTimeout(() => {
      navigate("/homepage");
    }, 1800);
    return () => clearTimeout(timer);
 
  }
};

const deactivatePut = async (id) => {
    try {
    const response = await memberAPI.put(`/user/deactivate/${id}`);
    getUserList(localStorage.getItem("memberType"));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

 useEffect(() => {
      console.log("testing");
      getUserList(localStorage.getItem("memberType"));
    }, [])

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
               {errorMsg}
            </p>
            <div className="flex justify-center mt-10">
      <table className="table-auto border-collapse w-full max-w-4xl text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">User Type</th>
            <th className="border px-4 py-2">Active Status</th>
            <th className="border px-4 py-2">Active/Inactive</th>
          </tr>
        </thead>
        <tbody>
          {output &&
            output.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.userName}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.memberType}</td>
                <td className="border px-4 py-2">{item.activeStatus ? "Active" : "Inactive"}</td>
                <td className="border px-4 py-2">

       

                {localStorage.getItem("userId")==item.id ? (<></>) : (<button
                onClick={() => deactivatePut(item.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Action
              
              </button>)}
                     
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

          </div>

      
          
        </div>
      </div>
    </div>
  );
}

export default Userlist;