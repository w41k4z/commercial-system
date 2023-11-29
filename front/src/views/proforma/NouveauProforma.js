import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Axios from '../../http-client-side/Axios'
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
} from '@coreui/react'

const NouveauProforma = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id_proforma_send = searchParams.get('id_proforma_send')

  const [proformaattente, setProformaAttente] = useState({
    vProformaSend: {
      numero: '',
    },
    vProformaSendNeedGroups: [],
  })

  useEffect(() => {
    fetchListebesoin()
  }, [])

  const fetchListebesoin = async () => {
    await Axios.get('/api/enattenteproforma/' + id_proforma_send)
      .then((res) => {
        setProformaAttente(res.data.proformaEnAttente)
      })
      .catch((error) => {
        alert(error)
      })
  }

  const submitform = async (event) => {
    event.preventDefault()
    let date_received = document.getElementById('date_received').value
    let id_proforma_send = document.getElementById('id_proforma_send').value
    let total_ht = document.getElementById('total_ht').value
    let total_tva = document.getElementById('total_tva').value
    let total_ttc = document.getElementById('total_ttc').value
    let i = 0
    let details = []
    let id_article = document.getElementById('id_article' + i)
    while (id_article != null) {
      let quantity = document.getElementById('quantity' + i).value
      let unit_price = document.getElementById('unit_price' + i).value
      let tva = document.getElementById('tva' + i).value
      let montan_ht = document.getElementById('montant_ht' + i).value
      let id_need_group = document.getElementById('id_need_group' + i).value
      details.push({
        id_article: id_article.value,
        quantity: quantity,
        unit_price: unit_price,
        tva: tva,
        montan_ht: montan_ht,
        id_need_group: id_need_group,
      })
      i++
      id_article = document.getElementById('id_article' + i)
    }
    let go = {
      id_proforma_send: id_proforma_send,
      date_received: date_received,
      total_ht: total_ht,
      total_tva: total_tva,
      total_ttc: total_ttc,
      details: details,
    }
    await Axios.post('/api/enattenteproforma', go)
      .then((res) => {
        window.location.replace('/#/proforma/enattenteproforma')
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
            <strong>Reponse du proforma {proformaattente.vProformaSend.numero}</strong>
            <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={submitform}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="date_received" className="col-sm-2 col-form-label">
                  Date de reception
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="date_received" />
                  <CFormInput
                    type="hidden"
                    id="id_proforma_send"
                    value={proformaattente.vProformaSend.id}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="total_ht" className="col-sm-2 col-form-label">
                  Total HT
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="total_ht" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="total_tva" className="col-sm-2 col-form-label">
                  Total TVA
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="total_tva" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="total_ttc" className="col-sm-2 col-form-label">
                  Total TTC
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" id="total_ttc" />
                </CCol>
              </CRow>
              {proformaattente.vProformaSendNeedGroups.map((l, index) => {
                return (
                  <CRow className="mb-3" key={index}>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="numbesoin">Besoin numero</CFormLabel>
                      <CFormInput type="text" value={l.numero} id="numbesoin" />
                      <CFormInput
                        type="hidden"
                        value={l.idNeedGroup}
                        id={'id_need_group' + index}
                      />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="nomarticle">Article</CFormLabel>
                      <CFormInput type="text" value={l.articleName} id="nomarticle" />
                      <CFormInput type="hidden" value={l.idArticle} id={'id_article' + index} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="quantity">Quantite</CFormLabel>
                      <CFormInput type="text" value={l.quantity} id={'quantity' + index} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="unit_price">Prix unitaire</CFormLabel>
                      <CFormInput type="text" id={'unit_price' + index} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="tva">TVA</CFormLabel>
                      <CFormInput type="text" id={'tva' + index} />
                    </CCol>
                    <CCol sm={2}>
                      <CFormLabel htmlFor="montan_ht">Montant HT</CFormLabel>
                      <CFormInput type="text" id={'montant_ht' + index} />
                    </CCol>
                  </CRow>
                )
              })}
              <CButton type="submit">Valider</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NouveauProforma
