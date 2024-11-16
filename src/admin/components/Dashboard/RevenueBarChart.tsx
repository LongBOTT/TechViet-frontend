import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.unregister(ChartDataLabels);

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface RevenueBarChartProps {
  data: Array<{
    date: string;
    cashRevenue: number;
    transferRevenue: number;
  }>;
}

const RevenueBarChart: React.FC<RevenueBarChartProps> = ({ data }) => {
  const labels = data.map(item => item.date);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tiền mặt',
        data: data.map(item => item.cashRevenue),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Chuyển khoản',
        data: data.map(item => item.transferRevenue),
        backgroundColor: '#2196F3',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return `${Number(tickValue).toLocaleString()} đ`;
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true, // Bật tooltip khi hover
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueBarChart;
