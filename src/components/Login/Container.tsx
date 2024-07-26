import React from "react";
import { Grid, Paper, useTheme } from "@mui/material";

interface childrenI {
    children: React.ReactNode
}

export const Container = ({ children }: childrenI) => {

    const theme = useTheme();

    return (
        <Grid
            container
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
                backgroundColor: theme.palette.background.default
            }}
        >
            <Grid
                sm={5}
                md={4}
                lg={3}
                xs={10}
                container
                height={"40%"}
            >
                <Paper
                    elevation={20}
                    style={{
                        width: "100%",
                        borderRadius: "20px"
                    }}
                >
                    {children}
                </Paper>
            </Grid>
        </Grid>
    )
}