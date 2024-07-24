import { Button, Grid, Paper, TextField } from "@mui/material";
import { Container } from "../../components/Register/Container";
import { Controller, useForm } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useNavigate } from "react-router-dom";
import { fileToBase64 } from "../../utils/fileToBase64";
import { toast } from "react-toastify";
import { instance } from "../../services/axios";

export function Register() {

    const navigate = useNavigate()

    interface formI {
        image: File;
        name: string;
        password: string;
    }

    interface formFormated extends Omit<formI, "image"> {
        image: string;
    }

    const { register, handleSubmit, control } = useForm<formI>({
        defaultValues: {
            name: "",
            password: "",
            image: undefined
        }
    })

    const handleBack = () => navigate("/")

    const submit = async (data: formI) => {
        try {
            const dataF = { ...data } as unknown as formFormated

            if (data.image) dataF.image = await fileToBase64(data.image)

            await instance.post("auth/register", dataF)

            navigate("/")
        } catch (error) {
            toast.error("Erro ao registrar usuário")
        }
    }

    return (
        <form
            style={{
                width: "100%",
                height: "100%"
            }}
            onSubmit={handleSubmit(submit)}
        >
            <Container>
                <Grid
                    item
                    sm={6}
                    lg={3}
                    md={6}
                    xs={10}
                    height={"50%"}
                    flexDirection={"column"}
                >
                    <Paper
                        elevation={20}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px"
                        }}
                    >
                        <Grid
                            container
                            paddingX={5}
                            width={"100%"}
                            height={"100%"}
                            flexDirection={"column"}
                            justifyContent={"space-evenly"}
                        >
                            <Grid
                                item
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Nome ou E-mail do usuário"
                                    {...register("name")}
                                />
                            </Grid>
                            <Grid
                                item
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Senha"
                                    type="password"
                                    {...register("password")}
                                />
                            </Grid>
                            <Grid
                                item
                            >
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field: { value, name, onChange } }) => (
                                        <MuiFileInput
                                            fullWidth
                                            name={name}
                                            size="small"
                                            value={value}
                                            multiple={false}
                                            label="Imagem do usuário"
                                            placeholder="Imagem do usuário"
                                            onChange={(file) => onChange(file)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                container
                                justifyContent={"space-evenly"}
                            >
                                <Grid
                                    item
                                    sm={4}
                                    lg={4}
                                    md={4}
                                    xs={4}
                                >
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={handleBack}
                                    >
                                        Voltar
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    sm={4}
                                    lg={4}
                                    md={4}
                                    xs={4}
                                >
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                    >
                                        Registrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>

        </form>
    )
}