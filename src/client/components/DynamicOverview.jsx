import { Box, Paper, Card, Typography } from "@mui/material";
import Chart from "chart.js";
import CpuMetrics from "./CpuMetrics";
import RamMetrics from "./RamMetrics";
import NetworkMetrics from "./NetworkMetrics";
import BytesMetrics from "./BytesMetrics";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    margin: "auto",
    height: "100%",
};

const chartsContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "16px",

    width: "80%",
    height: "80%",
    margin: "auto",
    marginTop: "50px",
};

const chartStyle = {
    width: "40%",
    height: "300px",
    marginBottom: "16px",
};

const metricsBoxStyle = {
    flex: 1,
    padding: "5px",
    width: "80%",
    margin: "auto",
};

const DynamicOverview = () => {
    return (
        <Box style={containerStyle}>
            <Box style={chartsContainerStyle}>
                <Box style={chartStyle}>
                    <BytesMetrics />
                </Box>
                <Box style={chartStyle}>
                    <RamMetrics />
                </Box>
                <Box style={chartStyle}>
                    <NetworkMetrics />
                </Box>
                <Box style={chartStyle}>
                    <CpuMetrics />
                </Box>
            </Box>
            <Box style={metricsBoxStyle}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        boxShadow: `3px 3px 3px rgba(0, 0, 0, 0.5)`,
                    }}
                >
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">CPU</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            10%
                        </Typography>
                    </Card>
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Ping</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            30ms
                        </Typography>
                    </Card>
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Brokers</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            2
                        </Typography>
                    </Card>
                    <Card sx={{ border: "none", boxShadow: "none" }}>
                        <Typography variant="h5">Topics</Typography>
                        <Typography variant="h5" sx={{ textAlign: "center" }}>
                            3
                        </Typography>
                    </Card>
                </Paper>
            </Box>
        </Box>
    );
};

export default DynamicOverview;
