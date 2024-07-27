import { useState } from "react"
import { Box } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Close'
import { taskI } from "../../contexts/TasksContext"
import { useTasks } from "../../contexts/customHooks"
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModes, GridRowModesModel } from "@mui/x-data-grid"

export const TaskGrid = () => {

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const { tasks, deleteTask, updateTask } = useTasks()

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        deleteTask(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel, details: GridCallbackDetails) => {
        setRowModesModel(newRowModesModel);
        if ((rowModesModel[Object.keys(rowModesModel)[0]] as { mode: string; ignoreModifications?: boolean })?.ignoreModifications) return
        const row = details.api.getRowModels().get(parseInt(Object.keys(rowModesModel)[0]))
        updateTask(row!.id, row as taskI)
    };

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
                    {
                        field: "title",
                        headerName: "Título",
                        width: 200,
                        editable: true,
                        type: "string"
                    },
                    {
                        field: "completed",
                        headerName: "Finalizada",
                        width: 200,
                        valueFormatter: (params) => params ? "Sim" : "Não",
                        editable: true,
                        valueOptions: [{ label: "Sim", value: true }, { label: "Não", value: false }],
                        type: "singleSelect",
                    },
                    {
                        field: 'actions',
                        type: 'actions',
                        headerName: '',
                        width: 100,
                        cellClassName: 'actions',
                        getActions: ({ id }) => {
                            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                            if (isInEditMode) {
                                return [
                                    <GridActionsCellItem
                                        icon={<SaveIcon />}
                                        label="Save"
                                        sx={{
                                            '& .MuiSvgIcon-fontSizeSmall': {
                                                color: "primary.main"
                                            }
                                        }}
                                        onClick={handleSaveClick(id)}
                                    />,
                                    <GridActionsCellItem
                                        icon={<CancelIcon />}
                                        label="Cancel"
                                        sx={{
                                            '& .MuiSvgIcon-fontSizeSmall': {
                                                color: "primary.main"
                                            }
                                        }}
                                        className="textPrimary"
                                        onClick={handleCancelClick(id)}
                                        color="inherit"
                                    />,
                                ];
                            }

                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    className="textPrimary"
                                    onClick={handleEditClick(id)}
                                    color="inherit"
                                    sx={{
                                        '& .MuiSvgIcon-fontSizeSmall': {
                                            color: "primary.main"
                                        }
                                    }}
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(id)}
                                    color="inherit"
                                    sx={{
                                        '& .MuiSvgIcon-fontSizeSmall': {
                                            color: "primary.main"
                                        }
                                    }}
                                />,
                            ];
                        },
                    },
                ]}
                rows={tasks}
                pageSizeOptions={[5, 10, 15]}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowEditStop={handleRowEditStop}
                onRowModesModelChange={handleRowModesModelChange}
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