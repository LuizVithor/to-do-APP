import { Button, Checkbox, FormControlLabel, Grid, TextField, useTheme } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { instance } from "../../services/axios";
import { useTasks } from "../../contexts/customHooks";

export const TaskForm = () => {

    const theme = useTheme();
    const { getTasks } = useTasks();

    const {
        control,
        register,
        handleSubmit,
        formState: { defaultValues }
    } = useForm({
        defaultValues: {
            title: "",
            completed: false
        }
    });

    const createTask = (data: typeof defaultValues) => {
        const response = instance.post("/tasks", data)
            .then(() => getTasks())
        toast.promise(response, {
            pending: "Criando tarefa...",
            success: "Tarefa criada com sucesso!",
            error: "Ocorreu um erro ao criar a tarefa, tente novamente mais tarde!"
        })
    }

    return (
        <form
            style={{
                width: "100%",
                height: "max-content",
            }}
            onSubmit={handleSubmit(createTask)}
        >
            <Grid
                gap={2}
                container
                width={"100%"}
                height={"10%"}
                justifyContent={"space-evenly"}
                sx={{
                    marginTop: "10px",
                    paddingBottom: "10px",
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Grid
                    md={4}
                    lg={4}
                    xs={4}
                    sm={4}
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <TextField
                        fullWidth
                        size={"small"}
                        label={"Título da tarefa"}
                        {...register("title")}
                    />
                </Grid>
                <Grid
                    md={1}
                    lg={1}
                    xs={3}
                    sm={3}
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Controller
                        name="completed"
                        control={control}
                        render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Concluída" />}
                    />
                </Grid>
                <Grid
                    md={2}
                    lg={2}
                    xs={3}
                    sm={3}
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        Criar Tarefa
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}