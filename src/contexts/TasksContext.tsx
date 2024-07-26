import { createContext, useEffect, useState } from "react";
import { instance } from "../services/axios";
import { useAuth } from "./customHooks";

export interface taskI {
    id: string;
    title: string;
    userId: string;
    completed: boolean;
}

export interface TaskContextI {
    tasks: taskI[];
    getTasks: () => Promise<void>;
    setTasks: React.Dispatch<React.SetStateAction<taskI[]>>;
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

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                getTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}