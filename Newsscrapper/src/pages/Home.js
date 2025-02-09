import React  , { useState} from 'react'
import data from "../dataavail/data"
import Notes from "../components/notesmaking"
import Tours from "../components/Tours"
import Heading from '../components/Heading'
import "./hero.css"


const Home = () => {

  const [tours , setTours] = useState(data);
  return (
    <div className='App'>
    
    <Heading></Heading>

     <Tours tours = {tours} ></Tours>
    </div>
  )
}

export default Home
