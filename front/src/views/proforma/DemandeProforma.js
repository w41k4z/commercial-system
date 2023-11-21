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
  const [groupebesoin, setGroupebesoin] = useState([])
  const [fournisseur, setFournisseur] = useState([])
  const [besoinproformes, setBesoinProformers] = useState([])

  useEffect(() => {
    fetchListebesoin()
  }, [])

  const fetchListebesoin = async () => {
    await Axios.get('/api/demandeproforma')
      .then((res) => {
        console.log(res.data)
        setListebesoin(res.data.besoinAAfficher)
        setGroupebesoin(res.data.groupNonProformers)
        setFournisseur(res.data.fournisseurs)
        setBesoinProformers(res.data.besoinProformers)
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
          <CFormSelect id={'besoins' + index}>
            {groupebesoin.map((l, index) => {
              return (
                <option key={index} value={l.id}>
                  {l.numero}
                </option>
              )
            })}
            {besoinproformes.map((l, index) => {
              return (
                <option key={index} value={l.vGroupProformer.id}>
                  {l.vGroupProformer.numero}
                </option>
              )
            })}
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
  const [rows, setRows] = useState([])
  const addnewline = () => {
    const newRow = renderRow(rows.length)
    setRows([...rows, newRow])
  }
  const submitform = async (event) => {
    event.preventDefault()
    let dateenvoie = document.getElementById('dateenvoi').value
    let idfournisseur = document.getElementById('idfournisseur').value
    let besoins = []
    let i = 0
    let b = document.getElementById('besoins' + i)

    while (b != null) {
      besoins.push(parseInt(b.value))
      i++
      b = document.getElementById('besoins' + i) // Fetch the next element
    }
    let go = {
      dateenvoie: dateenvoie,
      idfournisseur: idfournisseur,
      besoins: besoins,
    }
    console.log(go)
    await Axios.post('/api/demandeproforma', go)
      .then((res) => {
        alert(res.data)
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
                {groupebesoin.map((l, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{l.numero}</CTableDataCell>
                      <CTableDataCell>{l.article}</CTableDataCell>
                      <CTableDataCell>{l.quantity}</CTableDataCell>
                      <CTableDataCell>{l.finalDateNeed}</CTableDataCell>
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
                {besoinproformes.map((l, index) => {
                  return (
                    <>
                      <CTableRow key={index}>
                        <CTableDataCell>{l.vGroupProformer.numero}</CTableDataCell>
                        <CTableDataCell>{l.vGroupProformer.article}</CTableDataCell>
                        <CTableDataCell>{l.vGroupProformer.quantity}</CTableDataCell>
                        <CTableDataCell>{l.vGroupProformer.finalDateNeed}</CTableDataCell>
                        <CTableDataCell>{l.vGroupProformerDetails[0].supplier}</CTableDataCell>
                        <CTableDataCell>{l.vGroupProformerDetails[0].dateSend}</CTableDataCell>
                        <CTableDataCell>{l.vGroupProformerDetails[0].numero}</CTableDataCell>
                      </CTableRow>
                      {l.vGroupProformerDetails.slice(1).map((detail, detailIndex) => (
                        <CTableRow key={detailIndex}>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell></CTableDataCell>
                          <CTableDataCell>{detail.supplier}</CTableDataCell>
                          <CTableDataCell>{detail.dateSend}</CTableDataCell>
                          <CTableDataCell>{detail.numero}</CTableDataCell>
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
            <strong>Nouvelle demade de proforma</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={submitform}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="dateenvoin" className="col-sm-2 col-form-label">
                  Date d envoi
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="dateenvoi" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Fournisseur
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="idfournisseur">
                    {fournisseur.map((l, index) => {
                      return (
                        <option key={index} value={l.id}>
                          {l.name}
                        </option>
                      )
                    })}
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
