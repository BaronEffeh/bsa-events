import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        py: { xs: 1, sm: 2 }, // Reduce vertical padding on small screens
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 48, sm: 64 }, // Reduce toolbar height on small screens
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            mt={1}
            sx={{
              fontSize: { xs: "1.25rem", sm: "2rem" }, // Smaller font on small screens
            }}
          >
            Britarch Schools, Abuja
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" }, // Adjust font size responsively
            }}
          >
            7th Graduation & Award Ceremony
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "0.75rem", sm: "1rem" },
            }}
          >
            August 9, 2025 | Programme Schedule
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
