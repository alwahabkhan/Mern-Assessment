import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "@fontsource/outfit";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/userDetails/getUserDetails`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error("Error fetching admin data:", err));
    }, [id]);

    if (!data)
        return (
            <Stack
                sx={{
                    marginTop: "250px",
                    marginLeft: "500px",
                }}
                spacing={2}
            >
                <Skeleton variant="rectangular" width={610} height={60} />
                <Skeleton variant="rounded" width={610} height={60} />
                <Skeleton variant="rectangular" width={610} height={60} />
                <Skeleton variant="rounded" width={610} height={60} />
            </Stack>
        );

    return (
        <Box
            component="main"
            sx={{

                flexGrow: 1,
                p: 3,
                minHeight: "100vh",
            }}
        >

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    justifyContent: "center",
                    marginTop: "100px",
                    marginBottom: "270px",
                    marginLeft: "200px",
                    marginRight: "200px",

                }}
            >
                <Box sx={{
                    display: "flex",
                    marginBottom: "30px",
                    justifyContent: "space-between"
                }}>

                    <Typography variant="h4" sx={{
                        fontFamily: "outfit",
                    }}>
                        User Dashboard
                    </Typography>
                    <Button variant="contained" color="error" onClick={() => navigate("/login")}>
                        Logout
                    </Button>
                </Box>
                <TableContainer component={Paper} sx={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    borderRadius: "12px",
                }}>
                    <Typography
                        variant="h5"
                        sx={{ marginLeft: "20px", marginTop: "16px", fontFamily: "outfit" }}
                    >
                        <strong>Details of User:</strong>
                    </Typography>
                    <Table sx={{ minWidth: 350 }} aria-label="admin details table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>
                                    <strong> Name</strong>
                                </TableCell>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>{data.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>
                                    <strong>Email</strong>
                                </TableCell>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>{data.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>
                                    <strong>Phone</strong>
                                </TableCell>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>{data.phone || "No phone found"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <strong>Role</strong>
                                </TableCell>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>{data.role}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left" sx={{ fontFamily: "outfit" }}>
                                    <strong>Addresses</strong>
                                </TableCell>
                                <TableCell align="left">
                                    {data.addresses && data.addresses.length > 0 ? (
                                        data.addresses.map((address, index) => (
                                            <Typography key={index} sx={{ fontFamily: "outfit" }}>
                                                {address.addressline1}, {address.addressline2}, {address.city}, {address.state}, {address.country}
                                            </Typography>
                                        ))
                                    ) : (
                                        "No addresses found"
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default UserDashboard;
