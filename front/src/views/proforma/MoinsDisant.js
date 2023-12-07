import React from 'react'
import { useState, useEffect } from 'react'
import Axios from '../../http-client-side/Axios'
import {
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
} from '@coreui/react'

const MoinsDisant = () => {
  const [moinsdisants, setMoinsdisant] = useState([])

  useEffect(() => {
    fetchListMoinsDisant()
  }, [])

  const fetchListMoinsDisant = async () => {
    await Axios.get('/api/moinsdisant')
      .then((res) => {
        setMoinsdisant(res.data.moinsdisant)
      })
      .catch((error) => {
        alert(error)
      })
  }
  // console.log(moinsdisants)
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
                {moinsdisants.map((l, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{l.needNumero}</CTableDataCell>
                      <CTableDataCell>{l.articleName}</CTableDataCell>
                      <CTableDataCell>{l.quantity}</CTableDataCell>
                      <CTableDataCell>{l.unitPrice}</CTableDataCell>
                      <CTableDataCell>{l.tva}</CTableDataCell>
                      <CTableDataCell>{l.totalHt}</CTableDataCell>
                      <CTableDataCell>{l.supplierName}</CTableDataCell>
                      <CTableDataCell>{l.proformaNumero}</CTableDataCell>
                      <CTableDataCell>{l.dateReceived}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MoinsDisant
