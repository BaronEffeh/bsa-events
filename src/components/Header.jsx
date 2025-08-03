import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      // color="warning"
      sx={{
        backgroundColor: "#bca04dff",
        py: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 48, sm: 64 },
        }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            mt={1}
            sx={{
              fontSize: { xs: "1.25rem", sm: "2rem" },
            }}
          >
            Britarch Schools, Abuja
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" },
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
