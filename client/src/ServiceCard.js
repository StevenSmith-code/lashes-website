import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

function ServiceCard({ service, description }) {
  return (
    <Grid container spacing={1}>
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 36 }} color="text.primary" gutterBottom>
            {service}
          </Typography>
          <Typography variant="h5" component="div">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ServiceCard;
