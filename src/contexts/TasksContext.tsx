import { createContext, useCallback, useEffect, useState } from "react";
import { instance } from "../services/axios";

export interface taskI {
    id: string;
    title: string;
    userId: string;
    completed: boolean;
}

interface TaskContextI {
    tasks: taskI[];
    getTasks: () => Promise<void>;
    setTasks: React.Dispatch<React.SetStateAction<taskI[]>>;
}

export const TaskContext = createContext({} as TaskContextI)


export const TasksProvider = ({ children }: { children: React.ReactNode }) => {

    const [tasks, setTasks] = useState<taskI[]>([])

    const getTasks = async () => {
        const response = await instance.get<{ tasks: taskI[] }>("/tasks")
        console.log(response.data.tasks)
        setTasks(response.data.tasks)
    }

    useEffect(() => {
        getTasks()
    }, [getTasks])

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

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