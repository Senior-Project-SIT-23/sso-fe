import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'

export default function Select(props) {
  /**
  |--------------------------------------------------
  | Handlers
  |--------------------------------------------------
  */

  /**
   * GET INPUT CLASSNAME
   */
  function getClassName() {
    return classnames('form-select w-full text-sm font-sarabun', props.className, {
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
      {props.label && <p className="text-sm">{props.label}</p>}
      <select className={getClassName()} {...props.inputProps}>
        {_.map(props.options, (opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {typeof props.error === 'string' && <p className="text-red-500 text-xs">{props.error}</p>}
    </div>
  )
}
