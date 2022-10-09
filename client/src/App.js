import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from './context/Context';

//CSS
import './styles/reset.css'
import './styles/global.css'


//Components
import { Courses } from './components/Courses';
import { Header } from './components/Header';
import { CourseDetail } from './components/CourseDetails';
import { UserSignIn } from './components/UserSignIn';
import { UserSignOut } from './components/UserSignOut';
import { PrivateRoute } from './context/PrivateRoute';
import { UpdateCourse } from './components/UpdateCourse';
import { UserSignUp } from './components/UserSignUp';
import { CreateCourse } from './components/CreateCourse';
import { NotFound } from './components/NotFound';
import { Forbidden } from './components/Forbidden';
import { UnhandledError } from './components/UnhandlerError';

function App() {
  return (
      <Provider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses/:id' element={<CourseDetail />} />
            <Route path='/courses/:id/update' element={<PrivateRoute><UpdateCourse /></PrivateRoute>} />
            <Route path='/courses/create' element={<PrivateRoute><CreateCourse /></PrivateRoute>} />
            <Route path='/signin' element={<UserSignIn />} />
            <Route path='/signout' element={<UserSignOut />} />
            <Route path='/signup' element={<UserSignUp />}/>
            <Route path='/forbidden' element={<Forbidden />}/>
            <Route path='/error' element={<UnhandledError />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;
