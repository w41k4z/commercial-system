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
import TableEmptyRows from '../table-empty-rows';
import ProductTableRow from '../product-table-row';
import ProductTableHead from '../product-table-head';
import ProductTableToolbar from '../product-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/articles').then(res => res.data).then(data => {
      console.log(data)
      setProducts(data.documents);
    })
  }, [])

  const [newArticle, setNewArticle] = useState({id: '', designation: '', brand: '', description: '', unitPrice: 0, remaining: 0})

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
      const newSelecteds = products.map((n) => n.fields.designation.stringValue);
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
    inputData: products,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Articles</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setModalVisibility(true)}>
          New Article
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
                <input type='text' className='form-control' defaultValue={newArticle.id} onChange={e => setNewArticle({...newArticle, id: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Designation
                </label>
                  <input type='text' className='form-control' defaultValue={newArticle.designation} onChange={e => setNewArticle({...newArticle, designation: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Brand
                </label>
                  <input type='text' className='form-control' defaultValue={newArticle.brand} onChange={e => setNewArticle({...newArticle, brand: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Description
                </label>
                  <input type='text' className='form-control' defaultValue={newArticle.description} onChange={e => setNewArticle({...newArticle, description: e.target.value})} />
              </div>
              <div className="mb-3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor='article'>
                  Unit price
                </label>
                  <input type='number' className='form-control' defaultValue={newArticle.unitPrice} onChange={e => setNewArticle({...newArticle, unitPrice: e.target.value})} />
              </div>
              <div className="d-flex justify-content-end">
              <button
                  type='button'
                  className="btn btn-primary"
                  onClick={async (event) => {
                    const newArticleDoc = {
                        fields: {
                          id: {
                          stringValue: newArticle.id
                        },
                          designation: {
                          stringValue: newArticle.designation
                        },
                          brand: {
                          stringValue: newArticle.brand
                        },
                          description: {
                          stringValue: newArticle.description
                        },
                          unitPrice: {
                          integerValue: newArticle.unitPrice
                        },
                          remaining: {
                          integerValue: newArticle.remaining
                        }
                        }
                      }
                    await axios.post('https://firestore.googleapis.com/v1/projects/supplier-proforma/databases/(default)/documents/articles', newArticleDoc).then(res => res.data).then(data => {
                      const allProducts = [...products]
                      allProducts.push(newArticleDoc)
                      setProducts(allProducts)
                      setNewArticle({id: '', designation: '', brand: '', description: '', unitPrice: 0, remaining: 0})
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
        <ProductTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductTableHead
                order={order}
                orderBy={orderBy}
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'designation', label: 'Designation' },
                  { id: 'brand', label: 'Brand' },
                  { id: 'unitPrice', label: 'Unit Price' },
                  { id: 'remaining', label: 'Remaining' },
                  { id: 'description', label: 'Description' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <ProductTableRow
                      key={index}
                      designation={row.fields.designation.stringValue}
                      brand={row.fields.brand.stringValue}
                      unitPrice={row.fields.unitPrice.integerValue}
                      remaining={row.fields.remaining.integerValue}
                      description={row.fields.description.stringValue}
                      selected={selected.indexOf(row.fields.designation.stringValue) !== -1}
                      handleClick={(event) => handleClick(event, row.fields.designation.stringValue)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, products.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
