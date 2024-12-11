import React, { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// ฟังก์ชันที่ใช้ในการหาจำนวนวันในเดือน
const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

// ฟังก์ชันที่ใช้ในการหาวันที่ 1 ของเดือนนั้น
const getStartDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
};

const getMonthName = (month) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month - 1];
};

const VacationCalendar = ({ setChangeCurrenmonth , setChangeCurrenyear }) => {
    const generateVacationData = (month, year) => {
        const weekends = [];
        const vacationDays = [];

        for (let i = 1; i <= getDaysInMonth(month, year); i++) {
            const date = new Date(year, month - 1, i);
            if (date.getDay() === 0 || date.getDay() === 6) {
                weekends.push(i); // วันเสาร์และอาทิตย์
            }
            if (i === 5 || i === 10 || i === 15 || i === 18 || i === 20) {
                vacationDays.push(i); // ตัวอย่างวันหยุด
            }
        }

        return { weekends, vacationDays };
    };

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // เดือนปัจจุบัน
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // ปีปัจจุบัน
    const { weekends, vacationDays } = generateVacationData(currentMonth, currentYear);
    const startDayOfMonth = getStartDayOfMonth(currentMonth, currentYear);

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
            setChangeCurrenmonth(12); // Set ChangeCurrenmonth to 12 when rolling back to December
            setChangeCurrenyear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
            setChangeCurrenmonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
            setChangeCurrenmonth(1); // Set ChangeCurrenmonth to 1 when rolling over to January
            setChangeCurrenyear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
            setChangeCurrenmonth(currentMonth + 1);
        }
    };


    const currentDate = new Date();

    return (
        <div className="relative flex flex-grow flex-col p-6 bg-white overflow-hidden">
            {/* ปุ่ม Previous และ Next */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex flex-col justify-center items-center">
                <button onClick={handlePrevMonth}>
                    <PlayArrowIcon sx={{ fontSize: 40 }} className="transform rotate-180 text-gray-300 hover:text-blue-500" />
                </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col justify-center items-center">
                <button onClick={handleNextMonth}>
                    <PlayArrowIcon sx={{ fontSize: 40 }} className="text-gray-300 hover:text-blue-500" />
                </button>
            </div>

            <div className="flex px-2 py-2">
                {/* ปฏิทิน */}
                <div className="w-80 mx-3 my-3 border-gray-200 rounded border shadow-sm">
                    <div className="bg-white px-1 py-3 border-gray-200 border-b text-center text-sm text-gray-500">
                        {`${getMonthName(currentMonth)} ${currentYear}`}
                    </div>
                    <div>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-3">S</th>
                                    <th className="py-3 px-3">M</th>
                                    <th className="py-3 px-3">T</th>
                                    <th className="py-3 px-3">W</th>
                                    <th className="py-3 px-3">T</th>
                                    <th className="py-3 px-3">F</th>
                                    <th className="py-3 px-3">S</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 6 }).map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Array.from({ length: 7 }).map((_, colIndex) => {
                                            const day = rowIndex * 7 + colIndex - startDayOfMonth + 1;
                                            if (day <= 0 || day > getDaysInMonth(currentMonth, currentYear)) return <td key={colIndex}></td>;

                                            const isWeekend = weekends.includes(day);
                                            const isVacation = vacationDays.includes(day);

                                            // ไฮไลต์วันปัจจุบัน
                                            const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear();

                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`py-4 px-4 text-center cursor-pointer ${isWeekend ? 'text-gray-800' : 'text-gray-800'} 
                                                            ${isToday ? 'bg-yellow-300 text-black font-bold rounded-full w-7 h-7 flex items-center justify-center mx-auto' : ''} 
                                                            hover:bg-blue-500 hover:text-white rounded-lg transition duration-200 ease-in-out transform hover:scale-90`}
                                                >
                                                    {day}
                                                </td>



                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VacationCalendar;
