import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import UserMoreMenu from "./usersActive/components/UserMoreMenu";
import UserListToolbar from "./usersActive/components/UserListToolbar";
import { TablePagination } from "@mui/material";
import { Card } from "@mui/material";

import axios from "axios";
import axiosClient from "../../axiosClient";
import { useEffect } from "react";
export default function Users() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [quantityUser, setquantityUser] = useState(null);
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function FetchUser() {
      try {
        const response = await axiosClient.get("/account-users");
        //userList.map(setUserList);
        setUserList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    FetchUser();
  }, []);
  console.log(userList);
  return (
    <div>
      {/* <div>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined">Outlined</Button>
      </div> */}
      <Card sx={{ mt: 5 }}>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">FirstName</TableCell>
                <TableCell align="right">LastName</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.Username}
                    </TableCell>
                    <TableCell align="right">{user.FirstName}</TableCell>
                    <TableCell align="right">{user.LastName}</TableCell>
                    <TableCell align="right">{user.Email}</TableCell>
                    <TableCell align="right">{user.Status}</TableCell>
                    <TableCell align="right">
                      <UserMoreMenu UserDetail={user} key={user.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ mt: 2 }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={25}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </Card>
    </div>
  );
}
