import React  , { useState} from 'react'
import data from "../dataavail/world"
import Notes from "../components/notesmaking"
import Tours from "../components/Tours"
import Heading from '../components/Heading'
import "./hero.css"


const Worldnews = () => {

  const [tours , setTours] = useState(data);
  return (
   
    <div className='App'>
    {/* <Notes></Notes> */}
    <Heading></Heading>
    <Tours tours = {tours} ></Tours>
   </div>
  )
}

export default Worldnews