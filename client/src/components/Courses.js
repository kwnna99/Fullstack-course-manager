import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";

export function Courses(){

    //import from context api
    const { getAllCourses } = useContext(Context);

    const navigate = useNavigate();

    //states
    const [courses, setCourses] = useState([]);

    useEffect(() =>{
        getAllCourses()
            .then( res => {
                if(res === 500){
                    navigate('/error')
                }
                console.log(res)
                setCourses(res)
            })
            .catch(err => {
                console.log(err)
                navigate('/error')
            });
    }, [])

    return(
        <main>
            <div className="wrap main--grid">
                {
                    courses.map(course =>(
                        <Link className="course--module course-link" to={`courses/${course.id}`} key={course.id}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    ))
                }
                <a className="course--module course--add-module" href="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </span>
                </a>
            </div>
        </main>
    )
}