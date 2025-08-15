import React from 'react'
import AdsBannermain from './AdsBanner/AdsBannermain';
import OptioAvailable from './OptionAvailable/OptioAvailable';
import Courses from './Courses/Courses';
import CurrentPlan from './CurrentPlans/CurrentPlans';

function MainPage() {
  return (
    <div style={{ marginTop: '90px' }}>
      <AdsBannermain/>
      <OptioAvailable/>
      <Courses Topic="All Top Courses" />
      <CurrentPlan/>
    </div>
  )
}

export default MainPage
