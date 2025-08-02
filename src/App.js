import React from "react";
import Header from "./components/Header";
// import About from "./components/About";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box>
      <Header />
      <Container maxWidth="md">
        {/* <About /> */}
        <Schedule />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
