import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
    const {id,createdAt,name,price,description}=data
   
     return (
       <div>
         <Dialog
           open={open}
           onClose={handleClose}
           aria-labelledby="alert-dialog-title"
           aria-describedby="alert-dialog-description"
         >
           <DialogTitle id="alert-dialog-title">{id?"Update user":"Create new user"}</DialogTitle>
           <DialogContent>
            <form>
                <TextField id="ID" value={id} onChange={e=>onChange(e)} placeholder="Enter ID" label="ID" variant="outlined" margin="dense" fullWidth />
                <TextField id="date" value={createdAt} onChange={e=>onChange(e)} placeholder="Enter date" label="Date" variant="outlined" margin="dense" fullWidth />
                <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter Name" label="Name" variant="outlined" margin="dense" fullWidth />
                <TextField id="price" value={price} onChange={e=>onChange(e)} placeholder="Enter Price" label="Price $" variant="outlined" margin="dense" fullWidth />
                <TextField id="desccription" value={description} onChange={e=>onChange(e)} placeholder="Enter Description" label="Description" variant="outlined" margin="dense" fullWidth />

            </form>
           </DialogContent>
           <DialogActions>
             <Button onClick={handleClose} color="secondary" variant="outlined">
               Cancel
             </Button>
             <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
               {id?"Update":"Submit"}
             </Button>
           </DialogActions>
         </Dialog>
       </div>
     );
   }