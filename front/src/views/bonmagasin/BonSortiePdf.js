import React, { useEffect, useState } from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import Axios from 'src/http-client-side/Axios'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section1: {
    marginTop: 30,
  },
  table1: {
    display: 'table',
    width: 'auto',
  },
  tableRow1: {
    flexDirection: 'row',
  },
  tableCol1: {
    width: '25%',
  },
  tableCell1: {
    marginTop: 5,
    fontSize: 15,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 15,
  },
  tableCell2: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 15,
  },
  section2: {
    marginTop: 30,
  },
  details: {
    fontSize: 15,
    marginBottom: 10,
  },
  table3: {
    display: 'table',
    width: 'auto',
  },
  tableRow3: {
    flexDirection: 'row',
  },
  tableCol3: {
    width: '50%',
  },
  tableCell3: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 15,
  },
  section3: {
    marginTop: 30,
  },
})

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Bon de sortie</Text>
        {data && (
          <View style={styles.section1}>
            <View style={styles.table1}>
              <View style={styles.tableRow1}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>Date de sortie:</Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>{data.bonsortie.dateSortie}</Text>
                </View>
              </View>
              <View style={styles.tableRow1}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>Magasin:</Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>{data.bonsortie.magasinName}</Text>
                </View>
              </View>
              <View style={styles.tableRow1}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>Demande par:</Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>{data.bonsortie.demandeName}</Text>
                </View>
              </View>
              <View style={styles.tableRow1}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>Remis par:</Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell1}>{data.bonsortie.remisName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.section2}>
              <Text style={styles.details}>Details :</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Article</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Qtt demande</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Qtt livre</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Prx unitaire</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Total</Text>
                  </View>
                </View>
                {data.details.map((item) => (
                  <View style={styles.tableRow} key={item.id}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell2}>{item.articleName}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell2}>{item.quantiteDemande}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell2}>{item.quantiteLivre}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell2}>{item.prixUnitaire}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell2}>{item.total}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.section3}>
              <View style={styles.table3}>
                <View style={styles.tableRow3}>
                  <View style={styles.tableCol3}>
                    <Text style={styles.tableCell3}>Le Remetteur</Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <Text style={styles.tableCell3}>Le Receveur</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
)

MyDocument.propTypes = {
  data: PropTypes.shape({
    bonsortie: PropTypes.shape({
      dateSortie: PropTypes.string,
      magasinName: PropTypes.string,
      demandeName: PropTypes.string,
      remisName: PropTypes.string,
    }),
    details: PropTypes.array,
  }),
}

const BonEntreePdf = () => {
  const hash = window.location.hash
  const urlParams = new URLSearchParams(hash.split('?')[1])
  const paramId = urlParams.get('id')
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await Axios.post('/api/bonmagasin/sortie/voir?id=' + paramId)
      setData(response.data)
    } catch (error) {
      alert(error)
    }
  }

  console.log(data)

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      {data ? <MyDocument data={data} /> : <p>Loading...</p>}
    </PDFViewer>
  )
}

export default BonEntreePdf
