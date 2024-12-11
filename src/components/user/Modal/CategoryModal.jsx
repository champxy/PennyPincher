import { getUserCategories, addUserCategory, deleteUserCategory } from "../../../api/userCategory";
import usePennyPincherStore from "../../../store/PennyPincher";
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import { showCustomToast } from "../../../utils/showCustomToast";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CategoryModal = ({ isOpen, onClose, value, onChange, placeholder, setIsCategoryUserChange }) => {
    const token = usePennyPincherStore(state => state.token);
    const [dataCategories, setDataCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const categoryuse = usePennyPincherStore(state => state.categoryuse);
    const actionCheckUseCategory = usePennyPincherStore(state => state.actionCheckUseCategory);

    const fetchData = async () => {
        if (!isOpen) return;
        try {
            const res = await getUserCategories(token);
            // console.log(res.data);
            setDataCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        console.log('Saved value:', value);
        if (!value) {
            showCustomToast('กรุณากรอกชื่อประเภท', 'wrong');
        }
        // check category name is already exist
        if (dataCategories.find((category) => category.name === value)) {
            showCustomToast('ประเภทนี้มีอยู่แล้ว', 'wrong');
            return;
        }


        console.log('Add new category:', value);

        // add new category
        await addUserCategory(token, { name: value }).then((res) => {
            if (res.status === 201) {
                showCustomToast('เพิ่มประเภทใหม่สำเร็จ', 'success');
                fetchData();
                onChange({ target: { value: '' } });
                setIsCategoryUserChange(true);
            } else {
                showCustomToast('เกิดข้อผิดพลาดในการเพิ่มประเภทใหม่', 'error');
            }
        }).catch((error) => {
            console.error('Error adding category:', error);
            showCustomToast('เกิดข้อผิดพลาดในการเพิ่มประเภทใหม่', 'error');
        });

    };

    const handleDelete = async (id) => {
        console.log('Deleted category with id:', id);
        console.log('Category use:', categoryuse);
        // return
        //check use category
        if (categoryuse.id === id) {
            showCustomToast('ประเภทนี้กำลังใช้งานอยู่', 'wrong');
            return;
        }
        
        // delete category
        await deleteUserCategory(token, id).then((res) => {
            if (res.status === 200) {
                // console.log('Deleted category:', res.data);
                showCustomToast('ลบประเภทสำเร็จ', 'success');
                fetchData();
                setIsCategoryUserChange(true);
                actionCheckUseCategory('', null);
            } else {
                showCustomToast('เกิดข้อผิดพลาดในการลบประเภท', 'error');
            }
        }).catch((error) => {
            console.error('Error deleting category:', error);
            showCustomToast('เกิดข้อผิดพลาดในการลบประเภท', 'error');
        });

    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md relative">
                {/* Close button */}
                <button
                    className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 inline-flex items-center justify-center p-0 m-0 h-auto"
                    onClick={onClose}
                >
                    <span className="text-4xl text-red-500 hover:text-red-600">
                        &times;
                    </span>
                </button>



                <div className="flex justify-center">
                    <h3 className="text-xl font-normal text-gray-500 mb-4">จัดการประเภท</h3>
                </div>

                {/* Input field to add new category */}
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="bg-gray-100 rounded-lg p-2 pl-4 pr-10 w-full mb-1 focus:outline-none focus:ring focus:border-blue-700"
                        placeholder={placeholder}
                    />
                    <button
                        className="absolute right-2 top-2 text-green-500 w-6 h-6 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        <CheckCircleIcon />
                    </button>
                </div>
                <div className="mb-4 text-sm text-gray-400">
                    *ไม่สามารถเพิ่มซ้ำหรือลบประเภททีกำลังใช้งานอยู่ได้*
                </div>

                {/* List of categories */}

                <ul className="space-y-4 mb-4 p-4 max-h-80 overflow-y-auto">
                    {dataCategories.map((category) => (
                        <li key={category.id} className="flex items-center justify-between">
                            <span className="text-gray-500 text-base font-light">{category.name}</span>
                            <img src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/no-entry.png" alt="Delete" className="w-5 h-5 cursor-pointer" onClick={() => handleDelete(category.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryModal;
