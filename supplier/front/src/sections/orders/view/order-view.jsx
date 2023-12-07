import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';
import TableEmptyRows from '../table-empty-rows';
import OrderTableToolbar from '../order-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function OrderPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('orderId');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/orders').then(res => res.data).then(data => {
      console.log(data);
      setOrders(data.documents);
    })
  }, [])
  const [newOrder, setNewOrder] = useState({ orderId: '', inc: 0, date: '', details: [], refClient: '', object: '' })
  const [newOrderDetail, setNewOrderDetail] = useState({qte: 0, refArticle: ''});
  
  const [clients, setClients] = useState([]);
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/clients').then(res => res.data).then(data => {
      console.log(data);
      setClients(data.documents);
    })
  }, [])

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/articles').then(res => res.data).then(data => {
      console.log(data);
      setArticles(data.documents);
    })
  }, [])

  const getClientById = (id) => clients.find(client => client.fields.id.stringValue === id)
  
  const getArticleById = (id) => articles.find(article => article.fields.id.stringValue === id)

  const [modalVisibility, setModalVisibility] = useState(false);

  const hideModal = () => {
    setModalVisibility(false);
  }

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.fields.orderId.stringValue);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: orders,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Orders</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setModalVisibility(true)}>
          New order
        </Button>
        {modalVisibility && (
          <Modal show onHide={hideModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>Order ID</label>
                <div className='d-flex align-items-center'>
                  BC
                  <select className='form-select' onChange={e => setNewOrder({ ...newOrder, orderId: (`BC${e.target.value}`), refClient: getClientById(e.target.value).name })}>
                    <option>Choose</option>
                    {clients.map(client => (
                      <option value={client.fields.id.stringValue}>{client.fields.id.stringValue}</option>
                    ))}  
                  </select>
                  <input type='number' className='form-control' onChange={e => setNewOrder({ ...newOrder, inc: e.target.value})} />
                </div>
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Date
                </label>
                  <input type='date' className='form-control' onChange={e => setNewOrder({...newOrder, date: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Object
                </label>
                  <input type='text' className='form-control' defaultValue={newOrder.object} onChange={e => setNewOrder({...newOrder, object: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Details
                </label>
                <div className='d-flex justify-content-between align-items-center'>
                  <select className='form-select' onChange={e => setNewOrderDetail({ ...newOrderDetail, refArticle: getArticleById(e.target.value).name})}>
                    <option>Choose</option>
                    {articles.map(article => (
                      <option value={article.fields.id.stringValue}>{article.fields.designation.stringValue}</option>
                    ))}  
                  </select>
                  <input type='number' className='form-control' value={newOrderDetail.qte} onChange={e => setNewOrderDetail({...newOrderDetail, qte: e.target.value})} />
                  <button type='button' className='btn btn-success' onClick={e => {
                    const newOrderDetails = [...newOrder.details]
                    newOrderDetails.push(newOrderDetail)
                    setNewOrder({ ...newOrder, details: newOrderDetails })
                    alert('Article added')
                    setNewOrderDetail({qte: 0, refArticle: ''})
                  }} >+</button>
                </div>
              </div>
              <div className="d-flex justify-content-end">
              <button
                  type='button'
                  className="btn btn-primary"
                  onClick={async (event) => {
                    const newOrderDoc = {
                        fields: {
                          orderId: {
                          stringValue: (`${newOrder.orderId}00${ newOrder.inc}`)
                        },
                          date: {
                          timestampValue: new Date(newOrder.date)
                        },
                          object: {
                          stringValue: newOrder.object
                        },
                          refClient: {
                          referenceValue: newOrder.refClient
                        },
                          details: {
                            arrayValue: {
                              values: newOrder.details.map(detail => ({
                                mapValue: {
                                  fields: {
                                    qte: {
                                      integerValue: detail.qte
                                    },
                                    refArticle: {
                                      referenceValue: detail.refArticle
                                    }
                                  }
                                }
                              }))
                          }
                        }
                        }
                      }
                    await axios.post('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/orders', newOrderDoc).then(res => res.data).then(data => {
                      const allOrders = [...orders]
                      allOrders.push(newOrderDoc)
                      setOrders(allOrders)
                      setNewOrder({ orderId: '', inc: 0, date: '', details: [], refClient: '', object: '' })
                      hideModal()
                    }).catch(error => alert(error))
                  }}
                >
                  + Add
                </button>
              </div>
            </Modal.Body>
          </Modal>
        )} 
      </Stack>

      <Card>
        <OrderTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrderTableHead
                order={order}
                orderBy={orderBy}
                rowCount={orders.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'order', label: 'Order' },
                  { id: 'date', label: 'Date' },
                  { id: 'refClient', label: 'Reference Client' },
                  { id: 'object', label: 'Object' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <OrderTableRow
                      key={index}
                      date={row.fields.date.timestampValue}
                      orderId={row.fields.orderId.stringValue}
                      refClient={row.fields.refClient.referenceValue.split('/')[6]}
                      object={row.fields.object.stringValue}
                      selected={selected.indexOf(row.fields.orderId.stringValue) !== -1}
                      handleClick={(event) => handleClick(event, row.fields.orderId.stringValue)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, orders.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
