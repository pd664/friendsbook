import React, {useEffect, useState} from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './comps/header/Header';
import Links from './Links';
import axios from 'axios';

function App() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await axios
      .get("http://localhost:4000/api/file/get")
      .then((response) => {
        setPostData(response.data);
      })
      .catch((err) => console.log(err));
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <Router>
        <Header />
        <Links postData={postData} />
      </Router>
    </div>
  );
}

export default App;
