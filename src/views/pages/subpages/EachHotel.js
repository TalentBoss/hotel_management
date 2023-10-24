import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import TripleChart from "../../charts/TripleChart";
import {ADD_NEW_PRICES, EDIT_EXISTING_PRICES} from "../../../utils";
import axios from "axios";

const EachHotel = () => {
  const [hotelPricesState, setHotelPricesState] = useState([
     [368.00,
     210.00,
     517.00,
     486.00],
     [364.00,
     225.00,
     138.00,
     204.00],
     [175.00,
     195.00,
     300.00,
     748.00],
     [451.00,
     253.00,
     240.00,
     336.85],
    [175.00,
     195.00,
     300.00,
     748.00],
    [364.00,
     225.00,
     138.00,
     204.00],
    [368.00,
     210.00,
     517.00,
     486.00],
  ]);

  const [visible, setVisible] = useState(false);
  const [totalState, setTotalState] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedId, setSelectedId] = useState(-1);
  let initialAddedState = [];
  for (let i = 0; i < selectedState.length; i++)
    initialAddedState.push(100);
  const [addedState, setAddedState] = useState(initialAddedState);
  const [operationState, setOperationState] = useState(ADD_NEW_PRICES);
  const [yearId, setYearId] = useState(0);



  useEffect(() => {
    const idPos = window.location.href.lastIndexOf('/') + 1;
    let id = window.location.href.substring(idPos);
    /*axios.get(`/api/hotel/hans/${id}`)
      .then((response) => {
        const gptResponse =response.data;
        console.log(gptResponse)

      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
        }
      });*/
    axios.post(`/api/hotel/view_each_hotel/${id}`)
      .then((response) => {
        const hotelData =response.data.data;
        if (hotelData.length > 0) {
          setTotalState(hotelData);
          setYearId(0);
          // setHotelPricesState(hotelData[yearId].prices_data);
          // console.log('$$$$  ', hotelPricesState, hotelData[yearId].prices_data);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
        }
      });
  }, [totalState]);



  const updateSelectedState = idx => e => {

    const indexOfSelectedState = totalState[yearId];
    console.log(selectedState, totalState[yearId]);
    console.log(totalState[yearId].prices_data.indexOf(selectedState))
    // const indexOfSelectedState = hotelPricesState && hotelPricesState.indexOf(selectedState);
    // let newState = [...selectedState];
    // newState[idx] = parseInt(e.target.value);
    // setSelectedState(newState);
    //
    // if (indexOfSelectedState > -1) {
    //   let newHotelPrices = [...hotelPricesState];
    //   newHotelPrices[indexOfSelectedState] = newState;
    //   setHotelPricesState(newHotelPrices);
    // }
  }

  const updateAddedState = idx => e => {
    let newState = [...addedState];
    newState[idx] = parseInt(e.target.value);
    setAddedState(newState);
  }

  const updateExistingData = () => {
    // console.log(selectedState)
    // console.log(hotelPricesState)
   // console.log(selectedId)
  }

  const setOperationStateAsAdd = () => {
    setOperationState(ADD_NEW_PRICES);
    setVisible(!visible);
  }

  const addNewData = () => {
   // console.log(addedState)
    let newState = hotelPricesState;
    newState.push(addedState);
    setHotelPricesState(newState);
   // console.log(hotelPricesState)
  }

  const VerticallyCentered = () => {
    return (
      <>
        <CModal alignment="center" visible={visible} onClose={() => {
          setVisible(false);
          setSelectedId(-1);
        }}>
          <CModalHeader>
            <CModalTitle>Edit Room Price</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className="mb-3" key={8888}>
              <CInputGroupText>Year </CInputGroupText>
              <CFormInput
                placeholder="price"
                aria-label="price"
                aria-describedby="basic-addon1"
                value={2023}
                type='number'
              />
            </CInputGroup>
            {
              (1===1) ? (
                <CInputGroup className="mb-3" key={9999}>
                  <CInputGroupText>Room Number </CInputGroupText>
                  <CFormInput
                    placeholder="room-number"
                    aria-label="room-number"
                    aria-describedby="basic-addon1"
                    defaultValue={4}
                    type='number'
                  />
                </CInputGroup>) : ''
            }
            {
              (operationState === EDIT_EXISTING_PRICES) ?
                selectedState.map((item, id) => (
                  <CInputGroup className="mb-3" key={id}>
                    <CInputGroupText>Room {id+1}</CInputGroupText>
                    <CFormInput
                      placeholder="price"
                      aria-label="price"
                      aria-describedby="basic-addon1"
                      onChange={updateSelectedState(id)}
                      value={item}
                      type='number'
                    />
                  </CInputGroup>
                )) :
                (addedState.map((item, id) => (
                  <CInputGroup className="mb-3" key={hotelPricesState.length+id}>
                    <CInputGroupText>Room {id+1}</CInputGroupText>
                    <CFormInput
                      placeholder="price"
                      aria-label="price"
                      aria-describedby="basic-addon1"
                      defaultValue={100}
                      min={10}
                      onChange={updateAddedState(id)}
                      type='number'
                    />
                  </CInputGroup>
                )))
            }

          </CModalBody>
          <CModalFooter>
            <CButton color="danger" variant="outline" onClick={() => setVisible(false)}>
              Close
            </CButton>
            {
              (operationState === EDIT_EXISTING_PRICES) ?
                (
                  <CButton color="success" variant="outline" onClick={() => updateExistingData()}>Update Changes</CButton>
                ) :
                (
                  <CButton color="info" variant="outline" onClick={() => addNewData()}>Add New Data</CButton>
                )
            }

          </CModalFooter>
        </CModal>
      </>
    )
  }

  const setModalAndSelectedState = (selectedData, index) => {
    setOperationState(EDIT_EXISTING_PRICES);
    setSelectedId(index)
    setVisible(!visible);
    setSelectedState(selectedData);
   // console.log('$$$$ ', selectedId)
  }

  const changeYear = (e) => {
    const selectedYear = parseInt(e.target.value);
    const id = totalState.findIndex((item) => item.year === selectedYear);
    if (id !== -1) {
      setYearId(id);
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{totalState[yearId]&&totalState[yearId].year}</strong> <small>year</small>
          </CCardHeader>
          <CCardBody>
            <CFormSelect aria-label="Default select example" onChange={changeYear} value={totalState[yearId]&&totalState[yearId].year}>
              {
                totalState.map(({year}, idx) => (
                  <option value={year} key={idx}>{year}</option>
                ))
              }
            </CFormSelect>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Table</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>

            <p className="text-medium-emphasis small">
              This is the XXX hotel data:
            </p>

            <CTable color="secondary" striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Room1</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Room2</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Room3</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Room4</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  totalState[yearId]&&totalState[yearId].prices_data.map((item, index) => (
                    <CTableRow key={index} style={{cursor: "pointer"}} onClick={() => setModalAndSelectedState(item, index)}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item[0]}</CTableDataCell>
                      <CTableDataCell>{item[1]}</CTableDataCell>
                      <CTableDataCell>{item[2]}</CTableDataCell>
                      <CTableDataCell>{item[3]}</CTableDataCell>
                    </CTableRow>
                  ))
                }
              </CTableBody>
            </CTable>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton color="success" className="me-md-2" variant="outline" onClick={() => setOperationStateAsAdd()}>
                Add New Prices
              </CButton>
            </div>
            {VerticallyCentered()}
            {
              (yearId !== undefined && totalState[yearId]) ? <TripleChart props={totalState[yearId].prices_data}/> : ''
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EachHotel