import { TaskForm } from "./TaskForm"
import { TaskGrid } from "./TaskGrid"
import { Container } from "./container"

export const TasksList = () => {

    return (
        <Container>
            <TaskForm />
            <TaskGrid />
        </Container>
    )
}