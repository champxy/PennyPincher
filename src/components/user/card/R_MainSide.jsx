import React, { useState, useEffect, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import usePennyPincherStore from '../../../store/PennyPincher';
import { getUserEntriesperday } from '../../../api/userEntry';
import { Loader2 } from 'lucide-react'; // Import Loader2 component
import {Numberformat} from '../../../utils/Numberformat';

const R_MainSide = ({ reloadData, setReloadData }) => {
  const token = usePennyPincherStore((state) => state.token);
  const [startDate, setStartDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [position, setPosition] = useState({ top: '30%', left: '65%' });
  const datePickerRef = useRef(null);
  const [dataPerDay, setDataPerDay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // New state for loading

  const handleClickDateperday = (date) => {
    const thisdateChoese = date.toLocaleDateString('sv-SE');
    console.log(thisdateChoese);
    fetchPerDay(token, thisdateChoese);
  }

  const fetchPerDay = async (token, thisdateChoese) => {
    const thisdate = new Date().toLocaleDateString('sv-SE');
    const dateToUse = thisdateChoese || thisdate;
    setIsLoading(true); // Start loading when fetching begins
    try {
      const response = await getUserEntriesperday(token, dateToUse);
      if (response.status === 200) {
        const data = response.data;
        setDataPerDay(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // Stop loading once the data is fetched
    }
  };

  useEffect(() => {
    fetchPerDay(token);
    if (!reloadData) {
      setReloadData(false);
      fetchPerDay(token);
    }
  }, [reloadData]);

  const handleDateClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };

    const calculatePosition = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 576) {
        setPosition({ top: '50%', left: '50%' });
      } else if (windowWidth >= 576 && windowWidth < 768) {
        setPosition({ top: '77%', left: '66%' });
      } else if (windowWidth >= 768 && windowWidth < 992) {
        setPosition({ top: '70%', left: '80%' });
      } else if (windowWidth >= 992 && windowWidth < 1200) {
        setPosition({ top: '16%', left: '60%' });
      } else {
        setPosition({ top: '13%', left: '55%' });
      }
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calculatePercentageChange = (income, expense) => {
    if (income === 0 && expense === 0) {
      return 0;
    } else if (income === 0) {
      return -100;
    } else if (expense === 0) {
      return 100;
    } else {
      return (((income - expense) / income) * 100).toFixed(2);
    }
  };

  const incomeTotal = dataPerDay
    .filter((entry) => entry.type === "income")
    .reduce((acc, entry) => acc + (Number(entry.amount) || 0), 0);

  const expenseTotal = dataPerDay
    .filter((entry) => entry.type === "expense")
    .reduce((acc, entry) => acc + (Number(entry.amount) || 0), 0);

  const total = incomeTotal - expenseTotal;

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 self-start">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">สรุปวันนี้</h3>
        <div className="flex items-start relative group cursor-pointer" onClick={handleDateClick}>
          <p className="text-gray-500 mr-5 group-hover:text-blue-500">
            {startDate
              ? `${startDate.toLocaleDateString('en-GB', { day: '2-digit' })}/${startDate.toLocaleDateString('en-GB', { month: '2-digit' })}/${startDate.toLocaleDateString('en-GB', { year: '2-digit' })}`
              : `${new Date().toLocaleDateString('en-GB', { day: '2-digit' })}/${new Date().toLocaleDateString('en-GB', { month: '2-digit' })}/${new Date().toLocaleDateString('en-GB', { year: '2-digit' })}`
            }
          </p>
          <div className="flex items-start absolute -top-0.5 left-16">
            <PlayArrowIcon
              fontSize="medium"
              className="text-gray-500 rotate-90 group-hover:text-blue-500"
            />
          </div>
        </div>

        {isDatePickerOpen && (
          <div
            className="absolute z-20"
            style={{
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -0%)'
            }}
            ref={datePickerRef}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setIsDatePickerOpen(false);
                handleClickDateperday(date);
              }}
              inline
              className="shadow-lg border border-gray-300 rounded-lg bg-white"
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  boundariesElement: 'viewport',
                },
              }}
            />
          </div>
        )}
      </div>

      <hr className="mt-2" />

      {/* Display the loading spinner if data is being fetched */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      ) : (
        <>
          <div className="flex justify-between mt-4 w-full">
            {/* Left Section */}
            <div className="flex flex-col justify-start mr-2">
              <p className="text-lg font-normal whitespace-nowrap text-gray-400">รายรับ :</p>
              <p className="whitespace-nowrap text-xs text-gray-400">{dataPerDay.filter((entry) => entry.type === "income").length} รายการ</p>
            </div>

            {/* Right Section */}
            <div className='border border-gray-300 rounded-lg h-24 w-full ml-3'>
              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-20 p-2 box-border">
                {dataPerDay.filter((entry) => entry.type === "income").length === 0 && dataPerDay.filter((entry) => entry.type === "expense").length === 0 ? (
                  <span className="w-full text-center text-gray-200">ไม่มีรายรับ</span>
                ) : (
                  dataPerDay
                    .filter((entry) => entry.type === "income")
                    .map((entry) => (
                      <span key={entry.id} className="w-full sm:w-1/2 md:w-1/4 px-2 py-1 bg-green-500 text-white rounded-xl text-center">
                        {Numberformat(entry.amount)}
                      </span>
                    ))
                )}
              </div>
            </div>
          </div>


          <div className="flex justify-between mt-4 w-full">
            {/* Left Section */}
            <div className="flex flex-col justify-start">
              <p className="text-lg font-normal whitespace-nowrap text-gray-400">รายจ่าย :</p>
              <p className="whitespace-nowrap text-xs text-gray-400">{dataPerDay.filter((entry) => entry.type === "expense").length} รายการ</p>
            </div>

            {/* Right Section */}
            <div className='border border-gray-300 rounded-lg h-24 w-full ml-3'>
              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-20 p-2 box-border">
                {/* Adjust widths for responsive behavior */}
                {/* <span className="w-full sm:w-1/2 md:w-1/4 px-2 py-1 bg-red-500 text-white rounded-xl text-center">100,000</span> */}
                {
                  dataPerDay.filter((entry) => entry.type === "income").length === 0 &&
                    dataPerDay.filter((entry) => entry.type === "expense").length === 0 ? (
                    <span className="w-full text-center text-gray-200">ไม่มีรายจ่าย</span>
                  ) : (
                    dataPerDay
                      .filter((entry) => entry.type === "expense")
                      .map((entry) => (
                        <span key={entry.id} className="w-full sm:w-1/2 md:w-1/4 px-2 py-1 bg-red-500 text-white rounded-xl text-center">
                          {Numberformat(entry.amount)}
                        </span>
                      ))
                  )
                }


              </div>
            </div>
          </div>
          <div className="mt-4 flex">
            <div>
              <p className="text-xl font-normal whitespace-nowrap text-gray-400">รวมทั้งสิ้น :</p>
              <p className="whitespace-nowrap text-xs text-gray-400">{dataPerDay.length} รายการ</p>
            </div>
            <div className='ml-2'>
              <p className="text-xl font-normal whitespace-nowrap text-gray-400">
                {
                  total < 0 ? (
                    <span> {Numberformat(incomeTotal)} - {Numberformat(expenseTotal)}</span>
                  ) : (
                    <span></span>
                  )
                }
              </p>
              <p className="whitespace-nowrap text-xl text-gray-400">
                {
                  total < 0 ? (
                    <span>= {Numberformat(total)}</span>
                  ) : (
                    <span></span>
                  )
                }
              </p>
            </div>


          </div>

          <div className="flex mt-4">
            {dataPerDay.length > 0 ? (
              <span
                className={`px-4 py-2 rounded-md ${calculatePercentageChange(
                  incomeTotal,
                  expenseTotal
                ) < 0 ? 'bg-red-500' : 'bg-green-500'
                  } text-white`}
              >
                {calculatePercentageChange(incomeTotal, expenseTotal)}%
              </span>
            ) : (
              <span className="px-4 py-2 rounded-md bg-gray-200 text-gray-400">0%</span>
            )}
          </div>




        </>
      )}
    </div>
  );
};

export default R_MainSide;
