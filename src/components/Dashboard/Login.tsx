import { Button, Grid, Paper, Snackbar, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

    const [openFeedback, setOpenFeedback] = useState<string | null>(null)

    const methods = useForm({
        defaultValues: {
            name: "",
            password: ""
        }
    })

    const submit = async (data: typeof methods.formState.defaultValues) => {
        try {
            const response = await axios.post("http://localhost:3000/auth/login", data);
            console.log(response)
        } catch (error: any) {
            if (error.response.status === 404) {
                setOpenFeedback("Usuário nâo encontrado")
                return
            } else if (error.response.status == 400) {
                setOpenFeedback("Verifique os campos e tente novamente!")
                return
            }
            setOpenFeedback("Ocorreu um erro, por favor, tente novamente mais tarde!")
        }
    }

    return (
        <form
            style={{
                width: "100%",
                height: "100%"
            }}
            onSubmit={methods.handleSubmit(submit)}
        >
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
                            {...methods.register("name")}
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
                            {...methods.register("password")}
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
                            item
                            lg={4}
                            sm={4}
                            xs={4}
                            md={4}
                        >
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                Entrar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {
                openFeedback && (
                    <Snackbar
                        open={!!openFeedback}
                        message={openFeedback}
                    />
                )
            }
        </form>
    )
};