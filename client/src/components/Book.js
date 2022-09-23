import React, { useState } from "react";
import { QUERY_BOOKS } from "../gql/gql";
import { useQuery } from "@apollo/client";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
const Book = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_BOOKS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log(data);
  return (
    <div style={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>書名</TableCell>
              <TableCell>作者</TableCell>
              <TableCell>出版社</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.books.books.map((book) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={book.id}>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.authorAndPublish.authorName}</TableCell>
                <TableCell>{book.authorAndPublish.publishName}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Book;
