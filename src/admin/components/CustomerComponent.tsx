import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function CustomerComponent() {
    return (
      <Box
        sx={{
           
          flexGrow: 1,
          overflow: "auto",
          borderRadius: 1,
          bgcolor: "rgb(25, 255, 2)",
          margin: 0,
          padding: 0, 
        }}
      >
      <Box 
      sx ={{
        height: 64,
        display: "flex",
        backgroundColor: "rgb(255, 25, 123)",
        width: "100%",
      }}>

      </Box>
      </Box>
    );
}

