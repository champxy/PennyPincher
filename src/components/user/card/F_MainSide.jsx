import React from 'react';
// ใช้ Heroicons สำหรับไอคอนกล้องและสแกน
import { Camera,ScanQrCode  } from 'lucide-react';


const F_MainSide = () => {
  return (
    <div className="flex space-x-4">
      {/* ปุ่มกล้อง */}
      {/* <button className="flex items-center space-x-2 bg-white  border shadow-md text-white px-3 py-3 rounded-lg hover:bg-gray-100 focus:outline-none">
        <Camera className="w-8 h-6 text-gray-400" />
      </button> */}

      {/* ปุ่มสแกน */}
        <button className="flex items-center space-x-2 bg-white   border shadow-md text-white px-3 py-3 rounded-lg hover:bg-gray-100 focus:outline-none">
            <ScanQrCode className="w-8 h-6 text-gray-400" />
        </button>
    </div>
  );
};

export default F_MainSide;
