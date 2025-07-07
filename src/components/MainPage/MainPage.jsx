import React from 'react'
import AdsBannermain from './AdsBanner/AdsBannermain';
import OptioAvailable from './OptionAvailable/OptioAvailable';
import Courses from './Courses/courses';
import CurrentTest from './CurrentTest/CurrentTest';

function MainPage() {
  return (
    <div>
    <AdsBannermain/>
    <OptioAvailable/>
    <Courses Topic="All Top Courses" />
    <CurrentTest/>
    </div>
  )
}

export default MainPage
