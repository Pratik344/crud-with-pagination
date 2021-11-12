import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@mui/material/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { addUserData } from "../Services/Action/Action";
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    overflowX: "auto",
  },
  table: {
    minWidth: 1000,
  },
});

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [order, setOrder] = useState("ASC");
  const [value, setValue] = useState("");
  const filter = createFilterOptions();
  const state = useSelector((state) => state.profileName);

  const sorting = (col) => {
    if (order === "ASC") {
      const stored = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(stored);
      setOrder("DEC");
    }
    if (order === "DEC") {
      const stored = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(stored);
      setOrder("ASC");
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    console.log("page: ", page);
    fetch(`https://reqres.in/api/users?page=${page}`).then((result) => {
      result.json().then((resp) => {
        console.warn("result", resp);
        setData(resp.data);
        dispatch(addUserData(resp.data));
      });
    });
  };
  const deleteRow = (id) => {
    console.log("id: ", id);

    axios.delete(`https://reqres.in/api/users${id},`).then((res) => {
      console.log(res);
      // console.log(res.data);
      console.log("Delete Data: ", data);
      getList();
    });
  };
  const handlePageClick = (e, value) => {
    setPage(value);
    // console.log("value: ", value);
  };
  return (
    <div>
      <Paper className="">
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setValue({
                email: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                email: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, data) => {
            const filtered = filter(options, data);

            const { inputValue } = data;
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option.email
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                email: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={data}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === { value }) {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.email;
          }}
          renderOption={(props, option) => <li {...props}>{option.email}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(data) => (
            <TextField {...data} label="Free solo with text demo" />
          )}
        />
        <Table className="">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left" onClick={() => sorting("email")}>
                Email
              </TableCell>
              <TableCell align="left" onClick={() => sorting("first_name")}>
                First Name
              </TableCell>
              <TableCell align="left" onClick={() => sorting("last_name")}>
                Last Name
              </TableCell>
              <TableCell align="left" onClick={() => sorting("avatar")}>
                Avatar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow>
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left">{item.first_name}</TableCell>
                <TableCell align="left">{item.last_name}</TableCell>
                <TableCell align="left">
                  <img
                    style={{
                      height: 48,
                      width: 48,
                      border: "2px solid",
                      "border-radius": 50,
                    }}
                    src={item.avatar}
                  />
                </TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteRow(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          onChange={handlePageClick}
          onClick={getList}
          count={2}
        />
      </Paper>
    </div>
  );
}
export default withStyles(styles)(Home);
