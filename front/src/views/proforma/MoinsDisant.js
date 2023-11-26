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

const MoinsDisant = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Les moins disant par besoin</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Numero Besoin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Prix Unitaire</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TVA</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Montant HT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fournisseur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Du proforma numero</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date d obtention</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>BE0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>1000</CTableDataCell>
                  <CTableDataCell>20</CTableDataCell>
                  <CTableDataCell>10000</CTableDataCell>
                  <CTableDataCell>Shoprite</CTableDataCell>
                  <CTableDataCell>PR0001</CTableDataCell>
                  <CTableDataCell>2023-11-30</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>BE0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>1000</CTableDataCell>
                  <CTableDataCell>20</CTableDataCell>
                  <CTableDataCell>10000</CTableDataCell>
                  <CTableDataCell>Shoprite</CTableDataCell>
                  <CTableDataCell>PR0001</CTableDataCell>
                  <CTableDataCell>2023-11-30</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MoinsDisant
