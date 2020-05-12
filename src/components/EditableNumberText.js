import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './EditableNumberText.css'

function EditableNumberText({
  initialValue,
  min,
  max,
  save = () => {},
  prefix = '',
  suffix = '',
}) {
  const [isText, setIsText] = useState(true)
  const [value, setValue] = useState(initialValue)
  const [previousValue, setPreviousValue] = useState(initialValue)
  const inputRef = useRef(null)


  useEffect(() => {
    if(!isText) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isText, inputRef])

  const handleKeyUp = (e) => {
    if(e.key === 'Escape') {
      setValue(previousValue)
      setIsText(true)
    } else if(e.key === 'Enter') {
      setPreviousValue(e.target.value)
      setIsText(true)
      save(e.target.value)
    }
  }

  const handleChange = (e) => {
    let newValue = parseInt(e.target.value) || value
    newValue = max !== undefined && newValue > max ? max : newValue
    newValue = min !== undefined && newValue < min ? min : newValue
    setValue(newValue)
  }

  const renderText = () => (
    <span
      className='editableNumber'
      onClick={e => {
        e.stopPropagation()
        setIsText(false)
        }}>
      {prefix}{value}{suffix}
    </span>
  )

  const renderInput = () => (
    <input
      className='editableNumber'
      ref={inputRef}
      type='number'
      value={value}
      onKeyUp={handleKeyUp}
      onBlur={e => {
        setIsText(true)
        setPreviousValue(value)
        save(e.target.value)
      }}
      onChange={handleChange}
      onClick={e => e.stopPropagation()}
    />
  )

  return isText ? renderText() : renderInput()
}

EditableNumberText.propTypes = {
  initialValue: PropTypes.number.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  save: PropTypes.func,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
}

export default EditableNumberText
