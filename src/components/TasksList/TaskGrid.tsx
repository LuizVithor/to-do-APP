import { Box } from "@mui/material"
import { useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useTasks } from "../../contexts/customHooks"

export const TaskGrid = () => {

    const { tasks } = useTasks()

    const theme = useTheme();

    return (
        <Box
            width={"90%"}
        >
            <DataGrid
                autoHeight
                sx={{
                    "& .MuiDataGrid-container--top": {
                        backgroundColor: theme.palette.primary.main,
                    }
                }}
                columns={[
                    { field: "title", headerName: "Título", width: 200 },
                    { field: "completed", headerName: "Finalizada", width: 200, valueFormatter: (params) => params ? "Sim" : "Não" }
                ]}
                rows={tasks}
                localeText={{ noRowsLabel: "Sem tarefas cadastradas" }}
            />
        </Box>
    )
}