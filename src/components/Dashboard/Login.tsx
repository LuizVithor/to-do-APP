import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";

interface childrenI {
    children: React.ReactNode
}

const Container = ({ children }: childrenI) => (
    <Grid
        container
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
    >
        <Grid
            sm={5}
            md={5}
            lg={5}
            xs={10}
            container
            height={"70%"}
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

export const Login = () => {
    return (
        <Container>
            <Grid
                container
                height={"100%"}
                padding={"0px 20px"}
                alignItems={"center"}
                flexDirection={"column"}
                justifyContent={"space-evenly"}
            >
                <Grid
                    item
                    sx={{
                        width: "100%"
                    }}
                >
                    <TextField
                        fullWidth
                        size={"small"}
                        label={"Email ou Nome de usuário"}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        width: "100%"
                    }}
                >
                    <TextField
                        fullWidth
                        size={"small"}
                        label={"Senha"}
                    />
                </Grid>
                <Grid
                    container
                    spacing={2}
                    justifyContent={"center"}
                >
                    <Grid
                        lg={4}
                        sm={4}
                        xs={4}
                        md={4}
                        item
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                        >
                            Registrar
                        </Button>
                    </Grid>
                    <Grid
                        lg={4}
                        sm={4}
                        xs={4}
                        md={4}
                        item
                    >
                        <Button
                            fullWidth
                            variant="contained"
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
};