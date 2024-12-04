import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, TextField, FormGroup, } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fontsource/outfit";

function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/user/login",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",

                    },
                }
            );

            if (response.data.success) {
                console.log("Response:", response.data);
                const userRole = response.data.role;
                localStorage.setItem("token", response.data.token);
                if (userRole === "Admin") {
                    navigate("/admin-dashboard");
                } else if (userRole === "User") {
                    navigate("/user-dashboard");
                }
            } else {
                console.log("Error: ", response.data.message);
            }
        } catch (error) {
            console.log("Login Error: ", error.response?.data?.message || error.message);
        }
    };


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }))
    }

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <Grid
            component="main"
            sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >

            <Grid
                xs="6"
                sm="6"
                md="6"
                lg="6"
                sx={{
                    minWidth: "500px",
                    maxHeight: "430px",
                    marginTop: "120px",
                    padding: "40px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                }}
            >
                <div>
                    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                        <Typography
                            style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                color: "#176CC7",
                                textAlign: "center",
                                marginBottom: "20px",
                                fontFamily: "outfit",
                            }}
                        >
                            Login Form
                        </Typography>

                        <FormGroup className="mb-4">
                            <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                Email address
                            </Typography>
                            <TextField
                                type="email"
                                name='email'
                                placeholder="Enter email"
                                onChange={onChangeHandler}
                                size='small'
                                sx={{
                                    marginY: "10px",
                                    fontFamily: "outfit",
                                    "& .MuiInputBase-input": {
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "14px",
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "14px",
                                    },
                                }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                Password
                            </Typography>
                            <TextField
                                type="password"
                                name='password'
                                placeholder="Enter password"
                                onChange={onChangeHandler}
                                size='small'
                                sx={{
                                    marginY: "10px",
                                    fontFamily: "outfit",
                                    "& .MuiInputBase-input": {
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "14px",
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "14px",
                                    },
                                }}
                            />

                        </FormGroup>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                width: "100%",
                                fontFamily: "outfit",
                            }}
                        >
                            Login
                        </Button>


                        <div className="text-center">
                            <p
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "#666",
                                    fontFamily: "outfit",
                                }}
                            >
                                Don't have an account?
                            </p>
                            <Button
                                onClick={() => navigate("/register")}
                                type="button"
                                variant="outlined"
                                sx={{
                                    fontFamily: "outfit",
                                }}
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default Login
