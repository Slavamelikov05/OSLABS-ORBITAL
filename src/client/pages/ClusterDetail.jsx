import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Card, CardContent, TextField } from "@mui/material";
import axios from "axios";
import ClusterOverview from "../components/ClusterOverview";
import SchemaIcon from "@mui/icons-material/Schema";
import LogoutButton from "../components/LogoutButton";
import AddIcon from "@mui/icons-material/Add";
import "../components/drawercss.css";
import CpuMetrics from "../components/CpuMetrics";
import BytesMetrics from "../components/BytesMetrics";
import RamMetrics from "../components/RamMetrics";
import NetworkMetrics from "../components/NetworkMetrics";
import { useParams } from "react-router-dom";
import ClusterDynamicDetails from "../components/ClusterDynamicDetails";
import { useNavigate } from "react-router-dom";

const drawerWidth = 100;

const styles = {
    paper: {
        backgroundColor: "black", // Change this to the color you want
    },
    card: {
        backgroundColor: "white",
        borderRadius: "8px",
        width: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "16px",
    },
    input: {
        marginBottom: "16px",
    },
    submitButton: {
        marginTop: "16px",
        marginBottom: "8px",
        backgroundColor: "#227BA5",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#1D6490",
        },
    },
    signupLink: {
        color: "##227BA5",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
        cursor: "pointer",
    },
};
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: "#484995",
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    backgroundColor: "#444444",
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: "#444444",
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundColor: "#444444",
}));

export default function PersistentDrawerLeft({ user }) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [clusterName, setClusterName] = useState("");
    const [brokers, setBrokers] = useState("");
    const [currentCluster, setCurrentCluster] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userClusters, setUserClusters] = useState([]);
    const [updatingCluster, setUpdatingCluster] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [metrics, setMetrics] = useState(0);
    const [currentTab, setCurrentTab] = useState("overview");
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    const handleClose = () => {
        setShowModal(false);
    };
    const handleOpen = () => {
        setShowModal(true);
    };

    // Get array of clusters based on userID

    return (
        <Box
            sx={{
                display: "flex",
                boxSizing: "border-box",
                fontWeight: "bold",
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{ borderBottom: "1px solid black" }}
            >
                <Toolbar>
                    <Typography
                        sx={{ m: "auto", textAlign: "right" }}
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        {currentTab[0].toUpperCase() + currentTab.slice(1)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className="custom-Drawer"
                sx={{
                    width: drawerWidth,
                    height: "100vh",
                    backgroundColor: "black",
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader
                    sx={{
                        // background color for top left Orbital text
                        backgroundColor: "#444444",
                        p: 2,
                    }}
                >
                    <Button onClick={() => navigate("/home")}>Home</Button>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        textAlign="center"
                        color="white"
                        margin="auto"
                        fontWeight="bold"
                    >
                        {"Orbital"}
                    </Typography>
                </DrawerHeader>
                <Divider sx={{ backgroundColor: "black" }} />

                <Divider sx={{ backgroundColor: "black" }} />
                <List
                    sx={{ backgroundColor: "#484995", p: 3, height: "100vh" }}
                >
                    <ListItem
                        disablePadding
                        sx={{
                            backgroundColor: "#484995",
                            color: "white",
                        }}
                    >
                        <ListItemButton
                            onClick={() => setCurrentTab("overview")}
                        >
                            <ListItemIcon></ListItemIcon>
                            <Typography
                                variant="h6"
                                component="div"
                                color="white"
                                fontWeight={500}
                            >
                                Overview
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ borderColor: "white" }} />
                    <ListItem
                        disablePadding
                        sx={{
                            backgroundColor: "#484995",
                            color: "white",
                        }}
                    >
                        <ListItemButton onClick={() => setCurrentTab("health")}>
                            <ListItemIcon></ListItemIcon>
                            <Typography
                                variant="h6"
                                component="div"
                                color="white"
                                fontWeight={500}
                            >
                                Health Metrics
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ borderColor: "white" }} />
                    <ListItem
                        disablePadding
                        sx={{
                            backgroundColor: "#484995",
                            color: "white",
                        }}
                    >
                        <ListItemButton onClick={() => setCurrentTab("broker")}>
                            <ListItemIcon></ListItemIcon>
                            <Typography
                                variant="h6"
                                component="div"
                                color="white"
                                fontWeight={500}
                            >
                                Broker Metrics
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ borderColor: "white" }} />
                    <ListItem
                        disablePadding
                        sx={{
                            backgroundColor: "#484995",
                            color: "white",
                        }}
                    >
                        <ListItemButton onClick={() => setCurrentTab("topic")}>
                            <ListItemIcon></ListItemIcon>
                            <Typography
                                variant="h6"
                                component="div"
                                color="white"
                                fontWeight={500}
                            >
                                Topic Metrics
                            </Typography>
                        </ListItemButton>
                    </ListItem>

                    <LogoutButton />
                </List>
            </Drawer>
            <Main open={open}>
                <ClusterDynamicDetails
                    currentTab={currentTab}
                    setMetrics={setMetrics}
                    setIntervalId={setIntervalId}
                />
            </Main>
        </Box>
    );
}
