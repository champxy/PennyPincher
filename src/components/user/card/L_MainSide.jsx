import React, { useState, useEffect } from 'react';
import usePennyPincherStore from '../../../store/PennyPincher';
import { getUserCategories } from '../../../api/userCategory';
import DropdownWithModal from '../Modal/DropdownWithModal';
import { showCustomToast } from '../../../utils/showCustomToast';
import { getUserEntries, addUserEntry } from '../../../api/userEntry';
import { Numberformat } from '../../../utils/Numberformat';

const L_MainSide = ({ reloadData, setReloadData , isCategoryUserChange, setIsCategoryUserChange }) => {
    const token = usePennyPincherStore(state => state.token);
    const [buttomISFocus, setButtomISFocus] = useState(false);
    const [buttomTextIE, setButtomTextIE] = useState("income");
    const [selectedOption, setSelectedOption] = useState('');
    const [dataCategory, setDataCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [amount, setAmount] = useState(''); // เก็บค่า amount ที่กรอก

    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('th-TH', { day: 'numeric' });
    const month = currentDate.toLocaleDateString('th-TH', { month: 'long' });
    const year = currentDate.getFullYear() + 543; // Add 543 to convert to Buddhist calendar
    const datadatetoaddentry = currentDate.toLocaleDateString('sv-SE');
    const actionCheckUseCategory = usePennyPincherStore(state => state.actionCheckUseCategory);

    const [isLoading, setIsLoading] = useState(false);

    const addEntry = async (event) => {
        event.preventDefault();

        if (selectedOption === '') {
            showCustomToast('กรุณาเลือกประเภท', 'wrong');
            return;
        }

        if (amount === '' || amount === '0') {
            showCustomToast('กรุณากรอกจำนวนเงิน', 'wrong');
            return;
        }

        const form = {
            date: datadatetoaddentry,
            title: event.target.title.value,
            amount: amount, // ใช้ amount ที่เก็บไว้
            type: buttomTextIE,
            categoryName: selectedOption,
        };

        
        setIsLoading(true); // เริ่มโหลด

        try {
            const response = await addUserEntry(token, form);
            if (response.status === 201) {
                showCustomToast('บันทึกสำเร็จ', 'success');
                event.target.title.value = '';
                setAmount('');
                setSelectedOption('');
                setSelectedCategoryId(null);
                setReloadData(!reloadData);
                actionCheckUseCategory('', null);
            } else {
                showCustomToast('บันทึกไม่สำเร็จ', 'wrong');
            }
        } catch (err) {
            console.error(err.message);
            showCustomToast('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'wrong');
        } finally {
            setIsLoading(false); // หยุดโหลดหลังการส่งข้อมูลเสร็จ
        }
    };

    const fetchCategory = async (token) => {
        try {
            const response = await getUserCategories(token);
            setDataCategory(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChange = (value, id) => {
        setSelectedOption(value);
        setSelectedCategoryId(id);
        actionCheckUseCategory(value, id);
    };

    const handleButtomTextIE = (event) => {
        event.preventDefault();
        setButtomTextIE(prev => (prev === "income" ? "expense" : "income"));
    };

    const handleAmountChange = (e) => {
        // ลบเครื่องหมายคอมม่าและเก็บค่า
        const value = e.target.value.replace(/[^0-9]/g, '');
        setAmount(value);
    };

    const handleAmountBlur = () => {
        // เมื่อ blur ฟอร์แมตค่าสำหรับ amount
        setAmount(Numberformat(amount));
    };

    const handleAmountFocus = () => {
        // ลบคอมม่าก่อนกรอกข้อมูล
        setAmount(amount.replace(/,/g, ''));
    };

    useEffect(() => {
        fetchCategory(token);
        setIsCategoryUserChange(false);
    }, [token, selectedOption, isCategoryUserChange]);

    return (
        <div>
            <div className="bg-white shadow-md rounded-2xl border p-12 self-start">
                <h1 className="text-center text-blue-500 text-2xl mb-4 mt-16">
                    <span className='text-gray-400'>วันที่ </span><span>{day} </span><span className='text-gray-400'>เดือน</span> <span>{month}</span> <span>{year}</span>
                </h1>
                <form className="space-y-4" onSubmit={addEntry}>
                    <DropdownWithModal
                        categories={dataCategory}
                        selectedOption={selectedOption}
                        onSelectOption={handleChange}
                    />
                    <div>
                        <input
                            type="text"
                            className="w-full px-3 py-3 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
                            placeholder="รายการ"
                            required
                            id='title'
                        />
                    </div>
                    <div className="flex items-center space-x-0">
                        <input
                            type="text" // เปลี่ยนจาก number เป็น text เพื่อให้สามารถแสดงคอมม่าได้
                            className="w-full px-3 py-3 rounded-l-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                            placeholder="จำนวน"
                            required
                            id='amount' 
                            value={amount}
                            onFocus={handleAmountFocus}
                            onBlur={handleAmountBlur}
                            onChange={handleAmountChange}
                        />
                        <button
                            onClick={handleButtomTextIE}
                            className={`w-[105px] px-4 ${buttomISFocus ? 'py-3.5' : 'py-3'} ${buttomTextIE === "income" ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-r-2xl transition-all duration-200 whitespace-nowrap`}>
                            {buttomTextIE === "income" ? "รายรับ" : "รายจ่าย"}
                        </button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button 
                            className={`w-2/5 px-4 py-2.5 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-xl mt-28 transition-all duration-200`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default L_MainSide;
