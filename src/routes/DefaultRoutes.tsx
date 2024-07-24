import { Login } from "../pages/Login"
import { Route, Routes } from "react-router-dom"
import { Register } from "../pages/Login/Register"

export const DefaultRoutes = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Login />} />
        </Routes>
    )
}