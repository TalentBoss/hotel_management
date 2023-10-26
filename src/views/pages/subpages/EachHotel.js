import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect, CFormSwitch,
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

const searchPositionOfSubArray = (dataArray, targetArray) => {
  let result = -1;

  for (let i = 0; i < dataArray.length; i++) {
    if (JSON.stringify(dataArray[i]) === JSON.stringify(targetArray)) {
      result = i;
      break;
    }
  }
  return result;
}

const EachHotel = () => {

  const [visible, setVisible] = useState(false);
  const [hotelNameState, setHotelNameState] = useState('');
  const [roomNumberState, setRoomNumberState] = useState(2);
  const [totalState, setTotalState] = useState([]);
  const [pricesState, setPricesState] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [yearSwitchState, setYearSwitchState] = useState(false);
  const [addedState, setAddedState] = useState([]);
  const [yearState, setYearState] = useState(2023);
  //const [roomNumberState, setRoomNumberState] = useState([100, 100, 100, 100]);


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
        const {hotel_name, room_number, data} =response.data;
        setTotalState(data);
        setHotelNameState(hotel_name);
        setRoomNumberState(room_number);

        const temp = [];
        for (let i = 0; i < data.length; i++) {
          const {prices_data} = data[i];
           temp.push(prices_data);
        }
        setPricesState([...temp]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
        }
      });
  }, []);



  const updateSelectedState = idx => e => {
    const indexOfSelectedState = searchPositionOfSubArray(pricesState[yearId], selectedState);
    if (indexOfSelectedState > -1) {
      const updatedState = [...pricesState]; // Create a new array to avoid mutating the state directly
      if (parseInt(e.target.value) < 10) updatedState[yearId][indexOfSelectedState][idx] = 10;
      else updatedState[yearId][indexOfSelectedState][idx] = parseInt(e.target.value);
      setSelectedState(updatedState[yearId][indexOfSelectedState]);
      setPricesState(updatedState); // Update the state with the updated array
      console.log(totalState)
    }
  }

  /*const updateAddedState = idx => e => {
    let newState = [...roomNumberState];
    newState[idx] = parseInt(e.target.value);
    setRoomNumberState(newState);
  }*/
  const addNewRoomsPrices = idx => e => {
    const temp = [...addedState];
    if (parseInt(e.target.value) < 10) temp[idx] = 10;
    else temp[idx] = parseInt(e.target.value);
    setAddedState(temp);
  }

  const updateExistingData = () => {
  }

  const setOperationStateAsAdd = () => {
    setOperationState(ADD_NEW_PRICES);
    setVisible(!visible);
    const roomTemp = [];
    for (let i = 0; i < roomNumberState; i++)
      roomTemp.push(100);
    setAddedState([...roomTemp])
  }

  const addNewData = () => {
    const temp = [...pricesState];

    if (temp.length > 0) {
      temp[yearId].push(addedState);
      setPricesState(temp);
    }
    else {
      setPricesState([[addedState]]);
      setTotalState([{year: yearState, prices_data: pricesState}])
      console.log(totalState  );
    }
  }

  const isChangeYearSwitch = (e) => {
    setYearSwitchState(e.target.checked);
  }

  const changeYearState = (e) => {
    if (parseInt(e.target.value) < 1999) setYearState(1999);
    else setYearState(parseInt(e.target.value));
  }
  /*const changeRoomNumber = (e) => {
    if (e.target.value > 1) {
      const temp = [...roomNumberState];
      if (e.target.value > roomNumberState.length) {
        for (let i = 0; i < e.target.value - roomNumberState.length; i++) {
          temp.push(100);
        }
      } else if (e.target.value < roomNumberState.length) {
        for (let i = 0; i < roomNumberState.length - e.target.value; i++) {
          temp.pop();
        }
      }
      setRoomNumberState(temp);
    }
  }*/

  const VerticallyCentered = () => {
    return (
      <>
        <CModal alignment="center" visible={visible} onClose={() => {
          setVisible(false);
        }}>
          <CModalHeader>
            <CModalTitle> {(operationState === ADD_NEW_PRICES) ? 'Add' : 'Edit'} Room Prices</CModalTitle>
          </CModalHeader>
          <CModalBody>

            {(operationState === ADD_NEW_PRICES) ?
              (<>
                  <CFormSwitch
                    label="New Year?"
                    id="newYearSwitch"
                    onChange={(e) => {isChangeYearSwitch(e)}}
                  />
                </>
              ) : ''
            }
            {
              (yearSwitchState || pricesState.length === 0) ?
                (<CInputGroup className="mb-3" key={8888}>
                    <CInputGroupText>Year </CInputGroupText>
                    <CFormInput
                      placeholder="year"
                      aria-label="price"
                      aria-describedby="basic-addon1"
                      defaultValue={2023}
                      onChange={changeYearState}
                      value={yearState||(totalState[yearId]&&totalState[yearId].year)}
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
                      defaultValue={100}
                      type='number'
                      min={10}
                    />
                  </CInputGroup>
                )) :
                (addedState.map((item, idx) => (
                  <CInputGroup className="mb-3" key={idx}>
                    <CInputGroupText>Room {idx+1}</CInputGroupText>
                    <CFormInput
                      placeholder="price"
                      aria-label="price"
                      aria-describedby="basic-addon1"
                      min={10}
                      onChange={addNewRoomsPrices(idx)}
                      value={item}
                      defaultValue={100}
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

  const setModalAndSelectedState = (selectedData) => {
    setOperationState(EDIT_EXISTING_PRICES);
    setVisible(!visible);
    setSelectedState(selectedData);
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
              This is the <strong style={{fontWeight: 'bold', color: 'red'}}>{hotelNameState}</strong> hotel data:
            </p>
            <CTable color="secondary" striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                  {
                    pricesState[yearId]&&pricesState[yearId][0]&&pricesState[yearId][0].map((item, idx) => (
                      <CTableHeaderCell scope="col" key={idx}>Room{idx+1}</CTableHeaderCell>
                    ))
                  }
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  pricesState[yearId]&&pricesState[yearId].map((item, index) => (
                    <CTableRow key={index} style={{cursor: "pointer"}} onClick={() => setModalAndSelectedState(item)}>
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
              <CButton color="success" className="me-md-2" variant="outline" disabled={pricesState[yearId]&&pricesState[yearId].length > 11} onClick={() => setOperationStateAsAdd()}>
                Add New Prices
              </CButton>
            </div>
            {VerticallyCentered()}
            {
              (yearId !== undefined && pricesState[yearId]) ? <TripleChart props={pricesState[yearId]}/> : ''
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EachHotel