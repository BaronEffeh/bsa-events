import React from "react";
import { Typography, Box } from "@mui/material";

const About = () => (
  <Box sx={{ py: 5, textAlign: "center" }}>
    <Typography variant="h5" gutterBottom>
      About the Event
    </Typography>
    <Typography variant="body1">
      Join us for a day of inspiring talks, networking opportunities, and breakthrough innovations in tech, education, and business.
    </Typography>
  </Box>
);

export default About;
