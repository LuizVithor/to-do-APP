import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useTasks } from "../../contexts/customHooks"

export const TaskGrid = () => {

    const { tasks } = useTasks()

    return (
        <Box
            width={"90%"}
            sx={{ height: "70%" }}
        >
            <DataGrid
                sx={{
                    "& .MuiDataGrid-columnHeaders > div": {
                        backgroundColor: "#02031a !important",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "primary.main",
                    },
                    "& .MuiDataGrid-scrollbarFiller--header": {
                        backgroundColor: "primary.main",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        color: "white",
                        borderColor: "primary.main",
                        backgroundColor: "primary.main",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        color: "white"
                    },
                    "& .MuiSvgIcon-root": {
                        color: "white"
                    },
                    "& .MuiDataGrid-overlay": {
                        backgroundColor: "white"
                    },
                    "& .MuiTablePagination-toolbar": {
                        color: "white"
                    },
                }}
                columns={[
                    { field: "title", headerName: "Título", width: 200 },
                    { field: "completed", headerName: "Finalizada", width: 200, valueFormatter: (params) => params ? "Sim" : "Não" }
                ]}
                rows={tasks}
                pageSizeOptions={[5, 10, 15]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}
                localeText={{ noRowsLabel: "Sem tarefas cadastradas" }}
            />
        </Box>
    )
}