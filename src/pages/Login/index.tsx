/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axios";
import { useAuth } from "../../contexts/customHooks";
import { Container } from "../../components/Login/Container";
import { Button, Grid, Snackbar, TextField } from "@mui/material";

export const Login = () => {

    const { setSession } = useAuth()

    const [openFeedback, setOpenFeedback] = useState<string | null>(null)

    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            name: "",
            password: ""
        }
    })

    const submit = async (data: typeof methods.formState.defaultValues) => {
        try {
            const response = await instance.post("auth/login", data);
            setSession({
                name: data?.name,
                token: response.data.token,
                profileImage: response.data.profileImage
            })
            navigate("/dashboard")
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
                                onClick={() => {
                                    navigate("/register")
                                }}
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