import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentMethodChartProps {
  totalRevenue: number;
  cashRevenue: number;
  transferRevenue: number;
}

const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({
  totalRevenue,
  cashRevenue,
  transferRevenue,
}) => {
  const data = {
    labels: ['Tiền mặt', 'Chuyển khoản'],
    datasets: [
      {
        data: [cashRevenue, transferRevenue],
        backgroundColor: ['#4CAF50', '#2196F3'],
        hoverBackgroundColor: ['#45a049', '#1e88e5'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const value = context.raw as number;
            const percentage = ((value / totalRevenue) * 100).toFixed(1);
            return `${context.label}: ${value} triệu (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ margin: '0 auto', height: '350px', width: '350px' }}>
        <Pie data={data} options={options} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {data.labels.map((label, index) => {
          const value = data.datasets[0].data[index] as number;
          const percentage = ((value / totalRevenue) * 100).toFixed(1);
          return (
            <div key={index} style={{ margin: '0 20px', textAlign: 'center' }}>
              <div style={{ marginTop: '5px' }}>{value} triệu ({percentage}%)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodChart;
