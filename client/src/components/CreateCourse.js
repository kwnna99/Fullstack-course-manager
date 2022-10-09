import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";


export function CreateCourse() {

    //imports from context Api
    const { authenticatedUser, createCourse, userCreds } = useContext(Context);

    //import from react router dom
    const navigate = useNavigate();

    //States
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState('');
    const [ materialsNeeded, setMaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState('');

// handles course creation on form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authenticatedUser.id
        }
        console.log(data);
        createCourse(data, userCreds.username, userCreds.password)
            .then(res => { 
                res.errors ? setErrors(res.errors) : setErrors('');
                if(!title || !description){
                    console.log('Course could not be created');
                }
                if(res === 201){
                    navigate('/')
                }
            })
            .catch(err =>{
                console.error(err)
            })
    }

//redirect the user to the course list if they click on cancel
    const cancelHandler = () =>{
        navigate(`/`);
    }

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                { errors && errors.length > 0 ?(
                    <div className="validation--errors">
                        <ul>
                            {errors.map(err => <li>{err}</li>)}
                        </ul>
                    </div>
                ) : <></>}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            <p>By {authenticatedUser.firstName + ' ' + authenticatedUser.lastName}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type='text' value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)}></input>
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={cancelHandler}>Cancel</button>
                </form>
            </div>
        </main>
    )
}