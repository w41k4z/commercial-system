import React, { useState, useEffect } from 'react'
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

const BonEntree = () => {
  const [articles, setArticles] = useState([])
  const [personnels, setPersonnels] = useState([])
  const [bonsorties, setBonSorties] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [magasins, setMagasins] = useState([])
  const [idpdf, setIdpdf] = useState(-1)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    await Axios.get('/api/bonmagasin/sortie/data')
      .then((res) => {
        setArticles(res.data.articles)
        setPersonnels(res.data.personnels)
        setBonSorties(res.data.bonsorties)
        setMagasins(res.data.magasins)
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
        <CCol sm={3}>
          <CFormLabel htmlFor="idarticle">Article</CFormLabel>
          <CFormSelect id={'idarticle' + index}>
            {articles.map((l, index) => {
              return (
                <option key={index} value={l.id}>
                  {l.name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        <CCol sm={2}>
          <CFormLabel htmlFor="quantitedemande">Quantite demande</CFormLabel>
          <CFormInput id={'quantitedemande' + index}></CFormInput>
        </CCol>
        <CCol sm={2}>
          <CFormLabel htmlFor="quantitelivre">Quantite livre</CFormLabel>
          <CFormInput id={'quantitelivre' + index}></CFormInput>
        </CCol>
        <CCol sm={2}>
          <CFormLabel htmlFor="prixunitaire">Prix Unitaire</CFormLabel>
          <CFormInput id={'prixunitaire' + index}></CFormInput>
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
    let idmagasin = document.getElementById('idmagasin').value
    let datesortie = document.getElementById('datesortie').value
    let idremis = document.getElementById('idremis').value
    let iddemande = document.getElementById('iddemande').value
    let details = []
    let i = 0
    let idarticle = document.getElementById('idarticle' + i)
    while (idarticle != null) {
      let quantitedemande = document.getElementById('quantitedemande' + i).value
      let quantitelivre = document.getElementById('quantitelivre' + i).value
      let prixunitaire = document.getElementById('prixunitaire' + i).value
      let d = {
        idarticle: idarticle.value,
        quantitedemande: quantitedemande,
        quantitelivre: quantitelivre,
        prixunitaire: prixunitaire,
      }
      details.push(d)
      i++
      idarticle = document.getElementById('idarticle' + i)
    }
    let go = {
      idmagasin: idmagasin,
      datesortie: datesortie,
      idremis: idremis,
      iddemande: iddemande,
      details: details,
    }
    // console.log(go)
    await Axios.post('/api/bonmagasin/sortie', go)
      .then((res) => {
        window.location.reload()
      })
      .catch((error) => {
        alert(error)
      })
  }

  const seeBonSortie = async (event) => {
    event.preventDefault()
    let id = document.getElementById('idbonsortie').value
    await Axios.post('/api/bonmagasin/sortie/voir?id=' + id)
      .then((res) => {
        let bonsortie = res.data.bonsortie
        setIdpdf(bonsortie.id)
        document.getElementById('magasin').innerText = bonsortie.magasinName
        document.getElementById('datesortie_').innerHTML = bonsortie.dateSortie
        document.getElementById('remispar').innerText = bonsortie.remisName
        document.getElementById('demandepar').innerText = bonsortie.demandeName
        let details = res.data.details
        setTableRows(details)
      })
      .catch((error) => {
        alert(error)
      })
  }
  // PDF start
  const pdf = () => {
    window.open('/#/bonmagasin/sortiepdf?id=' + idpdf)
  }
  // PFD end
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouvelle bon de sortie en magasin</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={submitform}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="idmagasin" className="col-sm-2 col-form-label">
                  Magasin
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="idmagasin">
                    {magasins.map((l, index) => {
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
                <CFormLabel htmlFor="datesortie" className="col-sm-2 col-form-label">
                  Date de sortie
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="datesortie" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="iddemande" className="col-sm-2 col-form-label">
                  Demande par
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="iddemande">
                    {personnels.map((l, index) => {
                      return (
                        <option key={index} value={l.id}>
                          {l.fullname}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="idremis" className="col-sm-2 col-form-label">
                  Remis par
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="idremis">
                    {personnels.map((l, index) => {
                      return (
                        <option key={index} value={l.id}>
                          {l.fullname}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="articles" className="col-sm-2 col-form-label">
                  Details
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Les bons de sortie</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={seeBonSortie}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Bon de sortie numero
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect id="idbonsortie">
                    {bonsorties.map((l, index) => {
                      return (
                        <>
                          <option value={l.id}>{l.id}</option>
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
                      <CTableHeaderCell>Magasin</CTableHeaderCell>
                      <CTableDataCell id="magasin"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Date de sortie</CTableHeaderCell>
                      <CTableDataCell id="datesortie_"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Demande par</CTableHeaderCell>
                      <CTableDataCell id="demandepar"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Remis par</CTableHeaderCell>
                      <CTableDataCell id="remispar"></CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCol>
              <CCol sm={5}></CCol>
              <CCol>
                <CButton onClick={pdf}>PDF Version</CButton>
              </CCol>
            </CRow>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Article</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite demande</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Quantite livre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Prix unitaire</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableRows.map((l, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{l.articleName}</CTableDataCell>
                      <CTableDataCell>{l.quantiteDemande}</CTableDataCell>
                      <CTableDataCell>{l.quantiteLivre}</CTableDataCell>
                      <CTableDataCell>{l.prixUnitaire}</CTableDataCell>
                      <CTableDataCell>{l.total}</CTableDataCell>
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

export default BonEntree
