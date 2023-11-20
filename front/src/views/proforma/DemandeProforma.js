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
  CFormSelect,
} from '@coreui/react'

const DemandeProforma = () => {
  const [listebesoin, setListebesoin] = useState([])
  useEffect(() => {
    fetchListebesoin()
  }, [])

  // Method
  const fetchListebesoin = async () => {
    await Axios.get('/api/demandeproforma')
      .then((res) => {
        console.log(res.data)
        setListebesoin(res.data)
      })
      .catch((error) => {
        alert(error)
      })
  }
  const renderRow = (index) => {
    const removeline = () => {
      const updatedRows = rows.filter((_, i) => i !== index)
      setRows(updatedRows)
    }
    return (
      <CRow className="mb-3">
        <CCol></CCol>
        <CCol sm={10}>
          <CFormLabel htmlFor="nomarticle">Numero</CFormLabel>
          <CFormSelect id="inputState">
            <option>BS0001</option>
            <option>BS0002</option>
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormLabel>Action</CFormLabel>
          <CButton color={'danger'} onClick={removeline}>
            Supprimer
          </CButton>
        </CCol>
      </CRow>
    )
  }
  const [rows, setRows] = useState([renderRow(1)])
  const addnewline = () => {
    const newRow = renderRow(rows.length)
    setRows([...rows, newRow])
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Liste des besoins valides pas encore dans un proforma</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Departement</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date de requete</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date de besoin</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {listebesoin.map((l, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{l.department}</CTableDataCell>
                      <CTableDataCell>{l.article}</CTableDataCell>
                      <CTableDataCell>{l.quantity}</CTableDataCell>
                      <CTableDataCell>{l.dateSend}</CTableDataCell>
                      <CTableDataCell>{l.dateNeed}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Groupage de ces besoins pas encore dans un proforma</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Numero Besoin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date de besoin final</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>BS0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>2023-11-10</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Les besoins groupes qui sont dans des proformas</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Numero Besoin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date de besoin final</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fournisseur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date d envoi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Numero d envoi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>BS0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>2023-11-10</CTableDataCell>
                  <CTableDataCell>Shoprite</CTableDataCell>
                  <CTableDataCell>2023-11-01</CTableDataCell>
                  <CTableDataCell>EVP0001</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>Shoprite</CTableDataCell>
                  <CTableDataCell>2023-11-01</CTableDataCell>
                  <CTableDataCell>EVP0001</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouvelle demade de proforma</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Date d envoi
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="datedecreation" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Fournisseur
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="inputState">
                    <option>Shoprite</option>
                    <option>Jumbo</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="articles" className="col-sm-2 col-form-label">
                  Besoin
                </CFormLabel>
                <CCol sm={10}>
                  <CButton color={'success'} onClick={addnewline}>
                    Ajouter
                  </CButton>
                </CCol>
              </CRow>
              {rows.map((row, index) => (
                <div key={index}>{row}</div>
              ))}
              <CButton type="submit">Valider</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DemandeProforma
