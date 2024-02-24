import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const EditCreatureForm = (props) => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({ name: "", creatureType: "", description: "", skill1: "", skill2: "", skill3: "", image: "" })
    const [selected, setSelected] = useState({ creatureType: false })
    const [errors, setErrors] = useState({})
    const [notFoundError, setNotFoundError] = useState("")
    const [localName, setLocalName] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/creatures/${id}`)
            .then((res) => {
                console.log(res)
                setFormData(res.data)
                setLocalName(res.data.name)
            }).catch((err) => {
                console.log(err)
                setNotFoundError("A creature with that ID does not exist.")
            })
    }, [])

    const handleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/creatures/${formData._id}`, {
            name: formData.name,
            creatureType: formData.creatureType,
            description: formData.description,
            skill1: formData.skill1,
            skill2: formData.skill2,
            skill3: formData.skill3,
            image: formData.image
        })
            .then((res) => {
                console.log(res)
                setFormData({ name: "", creatureType: "", description: "", skill1: "", skill2: "", skill3: "", image: "" })
                setSelected({ creatureType: false })
                navigate('/')
            }).catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    const selectorHandler = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setSelected({ ...selected, [key]: true });
        setFormData({ ...formData, [key]: value })
    }

    return (
        <div className='fluid bg-secondary p-4' style={{ minHeight: '85vh' }}>
            {notFoundError ?
                <div>
                    <h2>{notFoundError}</h2>
                    <h3>Click <Link style={{ textDecoration: 'none' }} to={'/new'}>here</Link> to add a new creature, or <Link style={{ textDecoration: 'none' }} to={'/'}>here</Link> to return home.</h3>
                </div>
                :
                <div>
                    <h1 className='m-2'>{`Edit ${localName}'s information`}</h1>
                    <div>
                        <form className='row justify-content-center ' onSubmit={handleSubmit}>

                            <div className='col-3 m-4'>
                                <h5>Required Fields</h5>
                                <label className='form-label'>Creature Name:</label>
                                <input type="text" name="name" className='form-control' onChange={(e) => handleChange(e)} value={formData.name} />
                                {errors.name && <span className='text-warning'>{errors.name.message}</span>}<br />

                                <label className='form-label'>Creature Type:</label>
                                <input type="text" name="creatureType" className='form-control' onChange={(e) => handleChange(e)} value={formData.creatureType} />
                                {errors.creatureType && <span className='text-warning'>{errors.creatureType.message}</span>}<br />

                                <label className='form-label'>Description:</label>
                                <input type="text" name="description" className='form-control' onChange={(e) => handleChange(e)} value={formData.description} />
                                {errors.description && <span className='text-warning'>{errors.description.message}</span>}<br />

                                <div className='mt-4'>
                                    <button type='submit' className='btn btn-primary'>Edit {formData.name}</button>
                                </div>
                            </div>

                            <div className='col-3 m-4'>
                                <h5>Optional Fields</h5>
                                <label className='form-label'>Special Skill:</label>
                                <input type="text" name='skill1' className='form-control' onChange={(e) => handleChange(e)} value={formData.skill1} />
                                {errors.skill1 && <span className='text-warning'>{errors.skill1.message}</span>}<br />

                                {formData.skill1 ?
                                    <>
                                        <label className='form-label'>Special Skill:</label>
                                        <input disabled={false} type="text" name='skill2' className='form-control' onChange={(e) => handleChange(e)} value={formData.skill2} />
                                    </>
                                    :
                                    <>
                                        <label className='form-label'>Special Skill:</label>
                                        <input disabled={true} type="text" name='skill2' className='form-control' onChange={(e) => handleChange(e)} value={formData.skill2} />
                                    </>
                                }
                                {errors.skill1 && <span className='text-warning'>{errors.skill1.message}</span>}<br />

                                {formData.skill2 ?
                                    <>
                                        <label className='form-label'>Special Skill:</label>
                                        <input disabled={false} type="text" name='skill3' className='form-control' onChange={(e) => handleChange(e)} value={formData.skill3} />
                                    </>
                                    :
                                    <>
                                        <label className='form-label'>Special Skill:</label>
                                        <input disabled={true} type="text" name='skill3' className='form-control' onChange={(e) => handleChange(e)} value={formData.skill3} />
                                    </>
                                }
                                {errors.skill3 && <span className='text-warning'>{errors.skill3.message}</span>}<br />

                                <label className='form-label'>Creature Picture URL:</label>
                                <input type="text" name="image" className='form-control' onChange={(e) => handleChange(e)} value={formData.image} />
                                {errors.image && <span className='text-warning'>{errors.image.message}</span>}<br />
                            </div>

                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditCreatureForm