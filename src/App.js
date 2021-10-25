import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltipshow from './tooltipshow';
import {
  Alert,
  Button,
  Snackbar,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from 'react-loader-spinner';
import { Add } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);
  const [rowspage, setrowspage] = useState(5);
  const [snackopen, setsnackopen] = useState(false);
  const [message, setmessage] = useState('');
  const [messagetype, setmessagetype] = useState('success');
  const [dialogopen, setdialogopen] = useState(false);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [updatestatus, setupdatestatus] = useState(false);
  const [deletestatus, setdeletestatus] = useState(false);
  const [userid, setuserid] = useState();
  const userperpage = (u) => {
    axios
      .get('https://reqres.in/api/users?per_page=' + u)
      .then((response) => {
        if (response.status === 200) {
          setloading(true);
          setTimeout(() => {
            setloading(false);
          }, 1000);
          setUsers(response.data.data);
        }
      })
      .catch((err) => {});
  };

  const adduserfn = () => {
    axios
      .post('https://reqres.in/api/users', {
        first_name: firstname,
        last_name: lastname,
      })
      .then((res) => {
        if (res.status === 201) {
          handleopenclose();
          setloading(true);
          setTimeout(() => {
            setloading(false);
          }, 1000);
          setsnackopen(true);
          setmessage('User added successfully');
          setmessagetype('success');
          setTimeout(() => {
            setsnackopen(false);
          }, 2000);
        }
      });
  };
  const updateuserfn = () => {
    axios
      .put('https://reqres.in/api/users/' + userid, {
        first_name: firstname,
        last_name: lastname,
      })
      .then((res) => {
        if (res.status === 200) {
          handleopenclose();
          setloading(true);
          setTimeout(() => {
            setloading(false);
          }, 1000);
          setsnackopen(true);
          setmessage('Record updated successfully');
          setmessagetype('success');
          setTimeout(() => {
            setsnackopen(false);
          }, 2000);
        }
      });
  };
  const deleteuserfn = () => {
    axios.patch('https://reqres.in/api/users/' + userid).then((res) => {
      if (res.status === 200) {
        handleopenclose();
        setloading(true);
        setTimeout(() => {
          setloading(false);
        }, 1000);
        setsnackopen(true);
        setmessage('Record deleted successfully');
        setmessagetype('error');
        setTimeout(() => {
          setsnackopen(false);
        }, 2000);
      }
    });
  };
  const handleopenclose = () => {
    setdialogopen(false);
    setfirstname('');
    setlastname('');
    setupdatestatus(false);
    setdeletestatus(false);
    setuserid(null);
  };
  useEffect(() => {
    userperpage(5);
  }, []);
  const rows = users;

  return (
    <>
      <Snackbar
        open={snackopen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose
      >
        <Alert severity={messagetype}>{message}</Alert>
      </Snackbar>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{ marginBottom: 10, marginTop: 5 }}
          onClick={() => setdialogopen(!dialogopen)}
        >
          <Add />
          Add User
        </Button>
      </div>
      <Dialog
        open={dialogopen}
        onClose={handleopenclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {updatestatus ? 'Update ' : deletestatus ? 'Delete ' : 'Add'} User
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deletestatus ? (
              <Typography>
                Are you sure you want to delete this record?
              </Typography>
            ) : (
              <>
                <Typography>
                  First Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  autoFocus
                  fullWidth
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                />
                <Typography>
                  Last Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={handleopenclose}>Cancel</Button>
          <Button
            onClick={
              updatestatus
                ? updateuserfn
                : deletestatus
                ? deleteuserfn
                : adduserfn
            }
            disabled={deletestatus ? false : !firstname || !lastname}
          >
            {updatestatus ? 'Update' : deletestatus ? 'Delete' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Email Id</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableCell colSpan={7} align="center">
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
              </TableCell>
            ) : (
              rows.map((row) => (
                <Tooltipshow
                  row={row}
                  setuserid={setuserid}
                  setupdatestatus={setupdatestatus}
                  setdialogopen={setdialogopen}
                  setfirstname={setfirstname}
                  setlastname={setlastname}
                  setdeletestatus={setdeletestatus}
                />
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                count={users.length}
                rowsPerPage={rowspage}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onRowsPerPageChange={(e) => {
                  setrowspage(e.target.value);
                  userperpage(e.target.value);
                }}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
