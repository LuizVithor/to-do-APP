import { Grid, Paper } from "@mui/material";
import { useState } from "react";

export const Login = () => {
    return (
        <Grid
            container
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Grid
                container
                width={"500px"}
                height={"700px"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Paper
                    elevation={20}
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                </Paper>
            </Grid>
        </Grid>
    )
};