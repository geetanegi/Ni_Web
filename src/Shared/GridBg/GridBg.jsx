import React from 'react';
import "./GridBg.css"

export default function GridBg(props) {
  return (
    <div className='gridbg'>
        {props.children}
    </div>
  )
}
