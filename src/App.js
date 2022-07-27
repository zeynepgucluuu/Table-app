import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Fab } from '@mui/material';
import {useState,useEffect} from 'react';
import FormDialog from './Components/Create';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Grid from '@mui/material/Grid';



function App() {

  const url = 'https://62d6a0db49c87ff2af28c722.mockapi.io/api/products'
  const[tableData, setTableData] = useState([])
  const [formData, setFormData] = useState(" ")
  const [open, setOpen] = React.useState(false);

    const [rows, setRows] = useState(tableData);

    useEffect(() =>{
        fetch(url)
        .then((data)=>data.json()).then((data)=> setRows(data))

    }, [])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setFormData(" ")
    };
    const handleUpdate = (oldData) => {
      setFormData(oldData)
      handleClickOpen()
    }

    const handleFormSubmit = () => {
      if (formData.id) {
        //updating a user 
        const confirm = window.confirm("Are you sure, you want to update this row ?")
        confirm && fetch(url + `/${formData.id}`, {
          method: "PUT", body: JSON.stringify(formData), headers: {
            'content-type': "application/json"
          }
        }).then(resp => resp.json())
          .then(resp => {
            handleClose()
            fetch(url).then((data)=>data.json()).then((data)=> setRows(data))
  
          })
      } else {
        // adding new user
        fetch(url, {
          method: "POST", body: JSON.stringify(formData), headers: {
            'content-type': "application/json"
          }
        }).then(resp => resp.json())
          .then(resp => {
            handleClose()
            fetch(url).then((data)=>data.json()).then((data)=> setRows(data))
          })
      }
      
        
      
    }
    const onChange = (e) => {
      const { value, id } = e.target
      // console.log(value,id)
      setFormData({ ...formData, [id]: value })
    }
    const handleDelete = (id) => {
      const confirm = window.confirm("Are you sure, you want to delete this row", id)
      
      if (confirm) {
        fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json())
        .then(resp =>  fetch(url).then((data)=>data.json()).then((data)=> setRows(data)))
  
      }
    }


  return (
    <div className='App'>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Product</Button>
      </Grid>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" pageSize={10}>
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((tableData) => (
            <TableRow
              key={tableData.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {tableData.id}
              </TableCell>
              <TableCell align="left">{tableData.createdAt}</TableCell>
              <TableCell align="left">{tableData.name}</TableCell>
              <TableCell align="left">{tableData.price}$</TableCell>
              <TableCell align="left">{tableData.description}</TableCell>
              <TableCell>
              <Button variant="outlined" color="primary" onClick={() => handleUpdate(tableData)}>Update</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(tableData.id)}>Delete</Button>
              </TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
   
  );
}

export default App;
