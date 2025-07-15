import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky" color="primary" mt="-2">
      <Toolbar>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h4" component="div" gutterBottom mt={3}>
            Britarch Schools, Abuja
          </Typography>
          <Typography variant="h5">7th Graduation & Award Ceremony</Typography>
          <Typography variant="subtitle1">
            August 9, 2025 | Programme Schedule
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
