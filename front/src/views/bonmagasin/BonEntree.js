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
  const [fournisseurs, setFournisseurs] = useState([])
  const [articles, setArticles] = useState([])
  const [personnels, setPersonnels] = useState([])
  const [bonentrees, setBoneEntrees] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [magasins, setMagasins] = useState([])
  const [idpdf, setIdpdf] = useState(-1)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    await Axios.get('/api/bonmagasin/entree/data')
      .then((res) => {
        setFournisseurs(res.data.fournisseurs)
        setArticles(res.data.articles)
        setPersonnels(res.data.personnels)
        setMagasins(res.data.magasins)
        setBoneEntrees(res.data.bonentrees)
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
        <CCol sm={3}>
          <CFormLabel htmlFor="quantite">Quantite</CFormLabel>
          <CFormInput id={'quantite' + index}></CFormInput>
        </CCol>
        <CCol sm={3}>
          <CFormLabel htmlFor="observation">Observation</CFormLabel>
          <CFormInput id={'observation' + index}></CFormInput>
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
    let dateentree = document.getElementById('dateentree').value
    let idfournisseur = document.getElementById('idfournisseur').value
    let idremis = document.getElementById('idremis').value
    let idrecu = document.getElementById('idrecu').value
    let details = []
    let i = 0
    let idarticle = document.getElementById('idarticle' + i)
    while (idarticle != null) {
      let quantite = document.getElementById('quantite' + i).value
      let observation = document.getElementById('observation' + i).value
      let d = {
        idarticle: idarticle.value,
        quantite: quantite,
        observation: observation,
      }
      details.push(d)
      i++
      idarticle = document.getElementById('idarticle' + i)
    }
    let go = {
      idmagasin: idmagasin,
      idfournisseur: idfournisseur,
      dateentree: dateentree,
      idremis: idremis,
      idrecu: idrecu,
      details: details,
    }
    // console.log(go)
    await Axios.post('/api/bonmagasin/entree', go)
      .then((res) => {
        window.location.reload()
      })
      .catch((error) => {
        alert(error)
      })
  }

  const seeBonEntree = async (event) => {
    event.preventDefault()
    let id = document.getElementById('idbonentree').value
    await Axios.post('/api/bonmagasin/entree/voir?id=' + id)
      .then((res) => {
        let bonentree = res.data.bonentree
        setIdpdf(bonentree.id)
        document.getElementById('magasin').innerText = bonentree.magasinName
        document.getElementById('dateentree_').innerHTML = bonentree.dateEntree
        document.getElementById('supplier').innerText = bonentree.supplierName
        document.getElementById('remispar').innerText = bonentree.remisParName
        document.getElementById('recupar').innerText = bonentree.recuParName
        let details = res.data.details
        setTableRows(details)
      })
      .catch((error) => {
        alert(error)
      })
  }
  // PDF start
  const pdf = () => {
    window.open('/#/bonmagasin/entreepdf?id=' + idpdf)
  }
  // PFD end
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nouvelle bon d entree en magasin</strong> <small></small>
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
                <CFormLabel htmlFor="dateentree" className="col-sm-2 col-form-label">
                  Date d entree
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="date" id="dateentree" />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="idfournisseur" className="col-sm-2 col-form-label">
                  Fournisseur
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="idfournisseur">
                    {fournisseurs.map((l, index) => {
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
                <CFormLabel htmlFor="idrecu" className="col-sm-2 col-form-label">
                  Recu par
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect id="idrecu">
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
            <strong>Les bons d entree</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={seeBonEntree}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="datedebesoin" className="col-sm-2 col-form-label">
                  Bon d entree numero
                </CFormLabel>
                <CCol sm={9}>
                  <CFormSelect id="idbonentree">
                    {bonentrees.map((l, index) => {
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
                      <CTableHeaderCell>Date d entree</CTableHeaderCell>
                      <CTableDataCell id="dateentree_"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Magasin</CTableHeaderCell>
                      <CTableDataCell id="magasin"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Fournisseur</CTableHeaderCell>
                      <CTableDataCell id="supplier"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Remis par</CTableHeaderCell>
                      <CTableDataCell id="remispar"></CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell>Recu par</CTableHeaderCell>
                      <CTableDataCell id="recupar"></CTableDataCell>
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
                  <CTableHeaderCell scope="col">Quantite</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Observation</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableRows.map((l, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{l.articleName}</CTableDataCell>
                      <CTableDataCell>{l.quantite}</CTableDataCell>
                      <CTableDataCell>{l.observation}</CTableDataCell>
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
