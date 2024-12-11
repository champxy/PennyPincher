import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Correct import for plugin
import {Numberformat} from '../../../utils/Numberformat';

// Register Chart.js components and the datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ChartSummary = ({ datauserpermonth }) => {
  const totalIncome = datauserpermonth.reduce((acc, item) => {
    if (item.type === 'income') {
      return acc + item.amount;
    }
    return acc;
  }, 0);
  const totalExpense = datauserpermonth.reduce((acc, item) => {
    if (item.type === 'expense') {
      return acc + item.amount;
    }
    return acc;
  }, 0);
  const total = totalIncome + totalExpense;

  // Check if there's data
  const hasData = totalIncome > 0 || totalExpense > 0;

  // Data for Doughnut chart
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: hasData ? [totalIncome, totalExpense] : [0.1], // Display only one segment if no data
        backgroundColor: hasData 
          ? ['#22c55e', '#ef4444'] // Green for Income, Red for Expense
          : ['#d1d5db'],
        hoverBackgroundColor: hasData 
          ? ['#2dbf87', '#ef4444'] 
          : ['#9ca3af'], // Gray hover color
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          if (!hasData) return ''; // Hide data labels if there's no data
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'normal', // Lighter weight for subtlety
          size: 12,         // Smaller size for a better fit
        },
        // Positioning the label at the center of each segment
        align: 'center',
        anchor: 'center',
      },
    },
    cutout: hasData ? '65%' : 0, 
  };

  return (
    <div className="relative w-56 h-56 mr-4 mb-16">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-normal text-gray-500">
            {hasData ? Numberformat(total) : 'เราเป็นกำลังใจให้นะ'} {/* Message when there's no data */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartSummary;
