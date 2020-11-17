import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

export default function ColorPicker(props) {
  const [color, setColor] = useState(HEX2RGB(props.color))

  function HEX2RGB(hex) {
    if (hex.charAt(0) === '#') {
      hex = hex.substr(1)
    }
    if (hex.length < 2 || hex.length > 6) {
      return false
    }
    var values = hex.split(''),
      r,
      g,
      b

    if (hex.length === 2) {
      r = parseInt(values[0].toString() + values[1].toString(), 16)
      g = r
      b = r
    } else if (hex.length === 3) {
      r = parseInt(values[0].toString() + values[0].toString(), 16)
      g = parseInt(values[1].toString() + values[1].toString(), 16)
      b = parseInt(values[2].toString() + values[2].toString(), 16)
    } else if (hex.length === 6) {
      r = parseInt(values[0].toString() + values[1].toString(), 16)
      g = parseInt(values[2].toString() + values[3].toString(), 16)
      b = parseInt(values[4].toString() + values[5].toString(), 16)
    } else {
      return false
    }
    return { r, g, b }
  }

  const handleChange = (color) => {
    setColor(color.rgb)
    props.handleChange(color.hex)
  }
  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  })
  return (
    <div>
      <div style={styles.popover}>
        <div className="text-right">
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <SketchPicker color={color} onChange={handleChange} />
      </div>
    </div>
  )
}
