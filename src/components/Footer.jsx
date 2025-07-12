import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    sx={{
      py: 3,
      backgroundColor: "#f5f5f5",
      textAlign: "center",
      mt: 5,
    }}
  >
    <Typography variant="body1">
      Britarch Tech Team | <a href="tel:+2347012928822">+234 701 292 8822</a>
    </Typography>
    <Typography variant="caption" display="block" mt={1}>
      &copy; 2025 Britarch Schools Abuja
    </Typography>
  </Box>
);

export default Footer;
