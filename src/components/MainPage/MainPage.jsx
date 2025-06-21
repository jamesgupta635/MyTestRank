import React from 'react'
import AdsBannermain from './AdsBanner/AdsBannermain';
import OptioAvailable from './OptionAvailable/OptioAvailable';
import Courses from './Courses/Courses'; 
import CurrentTest from './CurrentTest/CurrentTest';

function MainPage() {
  return (
    <div>
    <AdsBannermain/>
    <OptioAvailable/>
    <Courses Topic="Explore Top Courses" />
    <CurrentTest/>
    </div>
  )
}

export default MainPage
