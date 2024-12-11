import React from 'react';
import {Numberformat} from '../../../utils/Numberformat';

const getMonthNameTH = (month) => {
    const monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return monthNames[month - 1];
};
const SummalyCard = ( {datauserpermonth, ChangeCurrenmonth} ) => {

    const totalIncome = datauserpermonth.reduce((acc, item) => {
        if (item.type === "income") {
            return acc + item.amount;
        }
        return acc;
    }, 0);

    const totalExpense = datauserpermonth.reduce((acc, item) => {
        if (item.type === "expense") {
            return acc + item.amount;
        }
        return acc;
    }, 0);

    const total = totalIncome - totalExpense;

    const totalIncomeCount = datauserpermonth.filter((item) => item.type === "income").length;
    const totalExpenseCount = datauserpermonth.filter((item) => item.type === "expense").length;
    const totalCount = totalIncomeCount + totalExpenseCount;
    return (
        <div>
            <div className="flex flex-col items-start ml-10 mb-16">
                <h2 className="text-xl font-normal  text-gray-700">สรุปของเดือน <span className='text-gray-400 font-normal'>{getMonthNameTH(ChangeCurrenmonth)}</span></h2>
                <p className="text-lg text-gray-600 mt-1">{totalCount} รายการ <span className={total >= 0 ? 'text-green-500' : 'text-red-500'}>{total >= 0 ? '+' : ''}
                    
                    {Numberformat(total)} <span className='text-gray-600'>บาท</span></span></p>
                <div className="flex flex-col my-2">
                    <div className="flex items-center">
                        <span className="text-lg text-green-500 mr-2">รายรับ : {Numberformat(totalIncome)}</span>
                    </div>
                    <div className="flex items-center">
                        {/* จุดเขียว */}
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1"></span>
                        <span className="text-sm text-gray-500">{totalIncomeCount} รายการ</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-lg text-red-500 mr-2">รายจ่าย : {Numberformat(totalExpense)}</span>
                </div>
                <div className="flex items-center">
                    {/* จุดแดง */}
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1"></span>
                    <span className="text-sm text-gray-500">{totalExpenseCount} รายการ</span>
                </div>
                <button className="mt-5 p-0.5 font-normal text-base w-full bg-white border shadow-md rounded-lg hover:bg-gray-200 text-black">รายละเอียดเพิ่มเติม</button>
            </div>
        </div>
    );
}

export default SummalyCard;
