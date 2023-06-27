import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [privateData, setPrivateData] = useState("")

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login")
        }
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const { data } = await axios.get("/api/private", config);
                setPrivateData(data.data)
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login")
            }
        }

        fetchPrivateData()
    }, [privateData])

    const logOutHandler = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    return error ? (
        <span className='error-message'>{error}</span>
    ) : (
        <>
            <div style={{ background: "green", color: "white" }}>{privateData}</div>
            <button onClick={logOutHandler}>Logout</button>
        </>
    )
}

export default Profile