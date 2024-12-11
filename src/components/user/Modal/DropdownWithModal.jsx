import React, { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Modal from './Modal'; // A custom Modal component to be created
import { addUserCategory } from '../../../api/userCategory';
import usePennyPincherStore from '../../../store/PennyPincher';
import {showCustomToast} from '../../../utils/showCustomToast';

const DropdownWithModal = ({ categories, selectedOption, onSelectOption }) => {
    const token = usePennyPincherStore(state => state.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttomISFocus, setButtomISFocus] = useState(false);
    const [NewCategory, setNewCategory] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === 'add-new') {
            setIsModalOpen(true); // Open modal for new category
        } else {
            const selectedCategory = categories.find(category => category.name === value);
            onSelectOption(value, selectedCategory?.id); // ส่งทั้ง name และ id กลับไป
        }
    };

    const handleButtomAddNew = async (event) => {
        event.preventDefault();
        console.log(NewCategory);
        
        if (!NewCategory) {
            showCustomToast('กรุณากรอกข้อมูล', 'wrong');
            return;
        }
        const form = {
            name: NewCategory
        };

        //check existing category
        if (categories.find((category) => category.name === NewCategory)) {
            showCustomToast('ประเภทนี้มีอยู่แล้ว', 'error');
            return;
        }
    
        try {
            const response = await addUserCategory(token, form);
            // console.log(response);
            
            
            if (response && response.status === 201) {
                onSelectOption(NewCategory, response.data.id); // ส่งทั้ง name และ id กลับไป
                setIsModalOpen(false); 
                showCustomToast('เพิ่มประเภทใหม่สำเร็จ', 'success');
            } else {
                showCustomToast('เกิดข้อผิดพลาดในการเพิ่มประเภทใหม่');
            }
        } catch (error) {
            console.error("Error adding category:", error);
            alert('เกิดข้อผิดพลาดในการเพิ่มประเภทใหม่');
        }
    };
    

    return (
        <div className="relative group">
            <div className="w-full px-3 py-3 border rounded-2xl appearance-none shadow-md focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 text-black">
                <span className={selectedOption === '' ? 'text-gray-400' : 'text-black'}>
                    {selectedOption === '' ? 'เลือกประเภท' : selectedOption}
                </span>
            </div>
            <select
                onChange={handleChange}
                value={selectedOption}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
            >
                <option value="" disabled>
                    เลือกประเภท
                </option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                        {category.name}
                    </option>
                ))}
                {/* Option for adding new item */}
                <option className='text-blue-500' value="add-new">------------------------ เพิ่มใหม่ ------------------------ </option>
            </select>
            {/* Custom Arrow Icon with hover effect */}
            <PlayArrowIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-5 w-5 text-gray-400 group-hover:text-blue-500" />

            {/* Modal for adding new category */}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div>
                        <h2 className='text-xl text-gray-500 font-normal mb-3'>เพิ่มประเภทใหม่</h2>
                       <div className='flex items-center space-x-0'>
                       <input type="text" placeholder="กรอกข้อมูล..."
                       required
                        onChange={(e) => setNewCategory(e.target.value)}
                       onFocus={() => setButtomISFocus(true)}
                       onBlur={() => setButtomISFocus(false)}
                       className="w-full px-3 py-3 rounded-l-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200" />
                       <button 
                       onClick={handleButtomAddNew}
                       className={`w-[90px] px-4 ${buttomISFocus ? 'py-3.5' : 'py-3'} bg-blue-500 text-white rounded-r-2xl transition-all duration-200 whitespace-nowrap hover:bg-blue-600`}>ยืนยัน</button>
                       </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DropdownWithModal;
