import ReactApexChart from 'react-apexcharts'
const AChart = () => {
  const state = {
    series: [
      {
        name: "SON BARBASSA",
        data: [272, 329, 333, 298, 354, 384, 323, 314, 291, 262, 226, 253]
      },
      {
        name: "SES ROTGES",
        data: [312, 211, 314, 338, 267, 283, 263, 312, 332, 245, 342, 298]
      },
      {
        name: "SON JAUMELL",
        data: [283, 251, 314, 278, 267, 231, 323, 333, 312, 262, 321, 291]
      },
      {
        name: "CREU DE TAU",
        data: [329, 231, 254, 318, 317, 243, 317, 261, 249, 284, 329, 332]
      }

    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#1E90FF', '#FFA500', '#4caf50','#FF4500'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Total Hotel Prices',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 200,
        max: 400
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },

  };

  return (
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </div>
  )
}

export default AChart;
