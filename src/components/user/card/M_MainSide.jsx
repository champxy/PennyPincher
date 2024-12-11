import React, { useState, useEffect } from 'react';
import VacationCalendar from './VacationCalendar';
import SummalyCard from './SummalyCard';
import ChartSummary from './ChartSummary';
import usePennyPincherStore from '../../../store/PennyPincher';
import { getUserEntriespermonth } from '../../../api/userEntry';
import { Loader2 } from 'lucide-react'; // Assuming this is the right import for the loader icon

const M_MainSide = ({ reloadData, setReloadData }) => {
  const token = usePennyPincherStore((state) => state.token);
  
  const [ChangeCurrenmonth, setChangeCurrenmonth] = useState(new Date().getMonth() + 1);
  const [ChangeCurrenyear, setChangeCurrenyear] = useState(new Date().getFullYear());
  const [datauserpermonth, setdatauserpermonth] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  const fetchdatauserpermonth = async (token) => {
    setLoading(true); // Start loading
    try {
      const res = await getUserEntriespermonth(token, ChangeCurrenmonth, ChangeCurrenyear);
      setdatauserpermonth(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    fetchdatauserpermonth(token);
    if (!reloadData) {
      setReloadData(true);
      fetchdatauserpermonth(token);
    }
  }, [ChangeCurrenmonth, ChangeCurrenyear, reloadData]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-1 bg-white space-y-4 md:space-y-0 md:space-x-4 relative">
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute flex justify-center items-center w-full h-full bg-opacity-50 z-10">
          <Loader2 className="animate-spin text-gray-500" size={30} />
        </div>
      )}

      {/* Content: Calendar, Summary, and Chart */}
      <div className="flex flex-col md:flex-row justify-center items-center w-full">
        {/* ส่วนที่ 1: ปฏิทิน */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <VacationCalendar setChangeCurrenmonth={setChangeCurrenmonth} setChangeCurrenyear={setChangeCurrenyear} />
        </div>

        {/* ส่วนที่ 2: ข้อมูลสรุปรายการ */}
        <div className="w-full md:w-auto flex justify-center">
          {!loading && <SummalyCard datauserpermonth={datauserpermonth} ChangeCurrenmonth={ChangeCurrenmonth} />}
        </div>

        {/* ส่วนที่ 3: กราฟวงกลม */}
        <div className="w-full md:w-auto flex justify-center">
          {!loading && <ChartSummary datauserpermonth={datauserpermonth} />}
        </div>
      </div>
    </div>
  );
};

export default M_MainSide;
