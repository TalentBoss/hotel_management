import ReactApexChart from 'react-apexcharts'
const TripleChart = ({ props }) => {

  let series = [];
  let chartData = []

  for (let i = 0; i < props[0].length; i++) {
    series.push({
      name: `Room ${i+1}`,
      data: []
    })
    chartData = [];
    for (let j = 0; j < props.length; j++) {
      chartData.push(props[j][i])
    }
    series[i].data = chartData
  }


  const state = {
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nob', 'Dec'],
      },
      yaxis: {
        title: {
          text: `price ( EUR )`
        }
      },
      fill: {
        opacity: 0.9
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " EUR"
          }
        }
      }
    }
  };

  return (
      <div id="triple-chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
  )
}

export default TripleChart;
