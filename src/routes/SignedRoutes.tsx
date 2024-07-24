import { Route, Routes, useNavigate } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { useAuth } from "../contexts/customHooks"
import { useEffect } from "react"

export const SignedRoutes = () => {

    const { token } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}