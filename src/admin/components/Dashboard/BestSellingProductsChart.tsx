import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ProductData {
  productName: string;
  quantitySold: number;
}

const BestSellingProductsChart: React.FC = () => {
  // Dữ liệu mẫu cho biểu đồ
  const productData: ProductData[] = [
    { productName: 'Iphone15-xanh-64GB', quantitySold: 6 },
    { productName: 'SamSung Galaxy S24 FE-Vàng-128GB', quantitySold: 5 },
    { productName: 'Redmi Note 12T Pro-Vàng-128GB', quantitySold: 3 },
    { productName: 'Sony Xperia Z5', quantitySold: 2 },
    { productName: 'OnePlus Nord 2T', quantitySold: 2 },
    { productName: 'Pixel 7 Pro', quantitySold: 2 },
    { productName: 'Nokia G50', quantitySold: 1 },
    { productName: 'Motorola Edge 20', quantitySold: 1 },
    { productName: 'Asus ROG Phone 6', quantitySold: 1 },
  ];

  const chartData = {
    labels: productData.map(product => product.productName),
    datasets: [
      {
        label: 'Số lượng sản phẩm',
        data: productData.map(product => product.quantitySold),
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
            return productData[index]?.productName || value; // Hiển thị nhãn sản phẩm đầy đủ
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
