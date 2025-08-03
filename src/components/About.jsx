import React from "react";
import { Box } from "@mui/material";
import BSA7thGraduation from "../images/bsa-7th-graduation.png";

const About = () => (
  <Box sx={{ textAlign: "center", mb: -10 }}>
    <img src={BSA7thGraduation} alt="BSA 7th Graduation" height={250} width={250} />
  </Box>
);

export default About;
