import React, { useState } from "react";
import DisasterInfo from "./components/DisasterInfo";
import MapComponent from "./components/Map";
import { Container, Box, Typography, Paper } from "@mui/material";
import SearchBar from "./components/SearchBar";

function App() {
  const [location, setLocation] = useState([37.7749, -122.4194]); // Default to San Francisco

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", padding: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: 4,
        }}
      >
        Disaster-Prone Area Detection
      </Typography>

      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          backgroundColor: "#f3f6f9",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          <SearchBar setLocation={setLocation} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Map Component */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              height: "500px",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MapComponent location={location} />
          </Box>

          {/* DisasterInfo Component */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              padding: 3,
              borderRadius: 4,
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <DisasterInfo location={location} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
