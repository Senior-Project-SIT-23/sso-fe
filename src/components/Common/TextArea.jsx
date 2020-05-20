import React from 'react'
import classnames from 'classnames'

export default function TextArea(props) {
  /**
  |--------------------------------------------------
  | Handlers
  |--------------------------------------------------
  */

  /**
   * GET INPUT CLASSNAME
   */
  function getClassName() {
    return classnames('form-input resize-none h-32 w-full text-sm border rounded focus:outline-none focus:shadow-outline', props.className, {
      'border-red-500 bg-red-100 focus:border-red-500': typeof props.error === 'string',
    })
  }

  return (
    <div>
      {props.label && <p className="text-sm my-1">{props.label}</p>}
      <textarea className={getClassName()} {...props.inputProps} />
      {typeof props.error === 'string' && <p className="text-red-500 text-xs">{props.error}</p>}
    </div>
  )
}
