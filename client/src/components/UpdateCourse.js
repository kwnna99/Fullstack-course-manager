import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Context from "../context/Context";


export function UpdateCourse () {

    const { id } = useParams();
    const navigate = useNavigate();

    const { getCourse, updateCourse, authenticatedUser, userCreds } = useContext(Context);

    //States
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ estimatedTime, setEstimatedTime ] = useState('');
    const [ materialsNeeded, setMaterialsNeeded ] = useState('');
    const [ errors, setErrors ] = useState('');    
    const [ owner, setOwner ] = useState('');
    

    //check if the user is the owner and also display the existing information
    useEffect(() => {
        const loggedIn = authenticatedUser.firstName + ' ' + authenticatedUser.lastName;
        getCourse(id)
            .then(res => {
                setTitle(res.title);
                setDescription(res.description);
                setEstimatedTime(res.estimatedTime);
                setMaterialsNeeded(res.materialsNeeded);
                setOwner(res.User.firstName + ' ' + res.User.lastName);
                if(loggedIn !== res.User.firstName + ' ' + res.User.lastName){
                    navigate(`/forbidden`)
                }

            })
            .catch(err => {navigate("/notfound")});
    }, [])

    //on submit, send the data to update the course
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded 
        }

        updateCourse(id,data,userCreds.username, userCreds.password)
            .then(res => {
                res.errors ? setErrors(res.errors) : setErrors('');
                if(res === 204){
                    navigate(`/courses/${id}`)
                }else if(res===404){
                    navigate("/notfound");
                }
            })
            .catch(err =>{
                console.error(err)
                console.log('Course could not be updated')
            })
    }
//if the user cancels the update, take them to the course overview page
    const cancelHandler = () =>{
        navigate(`/courses/${id}`);
    }

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                { errors && errors.length > 0 ?(
                    <div className="validation--errors">
                        <ul>
                            {errors.map((err,index) => <li key={index}>{err}</li>)}
                        </ul>
                    </div>
                ) : <></>}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle"></label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) =>{ setTitle(e.target.value) }}></input>
                            <p>By {owner}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) =>{ setDescription(e.target.value) }}>
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) =>{ setEstimatedTime(e.target.value) }}></input>
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) =>{ setMaterialsNeeded(e.target.value) }}>
                            </textarea>
                        </div>
                    </div>
                    <button className="button sign" type="submit">Update Course</button>
                    <button className="button button-secondary cancel" onClick={cancelHandler}>Cancel</button>
                </form>
            </div>
        </main>
    )
}