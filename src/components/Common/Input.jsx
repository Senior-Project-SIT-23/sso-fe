import React from 'react'
import classnames from 'classnames'

export default function TextInput(props) {
  /**
  |--------------------------------------------------
  | Handlers
  |--------------------------------------------------
  */

  /**
   * GET INPUT CLASSNAME
   */
  function getClassName() {
    return classnames('form-input w-full text-sm', props.className, {
      'border-red-500 bg-red-100 focus:border-red-500': typeof props.error === 'string',
    })
  }

  /**
  |--------------------------------------------------
  | Render
  |--------------------------------------------------
  */
  return (
    <div>
      {props.label && <p className="text-sm my-1">{props.label}</p>}
      <input className={getClassName()} {...props.inputProps} placeholder={props.placeholder} type={props.type} required={props.required} onKeyUp={props.onKeyUp}/>
      {typeof props.error === 'string' && <p className="text-red-500 text-xs">{props.error}</p>}
    </div>
  )
}

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
}
