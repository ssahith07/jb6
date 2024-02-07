import React from 'react'
import Button from './Button'

const Salary = ({handleChange, handleClick}) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div>
        <Button onClickHandler={handleClick} value="Hourly" title="Hourly"/>
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly"/>
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly"/>
      </div>
    </div>
  )
}

export default Salary
