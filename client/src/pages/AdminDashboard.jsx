import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar.jsx";
import "@fontsource/outfit";
import ClipLoader from "react-spinners/ClipLoader";

function UsersDetails() {
    const [data, setData] = useState({ users: [], total: 0 });
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/api/admin/getallusers?page=${page + 1}&limit=${rowsPerPage}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                setData({
                    users: res.data.users || [],
                    total: res.data.total || 0,
                });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching users:", err);
            });
    };

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8000/api/admin/deleteuser/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then(() => {
                        Swal.fire("Deleted!", "User deleted successfully", "success");
                        fetchData();
                    })
                    .catch((err) => {
                        console.error("Error deleting user:", err.response ? err.response.data : err);
                        Swal.fire("Error", "Failed to delete the user", "error");
                    });
            }
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                p: 3,
                minHeight: "100vh",
            }}
        >
            <Sidebar />
            <Box
                component="main"
                sx={{
                    marginTop: "30px",
                }}
            >
                {!loading ? (
                    <Paper
                        sx={{
                            minWidth: "76vw",
                            overflow: "hidden",
                            marginTop: "80px",
                            marginBottom: "50px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                            borderRadius: "12px",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                align="left"
                                gutterBottom
                                sx={{ fontWeight: "bold", marginLeft: "20px", marginTop: "20px", fontFamily: "outfit" }}
                            >
                                Details of the Users:
                            </Typography>
                        </Box>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontFamily: "outfit" }}>
                                            ID
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontFamily: "outfit" }}>
                                            Name
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontFamily: "outfit" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontFamily: "outfit" }}>
                                            Role
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", fontFamily: "outfit" }}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.users.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="center" sx={{ fontFamily: "outfit" }}>{row.id}</TableCell>
                                            <TableCell align="center" sx={{ fontFamily: "outfit" }}>{row.name}</TableCell>
                                            <TableCell align="center" sx={{ fontFamily: "outfit" }}>{row.email}</TableCell>
                                            <TableCell align="center" sx={{ fontFamily: "outfit" }}>{row.role}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => navigate(`/update-user/${row._id}`)}
                                                    sx={{ fontFamily: "outfit" }}
                                                >
                                                    Edit
                                                </Button>{" "}
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(row._id)}
                                                    sx={{ fontFamily: "outfit" }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 50]}
                            component="div"
                            count={data.total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "82vw",
                            height: "70vh",
                        }}
                    >
                        <ClipLoader
                            color={"#ffffff"}
                            loading={loading}
                            cssOverride={{
                                display: "block",
                                margin: "0 auto",
                                borderColor: "red",
                            }}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default UsersDetails;
