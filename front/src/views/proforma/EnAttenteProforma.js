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

const EnAttenteProforma = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Les envoyes en attente de reponse</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Numero d envoi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date d envoi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fournisseur</CTableHeaderCell>
                  <CTableHeaderCell></CTableHeaderCell>
                  <CTableHeaderCell scope="col">Numero besoin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date de besoin final</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>EV0001</CTableDataCell>
                  <CTableDataCell>2023-11-10</CTableDataCell>
                  <CTableDataCell>Shoprite</CTableDataCell>
                  <CTableDataCell>
                    <CForm action="/#/proforma/nouveauproforma">
                      <CButton color="primary" size="sm" type="submit">
                        Repondre
                      </CButton>
                    </CForm>
                  </CTableDataCell>
                  <CTableDataCell>BE0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>2023-11-20</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>BE0002</CTableDataCell>
                  <CTableDataCell>Polo L</CTableDataCell>
                  <CTableDataCell>20</CTableDataCell>
                  <CTableDataCell>2023-11-30</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Les recus</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Proforma numero
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect id="inputState">
                    <option>PRF0001</option>
                    <option>PRF0001</option>
                  </CFormSelect>
                </CCol>
                <CCol sm={1}>
                  <CButton type="submit">Voir</CButton>
                </CCol>
              </CRow>
            </CForm>
            <CRow>
              <CCol sm={5}>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableHeaderCell>Proforma numero</CTableHeaderCell>
                      <CTableDataCell>PR0001</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Date d envoi</CTableHeaderCell>
                      <CTableDataCell>2023-11-19</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Numero d envoi</CTableHeaderCell>
                      <CTableDataCell>EV0001</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Proforma numero</CTableHeaderCell>
                      <CTableDataCell>PR0001</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Date de reception</CTableHeaderCell>
                      <CTableDataCell>2023-11-20</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Numero besoin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Prix unitaire</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TVA</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Montant HT</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>EV0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>1000</CTableDataCell>
                  <CTableDataCell>20</CTableDataCell>
                  <CTableDataCell>12312</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>EV0001</CTableDataCell>
                  <CTableDataCell>Gel 500mL</CTableDataCell>
                  <CTableDataCell>10</CTableDataCell>
                  <CTableDataCell>1000</CTableDataCell>
                  <CTableDataCell>20</CTableDataCell>
                  <CTableDataCell>12312</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableHeaderCell>Total HT</CTableHeaderCell>
                  <CTableDataCell>10000</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableHeaderCell>Total TTC</CTableHeaderCell>
                  <CTableDataCell>10000</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EnAttenteProforma
