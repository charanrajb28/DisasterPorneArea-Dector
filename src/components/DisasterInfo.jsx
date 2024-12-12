import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import {
  Terrain as EarthquakeIcon,
  Waves as FloodIcon,
  Cloud as HurricaneIcon,
} from "@mui/icons-material";
import axios from "axios";

const DisasterInfo = ({ location }) => {
  const [earthquakeInfo, setEarthquakeInfo] = useState(null);
  const [hurricaneInfo, setHurricaneInfo] = useState(null);
  const [floodInfo, setFloodInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [safetyStatus, setSafetyStatus] = useState("Safe");

  const disasters = [
    {
      name: "Earthquake",
      icon: <EarthquakeIcon fontSize="large" color="secondary" />, 
      color: "#9C27B0",
      safety: earthquakeInfo?.magnitude ? `Magnitude: ${earthquakeInfo.magnitude}` : "Variable Risk",
      details: earthquakeInfo?.details || "Risk depends on tectonic activity. Secure heavy objects and know safe spots.",
    },
    {
      name: "Hurricane",
      icon: <HurricaneIcon fontSize="large" color="primary" />, 
      color: "#03A9F4",
      safety: hurricaneInfo?.risk || "Low Risk",
      details: hurricaneInfo?.details || "No active hurricane alerts in your region.",
    },
    {
      name: "Flood",
      icon: <FloodIcon fontSize="large" color="error" />, 
      color: "#FF5722",
      safety: floodInfo ? "High Risk" : "Low Risk",
      details: floodInfo?.details || "Flooding can occur near rivers or coastal areas. Avoid flood-prone areas.",
    },
  ];

  const analyzeSafety = () => {
    let riskLevel = "Safe";
    if (earthquakeInfo?.magnitude >= 6 || hurricaneInfo?.risk === "High Risk" || floodInfo) {
      riskLevel = "High Risk";
    }
    setSafetyStatus(riskLevel);
  };

  useEffect(() => {
    const fetchDisasterData = async () => {
      if (!location || location.length !== 2) return;

      setLoading(true);
      setError(null);

      const [lat, lng] = location;

      try {
        // Fetch Earthquake Data
        const earthquakeResponse = await axios.get(
          `https://secure.geonames.org/earthquakesJSON?north=${lat + 1}&south=${lat - 1}&east=${lng + 1}&west=${lng - 1}&username=charan2828`
        );

        const earthquakeData = earthquakeResponse.data.earthquakes?.[0];
        setEarthquakeInfo(
          earthquakeData
            ? {
                magnitude: earthquakeData.magnitude,
                details: `Recent earthquake of magnitude ${earthquakeData.magnitude} at depth ${earthquakeData.depth} km.`,
              }
            : null
        );

        // Fetch Hurricane Data
        const hurricaneResponse = await axios.get(
          `https://api.weather.gov/alerts/active?status=actual&message_type=alert&event=Hurricane&point=${lat},${lng}`
        );

        const hurricaneAlerts = hurricaneResponse.data.features;
        setHurricaneInfo(
          hurricaneAlerts.length > 0
            ? { risk: "High Risk", details: "Active hurricane alert in your region." }
            : { risk: "Low Risk", details: "No active hurricane alerts in your region." }
        );

        // Fetch Flood Data
        const floodResponse = await axios.get(
          `https://api.weather.gov/alerts/active?status=actual&message_type=alert&event=Flood&point=${lat},${lng}`
        );

        setFloodInfo(
          floodResponse.data.features.length > 0
            ? { details: "Flood alert issued for your region." }
            : null
        );

        analyzeSafety();
        setLoading(false);
      } catch (err) {
        console.error("Error fetching disaster data:", err);
        setError("Error fetching disaster data. Please try again later.");
        setLoading(false);
        setHurricaneInfo({ risk: "Low Risk", details: "No active hurricane alerts in your region." }); // Default on error
      }
    };

    fetchDisasterData();
  }, [location]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
        Disaster Risk Information
      </Typography>

      {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <>
          <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
            Safety Status: {safetyStatus}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {disasters.map((disaster, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    backgroundColor: disaster.color,
                    color: "#fff",
                    width: 200,
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    {disaster.icon}
                    <Typography variant="h6" sx={{ marginTop: 1 }}>
                      {disaster.name}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Safety: {disaster.safety}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {disaster.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default DisasterInfo;
