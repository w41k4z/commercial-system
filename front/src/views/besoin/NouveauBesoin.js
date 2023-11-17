import React from 'react'
import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'

const NouveauBesoin = () => {
  const renderRow = (index) => {
    const removeline = () => {
      const updatedRows = rows.filter((_, i) => i !== index)
      setRows(updatedRows)
    }
    return (
      <CRow className="mb-3">
        <CCol></CCol>
        <CCol sm={5}>
          <CFormLabel htmlFor="nomarticle">Nom</CFormLabel>
          <CFormSelect id="inputState">
            <option>Article 1</option>
            <option>Article 2</option>
          </CFormSelect>
        </CCol>
        <CCol sm={5}>
          <CFormLabel htmlFor="quantitearticle">Quantite</CFormLabel>
          <CFormInput type="text" id="quantitearticle" />
        </CCol>
        <CCol>
          <CFormLabel>Action</CFormLabel>
          <CButton color={'danger'} onClick={removeline}>
            Delete
          </CButton>
        </CCol>
      </CRow>
    )
  }
  const [rows, setRows] = useState([renderRow(0)])
  const addnewline = () => {
    const newRow = renderRow(rows.length)
    setRows([...rows, newRow])
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouveau Besoin</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Date de creation
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="datedecreation" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Date de besoin
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="datedebesoin" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="articles" className="col-sm-2 col-form-label">
                  Articles
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

export default NouveauBesoin
