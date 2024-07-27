import { createContext, useEffect, useState } from "react";
import { instance } from "../services/axios";
import { useAuth } from "./customHooks";
import { toast } from "react-toastify";

export interface taskI {
    id: string;
    title: string;
    userId: string;
    completed: boolean;
}

export interface TaskContextI {
    tasks: taskI[];
    getTasks: () => Promise<void>;
    deleteTask: (id: string | number) => void;
    setTasks: React.Dispatch<React.SetStateAction<taskI[]>>;
    updateTask: (id: string | number, data: Omit<taskI, "userId">) => void;
}

export const TaskContext = createContext({} as TaskContextI)


export const TasksProvider = ({ children }: { children: React.ReactNode }) => {

    const { token } = useAuth()

    const [tasks, setTasks] = useState<taskI[]>([])

    const getTasks = async () => {
        const response = await instance.get<{ tasks: taskI[] }>("/tasks")
        setTasks(response.data.tasks)
    }

    useEffect(() => {
        if (token) {
            getTasks()
        }
    }, [token])

    const deleteTask = (id: string | number) => {
        const promise = instance.delete(`/tasks/todos/${id}`)
            .then(() => {
                getTasks()
            })
        toast.promise(promise, {
            pending: "Deletando tarefa...",
            success: "Tarefa deletada com sucesso!",
            error: "Ocorreu um erro ao deletar a tarefa, tente novamente mais tarde!"
        })
    }

    const updateTask = (id: string | number, data: Omit<taskI, "userId">) => {
        const promise = instance.put(`/tasks/${id}`, data)
            .then(() => {
                getTasks()
            })
        toast.promise(promise, {
            pending: "Atualizando tarefa...",
            success: "Tarefa atualizada com sucesso!",
            error: "Ocorreu um erro ao atualizar a tarefa, tente novamente mais tarde!"
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                getTasks,
                deleteTask,
                updateTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}