import React from 'react'
import AdsBannermain from './AdsBanner/AdsBannermain';
import OptioAvailable from './OptionAvailable/OptioAvailable';
import Courses from './Courses/Courses';
import CurrentTest from './CurrentTest/CurrentPlans';

function MainPage() {
  return (
    <div style={{ marginTop: '90px' }}>
      <AdsBannermain/>
      <OptioAvailable/>
      <Courses Topic="All Top Courses" />
      <CurrentTest/>
    </div>
  )
}

export default MainPage
