import React, { useState } from 'react';
import CategoryModal from '../Modal/CategoryModal';
import usePennyPincherStore from '../../../store/PennyPincher';

const CategoryUserSetting = ({  setIsCategoryUserChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const user = usePennyPincherStore(state => state.user);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  return (
    <div className="bg-white shadow-md rounded-2xl border p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img src="https://em-content.zobj.net/source/apple/279/person_1f9d1.png" alt="User" className="w-12 h-12" />
        <div>
          <h2 className="font-semibold text-lg">Steve Lacy</h2>
          <p className="text-sm text-gray-500">Silver Package</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-700 mb-4">
        <p >Username: <span className='text-blue-500'> {user.username}</span></p>
        <p>Email: <span className='text-blue-500'>{user.email}</span></p>
      </div>
      
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className='flex '>
          <img src="https://em-content.zobj.net/source/apple/279/gear_2699-fe0f.png" alt="Settings" className="w-5 h-5 mr-2" />
          <h3 className="font-normal mb-2">Settings (การตั้งค่า)</h3>
        </div>
        <ul className="space-y-2">
          <li 
            className='cursor-pointer text-blue-500 hover:underline hover:text-blue-700 inline-block'
            onClick={openModal}
          >
            ประเภท
          </li>
          <li>เงินเดือน</li>
          <li>ลาซูมิ</li>
        </ul>
      </div>
      
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className='flex '>
          <img src="https://em-content.zobj.net/source/apple/129/globe-with-meridians_1f310.png" alt="Globe" className="w-5 h-5 mr-2" />
          <h3 className="font-normal mb-2">Functions (ฟังก์ชันเสริม)</h3>
        </div>
        <ul className="space-y-2">
          <li>วางแผนการเงิน</li>
          <li>รายงานสรุปผล</li>
          <li>นักกฎหมาย</li>
        </ul>
      </div>

      {/* CategoryModal Component */}
      <CategoryModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="กรอกชื่อประเภท"      
        setIsCategoryUserChange={setIsCategoryUserChange}    
      />
    </div>
  );
};

export default CategoryUserSetting;
