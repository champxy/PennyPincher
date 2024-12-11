import React, { useState } from 'react';

import L_MainSide from './card/L_MainSide';
import R_MainSide from './card/R_MainSide';
import F_MainSide from './card/F_MainSide';
import M_MainSide from './card/M_MainSide';
import SettingUserCard from './card/SettingUserCard';

const C_Main = () => {
  //reloadData ใช้ในการเรียกข้อมูลใหม่เมื่่อเพิ่มข้อมูล entry แล้วส่งไปให้ component อื่นๆ เรียกข้อมูลใหม่
  const [reloadData, setReloadData] = useState(false);
  const [isCategoryUserChange, setIsCategoryUserChange] = useState(false);
  
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-gray-100 p-6">
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        
        {/* Left Column - Form */}
        <div className="md:row-span-2">
          <L_MainSide 
            reloadData={reloadData} 
            setReloadData={setReloadData}  
            isCategoryUserChange={isCategoryUserChange} 
            setIsCategoryUserChange={setIsCategoryUserChange} 
          />
        </div>
        
        {/* Right Column - Summary */}
        <div className="md:col-span-1">
          <R_MainSide 
            reloadData={reloadData} 
            setReloadData={setReloadData} 
          />
        </div>

        {/* F_MainSide - Normal on Larger Screens */}
        <div className="md:col-span-1 md:col-start-2 hidden md:block bg-white shadow-md rounded-2xl border p-6">
          <F_MainSide />
        </div>

        {/* Full-width Card below both columns */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white shadow-md rounded-2xl border p-2">
            <M_MainSide 
              reloadData={reloadData} 
              setReloadData={setReloadData}
            />
          </div>
        </div>
      </div>
      
      {/* Right Side - Settings User Card */}
      <div className="w-full lg:w-80 lg:ml-10 mt-6 lg:mt-36">
        <SettingUserCard setIsCategoryUserChange={setIsCategoryUserChange} />
      </div>
      {/* Right Side - Settings User Card */}
    
      
      {/* F_MainSide - Fixed on Small Screens (with Space Between Buttons) */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <div className="w-20 h-20 flex items-center justify-center">
          <F_MainSide />
        </div>    
      </div>
    </div>
  );
};

export default C_Main;
