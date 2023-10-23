import React from "react";
import {
  CButton,
  CCard,
  CCardBody, CCardGroup,
  CCardHeader, CCol, CForm, CFormInput, CInputGroup, CInputGroupText,
  CRow,
  CTable,
  CTableBody, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilListNumbered, cilLockLocked, cilRoom, cilUser} from "@coreui/icons";
import {Link} from "react-router-dom";

const AddHotel = () => {
  return (
    <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>New Hotel Info</h1>
                    <p className="text-medium-emphasis">Please enter new hotel name and room number</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilRoom} />
                      </CInputGroupText>
                      <CFormInput placeholder="Hotel name" autoComplete="hotel-name" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilListNumbered} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        placeholder="Room number"
                        autoComplete="room-number"
                        defaultValue={3}
                        min={1}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="success" className="px-4" variant="outline">
                          Add New
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-success py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div style={{marginTop: '10%'}}>
                    <h2>Add New Hotel</h2>
                    <span>You can compare this hotel rooms' prices with others from now</span>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
  )
}


export default AddHotel;

