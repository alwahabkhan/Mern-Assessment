import * as React from "react";
import { Typography, Button, TextField, FormGroup, Box, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx"
import "@fontsource/outfit";

function UsersDetails() {
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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(data)
            await axios.post("http://localhost:8000/api/user/register", data)
                .then((res) => {
                    console.log(res);
                    if (res.data.success === true) {
                        localStorage.setItem("token", res.data.token);
                        navigate("/admin-dashboard")
                    } else {
                        console.log("Error: ", res.data.message);
                    }
                });
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
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: "82vw",
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
                                Add New User
                            </Typography>
                            <Box sx={{
                                display: "flex"
                            }}>

                                <FormGroup className="mb-4" sx={{
                                    marginRight: "10px",

                                    width: '100%'
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
                                    marginLeft: "10px",
                                    width: '100%'
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

                            {/* <Box sx={{
                            display: "flex"
                        }}> */}

                            <FormGroup className="mb-4" sx={{
                                // marginRight: "10px"
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
                            {/* <FormGroup className="mb-4" sx={{
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

                            </FormGroup> */}
                            {/* </Box> */}

                            <Box sx={{
                                display: "flex"
                            }}>

                                <FormGroup className="mb-4" sx={{
                                    marginRight: "10px",
                                    width: '100%'
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
                                    marginLeft: "10px",
                                    width: '100%'
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
                            <Box className="mb-4" sx={{
                                display: "flex"
                            }}>
                                <FormGroup sx={{
                                    marginRight: "10px",
                                    width: '100%'
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
                                <FormGroup sx={{
                                    marginLeft: "10px",
                                    width: '100%'
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

                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: "100%",
                                    fontFamily: "outfit",
                                }}
                            >
                                Add user
                            </Button>

                        </form>
                    </div>
                </Box>

            </Box>
        </Box>
    );
}

export default UsersDetails;
