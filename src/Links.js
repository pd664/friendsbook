import React, {useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom';
// import HomePostCard from './comps/home/HomePostCard';
import SignUp from './comps/signUp/SignUp';
import SignIn from './comps/signIn/SignIn';
import PrivateRoute from './utils/PrivateRoute';
import Create from './comps/create/Create';
import Profile from './comps/profile/Profile';
import HomePost from './comps/home/HomePosts';
import axios from 'axios';

function Links(props) {
  const {postData} = props

  return (
    <Routes>
        <Route path='/' element={<PrivateRoute/>}>
          <Route exact path='/' element={<HomePost postDataprop={postData} />}/>
        </Route>
        <Route path='/create' element={<PrivateRoute/>}>
          <Route exact path='/create' element={<Create />}/>
        </Route>
        <Route path='/profile' element={<PrivateRoute/>}>
          <Route exact path='/profile' element={<Profile postDataprop={postData} />}/>
        </Route>
        {/* <Route path='/' element={<PrivateRoute />}/> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} /> 
    </Routes>
  )
}

export default Links