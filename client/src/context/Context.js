import React, {  useState } from "react";
import Cookies from "js-cookie";


export const Context = React.createContext();

export function Provider({ children }) {
    const apiCall = (path, method = 'GET',body = null, requireAuth = false, credentials = null) => {
        const url = 'http://localhost:5000/api' + path;
    
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
    
        if(body !== null){
            options.body = JSON.stringify(body);
        }
    
        if(requireAuth){
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }
    
    //api calls functions
    const getUser = async(username, password) =>{
        const response = await apiCall(`/users`, 'GET', null, true, { username, password });
        if(response.status === 200) {
            return response.json().then(data => data);
        }
        else if(response.status === 401) {
            return null;
        }
        else{
            throw new Error();
        }
    }
    
    const createUser = async(user) => {
        const response = await apiCall('/users', 'POST', user);
        if(response.status === 201) {
            return response.status;
        }
        else if(response.status === 400){
            return response.json().then( data =>{
                return data.errors;
            });
        }
        else {
            throw new Error()
        }
    }
    
    const getAllCourses = async() => {
        const response = await apiCall('/courses', 'GET');
            if (response.status === 200) {
                return response.json().then(data => data);
            }
            else if(response.status === 400){
                return null;
            }
            else if(response.status === 500){
                return response.status;
            }
            else {
                throw new Error();
            }
    }
    
    const getCourse = async(id) => {
        const response = await apiCall(`/courses/${id}`, 'GET');
            if(response.status === 200){
                return response.json().then(data => data);
            }
            else if(response.status === 400){
                return null;
            }
            else if(response.status === 500){
                return response.status;
            }else if(response.status===404){
                return response.status;
            }
            else {
                throw new Error();
            }
    }
    
    const createCourse = async(data,username, password) => {
        const response = await apiCall(`/courses`, 'POST', data, true, {username, password});
        if(response.status === 201){
            return response.status;
        }
        else{
            return response.json().then( data => data)
        }
    }
    
    const updateCourse = async(id,data, username, password) => {
        const response = await apiCall(`/courses/${id}`, 'PUT', data, true, {username, password});
            if(response.status === 204){
                return response.status;
            }else if(response.status===404){
                return response.status;
            }
            else if(response.status === 403){
                return response.json().then( data => data)
            }
            else if(response.status === 400){
                return response.json().then( data => data)
            }
            else {
                throw new Error();
            }
    }
    
    const deleteCourse = async(id, username, password) => {
        const response = await apiCall(`/courses/${id}`, 'DELETE', null, true, { username, password });
        if(response.status === 403 || response.status===204 || response.status===404){
            console.log(response.status)
            return response.status;
        }
        else{
            throw new Error();
        }
    }
    //Cookies
    const authCookie = Cookies.get('authenticatedUser');
    const userCookie = Cookies.get('userCreds')

    //States
    const [ authenticatedUser, setAuthenticatedUser ] = useState(() => ( authCookie ? JSON.parse(authCookie) : null));
    const [ userCreds, setUserCreds ] = useState(() => (userCookie ? JSON.parse(userCookie) : null))

    //sign in and set the cookies
    const signInAuth = async(username, password) => {
      const creds = { username, password }
      const user = await getUser(username,password);
      if(user !== null){
        setAuthenticatedUser(user)
        setUserCreds(creds)
        const cookieOptions = {
          expires: 1, //1 day
          secure: true,  
          sameSite: "None"
        };
        Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
        Cookies.set('userCreds', JSON.stringify(creds), cookieOptions);
      }
      return user;
    }

//remove cookies and log out the user
    const signOut = async() => {
      setAuthenticatedUser(null);
      setUserCreds(null);
      Cookies.remove('authenticatedUser');
      Cookies.remove('userCreds');
    }

    return(
        <Context.Provider value={{ getAllCourses, getCourse, signInAuth, signOut, updateCourse, authenticatedUser, createUser, createCourse, deleteCourse, userCreds }}>
            {children}
        </Context.Provider>
    )

    
}

export default Context;