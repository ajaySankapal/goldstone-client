import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const User = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAndStoreData = async () => {
            await axios.get("http://localhost:5000/api/users/store")
        }
        fetchAndStoreData()
        const fetchUsers = async () => {
            const { data } = await axios.get("http://localhost:5000/api/users/all")
            if (data.users) {
                setUsers(data.users)
            }
        }
        fetchUsers()
    }, [])

    const clickHandler = () => {
        const exportToCSV = async () => {
            const { data } = await axios.get('http://localhost:5000/export')
        }
        exportToCSV()
    }
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <div><h4>Manage User</h4></div>
                <div><Button onClick={() => navigate('/create')}>Create</Button></div>
            </div>
            <hr />
            <Table striped className='container'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Gender</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td >{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.status}</td>
                            <td><span class="material-symbols-outlined" onClick={() => navigate(`/${user._id}`)}>
                                edit
                            </span></td>

                        </tr>
                    ))}

                </tbody>
            </Table>
            <div><Button onClick={clickHandler}>Export to CSV</Button></div>
        </div>

    )
}

export default User