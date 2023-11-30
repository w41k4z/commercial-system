import React from 'react'
import { useState, useEffect } from 'react'
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

const EnAttenteProforma = () => {
  const [proformaattentes, setProformaAttentes] = useState([])
  const [proformas, setProformas] = useState([])

  useEffect(() => {
    fetchListProformaAttentes()
  }, [])

  const fetchListProformaAttentes = async () => {
    await Axios.get('/api/enattenteproforma')
      .then((res) => {
        setProformaAttentes(res.data.proformaEnAttentes)
      })
      .catch((error) => {
        alert(error)
      })
  }

  useEffect(() => {
    fetchListeProformas()
  }, [])

  const fetchListeProformas = async () => {
    await Axios.get('/api/voirproforma')
      .then((res) => {
        setProformas(res.data.proformas)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const [tableRows, setTableRows] = useState([])

  const seeProforma = async (event) => {
    event.preventDefault()
    let id = document.getElementById('id_proforma').value
    await Axios.post('/api/voirproforma?id=' + id)
      .then((res) => {
        let proforma = res.data.proforma
        document.getElementById('numero').innerText = proforma.numero
        document.getElementById('supplier').innerText = proforma.supplier
        document.getElementById('numero_envoi').innerText = proforma.numeroSend
        document.getElementById('date_envoi').innerText = proforma.dateSend
        document.getElementById('date_reception').innerText = proforma.dateReceived
        let details = res.data.details
        setTableRows(details)
        document.getElementById('total_ht').innerText = proforma.totalHt
        document.getElementById('total_tva').innerText = proforma.totalTva
        document.getElementById('total_ttc').innerText = proforma.totalTtc
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
                {proformaattentes.map((l, index) => {
                  return (
                    <>
                      <CTableRow key={index}>
                        <CTableDataCell>{l.vProformaSend.numero}</CTableDataCell>
                        <CTableDataCell>{l.vProformaSend.dateSend}</CTableDataCell>
                        <CTableDataCell>{l.vProformaSend.name}</CTableDataCell>
                        <CTableDataCell>
                          <CForm
                            action={
                              '/#/proforma/nouveauproforma?id_proforma_send=' + l.vProformaSend.id
                            }
                          >
                            <CButton color="primary" size="sm" type="submit">
                              Repondre
                            </CButton>
                          </CForm>
                        </CTableDataCell>
                        <CTableDataCell>{l.vProformaSendNeedGroups[0].numero}</CTableDataCell>
                        <CTableDataCell>{l.vProformaSendNeedGroups[0].articleName}</CTableDataCell>
                        <CTableDataCell>{l.vProformaSendNeedGroups[0].quantity}</CTableDataCell>
                        <CTableDataCell>
                          {l.vProformaSendNeedGroups[0].finalDateNeed}
                        </CTableDataCell>
                      </CTableRow>
                      {l.vProformaSendNeedGroups.slice(1).map((detail, detailIndex) => (
                        <CTableRow key={detailIndex}>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell>{detail.numero}</CTableDataCell>
                          <CTableDataCell>{detail.articleName}</CTableDataCell>
                          <CTableDataCell>{detail.quantity}</CTableDataCell>
                          <CTableDataCell>{detail.finalDateNeed}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </>
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
            <strong>Les recus</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={seeProforma}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Proforma numero
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect id="id_proforma">
                    {proformas.map((l, index) => {
                      return (
                        <>
                          <option value={l.id}>{l.numero}</option>
                        </>
                      )
                    })}
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
                      <CTableDataCell id="numero"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Fournisseur</CTableHeaderCell>
                      <CTableDataCell id="supplier"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Date d envoi</CTableHeaderCell>
                      <CTableDataCell id="date_envoi"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Numero d envoi</CTableHeaderCell>
                      <CTableDataCell id="numero_envoi"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Date de reception</CTableHeaderCell>
                      <CTableDataCell id="date_reception"></CTableDataCell>
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
                {tableRows.map((l, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{l.numero}</CTableDataCell>
                      <CTableDataCell>{l.articleName}</CTableDataCell>
                      <CTableDataCell>{l.quantity}</CTableDataCell>
                      <CTableDataCell>{l.unitPrice}</CTableDataCell>
                      <CTableDataCell>{l.tva}</CTableDataCell>
                      <CTableDataCell>{l.totalHt}</CTableDataCell>
                    </CTableRow>
                  )
                })}
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableHeaderCell>Total HT</CTableHeaderCell>
                  <CTableDataCell id="total_ht"></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableHeaderCell>Total TVA</CTableHeaderCell>
                  <CTableDataCell id="total_tva"></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableHeaderCell>Total TTC</CTableHeaderCell>
                  <CTableDataCell id="total_ttc"></CTableDataCell>
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
