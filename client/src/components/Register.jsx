import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, TextField, FormGroup, Box, } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fontsource/outfit";

function Register() {
    const [data, setData] = useState({
        id: "",
        name: "",
        email: "",
        addresses: [{
            addressline1: "",
            addressline2: "",
            city: "",
            state: "",
            country: "",
        }],
        role: "",
        phone: "",
    });
    const [secretKey, setSecretKey] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.role === "Admin" && secretKey !== "alwahabkhan") {
            alert("Invalid Secret Key for Admin!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/register", data)
                .then((res) => {
                    console.log(res);
                    if (res.data.success === true) {
                        navigate("/login");
                        localStorage.setItem("token", response.data.token);
                    } else {
                        console.log("Error: ", res.data.message);
                    }
                });
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === "addressline1" || name === "addressline2" || name === "city" || name === "state" || name === "country") {
            setData((prevData) => {
                const updatedAddresses = [...prevData.addresses];
                updatedAddresses[0] = {
                    ...updatedAddresses[0],
                    [name]: value,
                };
                return { ...prevData, addresses: updatedAddresses };
            });
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };




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
                    maxWidth: "550px",
                    maxHeight: "680px",
                    marginTop: "20px",
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
                            Registeration Form
                        </Typography>
                        <Box sx={{
                            display: "flex"
                        }}>

                            <FormGroup className="mb-4" sx={{
                                marginRight: "10px"
                            }}>
                                <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    ID
                                </Typography>
                                <TextField
                                    type="text"
                                    name='id'
                                    placeholder="Enter your Id"
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
                            <FormGroup className="mb-4" sx={{
                                marginLeft: "10px"
                            }}>
                                <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    Name
                                </Typography>
                                <TextField
                                    type="text"
                                    name='name'
                                    placeholder="Enter Name"
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
                        </Box>

                        <Box sx={{
                            display: "flex"
                        }}>

                            <FormGroup className="mb-4" sx={{
                                marginRight: "10px"
                            }}>
                                <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
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
                            <FormGroup className="mb-4" sx={{
                                marginLeft: "10px"
                            }}>
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
                        </Box>

                        <Box sx={{
                            display: "flex"
                        }}>

                            <FormGroup className="mb-4" sx={{
                                marginRight: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    Address Line 1
                                </Typography>
                                <TextField
                                    type="text"
                                    name='addressline1'
                                    value={data.addresses[0]?.addressline1 || ''}
                                    placeholder="Enter Address Line 1"
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
                            <FormGroup className="mb-4" sx={{
                                marginLeft: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    Address Line 2
                                </Typography>
                                <TextField
                                    type="text"
                                    name='addressline2'
                                    value={data.addresses[0]?.addressline2 || ''}
                                    placeholder="Enter Address Line 2"
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
                        </Box>
                        <Box sx={{
                            display: "flex"
                        }}>
                            <FormGroup className="mb-4" sx={{
                                marginRight: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    City
                                </Typography>
                                <TextField
                                    type="text"
                                    name='city'
                                    value={data.addresses[0]?.city || ''}
                                    placeholder="Enter City"
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
                            <FormGroup className="mb-4" sx={{
                                marginX: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    State
                                </Typography>
                                <TextField
                                    type="text"
                                    name='state'
                                    value={data.addresses[0]?.state || ''}
                                    placeholder="Enter State"
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
                            <FormGroup className="mb-4" sx={{
                                marginLeft: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    Country
                                </Typography>
                                <TextField
                                    type="text"
                                    name='country'
                                    value={data.addresses[0]?.country || ''}
                                    placeholder="Enter Country"
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
                        </Box>
                        <Box sx={{
                            display: "flex"
                        }}>
                            <FormGroup className="mb-4" sx={{
                                marginRight: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    Role
                                </Typography>
                                <TextField
                                    type="text"
                                    name='role'
                                    placeholder="Enter Role"
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
                            <FormGroup className="mb-4" sx={{
                                marginLeft: "10px"
                            }}>
                                <Typography style={{ fontSize: "14px", color: "#555", fontFamily: "outfit", }}>
                                    Phone Number
                                </Typography>
                                <TextField
                                    type="Number"
                                    name='phone'
                                    placeholder="Enter Phone Number"
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
                        </Box>
                        {data.role === "Admin" && (
                            <FormGroup sx={{ marginBottom: "10px" }}>
                                <Typography
                                    style={{
                                        fontSize: "14px",
                                        color: "#555",
                                        fontFamily: "outfit",
                                    }}
                                >
                                    Secret Key
                                </Typography>
                                <TextField
                                    type="text"
                                    name="secretKey"
                                    placeholder="Enter Secret Key"
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    size="small"
                                    sx={{
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
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                width: "100%",
                                fontFamily: "outfit",
                            }}
                        >
                            Register
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
                                Do You have an account?
                            </p>
                            <Button
                                onClick={() => navigate("/login")}
                                type="button"
                                variant="outlined"
                                sx={{
                                    fontFamily: "outfit",
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default Register
