import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { HOTELS_LIST } from "../../utils";

/*const preVsThisWeekPercentage = (this_week_data, pre_week_data) => {
  const percentages = [];
  for(let i=0; i<pre_week_data.length; i++) {
    const item = Math.floor((this_week_data[i] - pre_week_data[i]) * 100 / pre_week_data[i])
  }

  return percentages;
}*/

const roundToDecimalPlaces = (preNumber, thisNumber, decimalPlaces) => {
  const number = (thisNumber - preNumber) * 100 / preNumber;
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

const WidgetsDropdown = ({this_week_prices, pre_week_prices}) => {
  const colors_list = ['info', 'success', 'danger', 'warning'];
  this_week_prices = [
     368.00,
     210.00,
     517.00,
     486.00,
     364.00,
     225.00,
     138.00,
     204.00,
     175.00,
     195.00,
     300.00,
     748.00,
     451.00,
     253.00,
     240.00,
     336.85
  ];

  pre_week_prices = [
     345.00,
     193.00,
     431.00,
     435.00,
     248.00,
     195.00,
     137.00,
     203.00,
     175.00,
     195.00,
     216.00,
     270.00,
     341.00,
     202.00,
     220.00,
     260.31
  ]

  return (
    <CRow>
      {
        HOTELS_LIST.map((hotel, index) => (
          <CCol sm={6} lg={3} key={index}>
        <CWidgetStatsA
          className="mb-4"
          color={colors_list[index%4]}
          value={
            <>
              &#8364;{this_week_prices[index]}{' '}
              <span className="fs-6 fw-normal">
                ({ roundToDecimalPlaces(pre_week_prices[index], this_week_prices[index], 2) } % <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title={hotel}
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                  {
                    label: 'Recently price',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle(`--cui-${colors_list[index%4]}`),
                    data: [272, 333, 345, 368, 354, 324, 366, 245, 220, 321, 263, 254],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 200,
                    max: 400,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
        ))}

    </CRow>
  )
}

export default WidgetsDropdown
