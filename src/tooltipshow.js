import React, { useState } from 'react';
import { Avatar, ClickAwayListener } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import TableRow from '@mui/material/TableRow';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Tooltipshow = (props) => {
  const { row } = props;
  const [open, setopen] = useState(false);
  return (
    <StyledTableRow key={row.id}>
      <StyledTableCell component="th" scope="row">
        <Avatar src={row.avatar} alt="avatar" />
      </StyledTableCell>
      <StyledTableCell align="center">{row.id}</StyledTableCell>
      <StyledTableCell align="center">{row.email}</StyledTableCell>
      <StyledTableCell align="center">{row.first_name}</StyledTableCell>
      <StyledTableCell align="center">{row.last_name}</StyledTableCell>
      <StyledTableCell align="right">
        <ClickAwayListener onClickAway={() => setopen(false)}>
          <Tooltip
            open={open}
            arrow
            title={
              <List>
                <ListItem
                  button
                  onClick={() => {
                    props.setdialogopen(true);
                    props.setfirstname(row.first_name);
                    props.setlastname(row.last_name);
                    props.setupdatestatus(true);
                    props.setuserid(row.id);
                  }}
                >
                  Update
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    props.setdialogopen(true);
                    props.setdeletestatus(true);
                    props.setuserid(row.id);
                  }}
                >
                  Delete
                </ListItem>
              </List>
            }
          >
            <Button onClick={() => setopen(!open)}>Action</Button>
          </Tooltip>
        </ClickAwayListener>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default Tooltipshow;
