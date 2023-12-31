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
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [clients, setClients] = useState([]);
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/clients').then(res => res.data).then(data => {
      console.log(data);
      setClients(data.documents);
    })
  }, [])

  const [newClient, setNewClient] = useState({id: '', name: '', firstName: '', email: '', contact: ''})

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
      const newSelecteds = clients.map((n) => n.fields.name.stringValue);
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
    inputData: clients,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Clients</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setModalVisibility(true)}>
          New Client
        </Button>
        {modalVisibility && (
          <Modal show onHide={hideModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>id</label>
                <input type='text' className='form-control' defaultValue={newClient.id} onChange={e => setNewClient({...newClient, id: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Name
                </label>
                  <input type='text' className='form-control' defaultValue={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  First name
                </label>
                  <input type='text' className='form-control' defaultValue={newClient.firstName} onChange={e => setNewClient({...newClient, firstName: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Email
                </label>
                  <input type='email' className='form-control' defaultValue={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Contact
                </label>
                  <input type='contact' className='form-control' defaultValue={newClient.contact} onChange={e => setNewClient({...newClient, contact: e.target.value})} />
              </div>
              <div className="d-flex justify-content-end">
              <button
                  type='button'
                  className="btn btn-primary"
                  onClick={async (event) => {
                    const newClientDoc = {
                        fields: {
                          id: {
                          stringValue: newClient.id
                        },
                          name: {
                          stringValue: newClient.name
                        },
                          firstName: {
                          stringValue: newClient.firstName
                        },
                          email: {
                          stringValue: newClient.email
                        },
                          contact: {
                          stringValue: newClient.contact
                        }
                        }
                      }
                    await axios.post('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/clients', newClientDoc).then(res => res.data).then(data => {
                      const allClients = [...clients]
                      allClients.push(newClientDoc)
                      setClients(allClients)
                      setNewClient({id: '', name: '', firstName: '', email: '', contact: ''})
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
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={clients.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'firstName', label: 'First name' },
                  { id: 'email', label: 'Email' },
                  { id: 'contact', label: 'Contact' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <UserTableRow
                      key={index}
                      name={row.fields.name.stringValue}
                      firstName={row.fields.firstName.stringValue}
                      email={row.fields.email.stringValue}
                      contact={row.fields.contact.stringValue}
                      selected={selected.indexOf(row.fields.name.stringValue) !== -1}
                      handleClick={(event) => handleClick(event, row.fields.name.stringValue)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, clients.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
