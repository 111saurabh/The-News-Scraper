import React  , { useState} from 'react'
import data from "../dataavail/business"
import Notes from "../components/notesmaking"
import Tours from "../components/Tours"
import Heading from '../components/Heading'
import "./hero.css"


const Login = () => {

  const [tours , setTours] = useState(data);
  return (
   
    <div className='App'>
    {/* <Notes></Notes> */}
    <Heading></Heading>
    <Tours tours = {tours} ></Tours>
   </div>
  )
}

export default Login
