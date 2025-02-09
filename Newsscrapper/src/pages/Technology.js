import React  , { useState} from 'react'
import data1 from "../dataavail/tech"
import Notes from "../components/notesmaking"
import Tours from "../components/Tours"
import Heading from '../components/Heading'
import "./hero.css"


const Tech = () => {

  const [tours , setTours] = useState(data1);
  return (
   
    <div className='App'>
    {/* <Notes></Notes> */}
    <Heading></Heading>
    <Tours tours = {tours} ></Tours>
   </div>
  )
}

export default Tech