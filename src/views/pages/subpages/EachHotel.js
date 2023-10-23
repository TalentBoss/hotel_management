import React, {useState} from 'react'
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
  const [selectedState, setSelectedState] = useState(hotelPricesState[0]);
  const [selectedId, setSelectedId] = useState(-1);
  let initialAddedState = [];
  for (let i = 0; i < selectedState.length; i++)
    initialAddedState.push(100);
  const [addedState, setAddedState] = useState(initialAddedState);
  const [operationState, setOperationState] = useState(ADD_NEW_PRICES);

  const updateSelectedState = idx => e => {
    const indexOfSelectedState = hotelPricesState.indexOf(selectedState);
    let newState = [...selectedState];
    newState[idx] = parseInt(e.target.value);
    setSelectedState(newState);

    if (indexOfSelectedState > -1) {
      let newHotelPrices = [...hotelPricesState];
      newHotelPrices[indexOfSelectedState] = newState;
      setHotelPricesState(newHotelPrices);
    }
  }

  const updateAddedState = idx => e => {
    let newState = [...addedState];
    newState[idx] = parseInt(e.target.value);
    setAddedState(newState);
  }

  const updateExistingData = () => {
    // console.log(selectedState)
    // console.log(hotelPricesState)
    console.log(selectedId)
  }

  const setOperationStateAsAdd = () => {
    setOperationState(ADD_NEW_PRICES);
    setVisible(!visible);
  }

  const addNewData = () => {
    console.log(addedState)
    let newState = hotelPricesState;
    newState.push(addedState);
    setHotelPricesState(newState);
    console.log(hotelPricesState)
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
    console.log('$$$$ ', selectedId)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>2023</strong> <small>year</small>
          </CCardHeader>
          <CCardBody>
            <CFormSelect aria-label="Default select example">
              <option>2023</option>
              <option value="1">2022</option>
              <option value="2">2021</option>
              <option value="3">2020</option>
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
                  hotelPricesState.map((item, index) => (
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
            <TripleChart props={hotelPricesState}/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EachHotel