import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        const getUserById = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/users/${params.id}`)
            if (data) {
                setName(data.user.name)
                setEmail(data.user.email)
                setStatus(data.user.status)
                setGender(data.user.gender)
            }
        }
        getUserById()
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !email || !status || !gender) {
            alert('Please enter all the fields!')
            return
        }

        const updateUser = async () => {
            const { data } = await axios.put(`http://localhost:5000/api/users/${params.id}`, { name, email, status, gender })
            if (data.success === true) {
                navigate('/')
                setName('')
                setEmail('')
                setStatus('')
                setGender(''
                )
            }
        }
        updateUser()
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', background: '#e5e5e5' }}>
            <div className='container' style={{ width: '50vw', background: '#fff', padding: '4rem', borderRadius: '5px' }}>
                <div className="d-flex justify-content-between mt-4">

                    <h4>Update user</h4>
                    <Button onClick={() => navigate('/')}>Go Back</Button>
                </div>
                <Form className='container' onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Status</Form.Label>
                        <Form.Select aria-label="Default select example" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Gender</Form.Label>

                        <Form.Select aria-label="Default select example" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type='submit'>Update</Button>
                </Form>
            </div>
        </div>
    )
}

export default UpdateUser