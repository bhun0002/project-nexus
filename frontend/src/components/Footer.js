import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ textAlign: "center", py: 2, mt: 4, bgcolor: "grey.200" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Project Nexus. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
