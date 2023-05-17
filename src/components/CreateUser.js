import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (!name || !email || !status || !gender) {
            alert('Please enter all the fields!')
            return
        }
        const createUser = async () => {
            await axios.post("https://gorest.co.in/public/v2/users", { name, email, status, gender }, {
                headers: {
                    Authorization: `Bearer 7c6f3db7044d2e47e01fec4534a4a544a0dd0b43adfb8385c8915ba9715ee21f`,
                },
            })
        }
        const registerUser = async () => {
            const { data } = await axios.post("http://localhost:5000/api/users/register", { name, email, status, gender })
            if (data.success === true) {
                navigate('/')
                setName('')
                setEmail('')
                setStatus('')
                setGender(''
                )
            }
        }
        createUser()
        registerUser()
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', background: '#e5e5e5' }}>
            <div className='container' style={{ width: '50vw', background: '#fff', padding: '4rem', borderRadius: '5px' }}>
                <div className="d-flex justify-content-between mt-4">

                    <h4>Create user</h4>
                    <Button onClick={() => navigate('/')}>Go Back</Button>
                </div>
                <hr />
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
                        <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                            <option>Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Gender</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                            <option>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type='submit'>Create</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateUser