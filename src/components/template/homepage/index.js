import React, { useEffect } from 'react'
import axios from 'axios'

const HomePage = () => {
  const value = 'test1'
  const paramiter = window.location.search
  return (
    <div className='homepage'>
      {paramiter}
      <p className='color-green'>HomePage</p>
      <p className='color-green'>Hi this is free template by Zompong</p>
      <p className='color-green'>Dependency list here</p>
      <ol>
        <ul>"antd": "^3.26.3",</ul>
        <ul>"axios": "^0.19.0",</ul>
        <ul>"jest": "^24.9.0",</ul>
        <ul>"lodash": "^4.17.15",</ul>
        <ul>"react": "^16.10.1",</ul>
        <ul>"react-dom": "^16.10.1",</ul>
        <ul>"react-router-dom": "^5.1.2",</ul>
        <ul>"react-scripts": "3.1.2",</ul>
        <ul>"semantic-ui-react": "^0.88.2"</ul>
      </ol>
    </div>
  )
}

export default HomePage
