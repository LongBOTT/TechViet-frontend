import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    
    return (
      <Box
        sx={{
           
          flexGrow: 1,
          overflow: "auto",
          borderRadius: 1,
          bgcolor: "rgb(25, 25, 234)",
          margin: 0,
          padding: 0, 
        }}
      >
      <Box 
      sx ={{
        height: 64,
        display: "flex",
        backgroundColor: "rgb(255, 123, 123)",
        width: "100%",
      }}>

      </Box>
      </Box>
    );
}