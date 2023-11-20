import React from 'react'
import { useState } from 'react'
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

const NouveauProforma = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Saisie de proforma de l envoi numero EV001</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Date de reception
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="datedecreation" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Total HT
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="datedecreation" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Total TVA
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="datedecreation" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedecreation" className="col-sm-2 col-form-label">
                  Total TTC
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="datedecreation" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Besoin numero</CFormLabel>
                  <CFormInput type="text" value={'aaa'} />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Article</CFormLabel>
                  <CFormInput type="text" value={'Gel 500mL'} />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Quantite</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Prix unitaire</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">TVA</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Montant HT</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Besoin numero</CFormLabel>
                  <CFormInput type="text" value={'aaa'} />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Article</CFormLabel>
                  <CFormInput type="text" value={'Gel 500mL'} />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Quantite</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Prix unitaire</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">TVA</CFormLabel>
                  <CFormInput type="text" />
                </CCol>
                <CCol sm={2}>
                  <CFormLabel htmlFor="nomarticle">Montant HT</CFormLabel>
                  <CFormInput type="text" />
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

export default NouveauProforma
