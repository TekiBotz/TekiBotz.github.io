// src/uiComponents/BreedChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BreedChart = () => {
  const breedData = {
    'Domestic Shorthair Mix': 3009,
    'Pit Bull Mix': 801,
    'Labrador Retriever Mix': 608,
    'Chihuahua Shorthair Mix': 588,
    'Domestic Medium Hair Mix': 324,
    'German Shepherd Mix': 241,
    'Bat Mix': 186,
    'Domestic Longhair Mix': 152,
    'Australian Cattle Dog Mix': 123,
    'Bat': 108,
  };

  const data = {
    labels: Object.keys(breedData),
    datasets: [
      {
        label: 'Top 10 Most Popular Breeds',
        data: Object.values(breedData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BreedChart;