import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { TaskContext } from "./TasksContext";

export const useAuth = () => useContext(AuthContext)

export const useTasks = () => useContext(TaskContext)