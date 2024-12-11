import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface CategoryData {
  categoryName: string;
  quantitySold: number;
}

interface CategoryReportChartProps {
  categoryData: CategoryData[]; // Dữ liệu thể loại được truyền vào từ props
}

const CategoryReportChart: React.FC<CategoryReportChartProps> = ({ categoryData }) => {
  const chartData = {
    labels: categoryData.map(category => category.categoryName),
    datasets: [
      {
        label: 'Số lượng sản phẩm đã bán',
        data: categoryData.map(category => category.quantitySold),
        backgroundColor: '#42A5F5',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // Đặt trục y là trục danh mục để hiển thị dạng cột ngang
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return Number(tickValue).toLocaleString(); // Định dạng số có dấu phẩy
          },
        },
      },
      y: {
        ticks: {
          autoSkip: false,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CategoryReportChart;
