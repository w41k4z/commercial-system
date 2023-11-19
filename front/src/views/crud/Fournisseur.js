import React, { useEffect, useState } from 'react'
import Axios from '../../http-client-side/Axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'

const Fournisseur = () => {
  // HOOKS
  const [suppliers, setSuppliers] = useState([])
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  })
  useEffect(() => {
    fetchSuppliers()
  }, [suppliers])

  // Method
  const fetchSuppliers = async () => {
    await Axios.get('/api/suppliers')
      .then((res) => {
        console.log(res.data)
        setSuppliers(res.data)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Liste des fournisseurs</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Adresse</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Telephone</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {suppliers.map((supplier, index) => {
                  return (
                    <CTableRow key={supplier.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{supplier.name}</CTableDataCell>
                      <CTableDataCell>{supplier.address}</CTableDataCell>
                      <CTableDataCell>{supplier.email}</CTableDataCell>
                      <CTableDataCell>{supplier.phoneNumber}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color={'danger'}>Delete</CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color={'warning'}>Update</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>
                    <CButton color={'danger'}>Delete</CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color={'warning'}>Update</CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell>Larry the Bird</CTableDataCell>
                  <CTableDataCell>Larry the Bird</CTableDataCell>
                  <CTableDataCell>Larry the Bird</CTableDataCell>
                  <CTableDataCell>Larry the Bird</CTableDataCell>
                  <CTableDataCell>
                    <CButton color={'danger'}>Delete</CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color={'warning'}>Update</CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouveau Fournisseur</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="nom" className="col-sm-2 col-form-label">
                  Nom
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="nom" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="addresse" className="col-sm-2 col-form-label">
                  Addresse
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="addresse" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="email" id="email" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="telephone" className="col-sm-2 col-form-label">
                  Telephone
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="telephone" />
                </CCol>
              </CRow>
              <CButton type="submit">Valider</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Fournisseur
