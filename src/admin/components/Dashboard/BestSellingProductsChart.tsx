import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ProductData {
  name: string;
  totalQuantity: number;
}

interface BestSellingProductsChartProps {
  productData: ProductData[]; // Nhận dữ liệu sản phẩm từ props
}

const BestSellingProductsChart: React.FC<BestSellingProductsChartProps> = ({ productData }) => {
  const chartData = {
    labels: productData.map(product => product.name),
    datasets: [
      {
        label: 'Số lượng sản phẩm',
        data: productData.map(product => product.totalQuantity),
        backgroundColor: '#42A5F5',
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const, // Chuyển đổi trục để hiển thị biểu đồ ngang
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng sản phẩm',
        },
      },
      y: {
        ticks: {
          callback: function (value: string | number, index: number, values: any) {
            return productData[index]?.name || value; // Hiển thị nhãn sản phẩm đầy đủ
          },
          font: {
            size: 12, // Tùy chỉnh kích thước font
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
    <div style={{ width: '100%', height: '500px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BestSellingProductsChart;
