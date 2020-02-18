import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import './Scrollbar.scss'

const scrollbarStyle = {
  width: `100%`,
  flexGrow: 1,
}

// eslint-disable-next-line react/prop-types
const renderVerticalTrack = ({ style, ...props }) => (
  <div
    {...props}
    style={{ ...style, width: '5px', height: `calc(100% - 10px)` }}
    className="scrollbar_vertical-track"
  />
)

// eslint-disable-next-line react/prop-types
const renderVerticalThumb = ({ style, ...props }) => (
  <div
    {...props}
    style={{ ...style, width: '5px' }}
    className="scrollbar_vertical-thumb"
  />
)

const Scrollbar = ({ children }) => {
  return (
    <Scrollbars
      hideTracksWhenNotNeeded
      style={scrollbarStyle}
      renderTrackVertical={renderVerticalTrack}
      renderThumbVertical={renderVerticalThumb}
    >
      {children}
    </Scrollbars>
  )
}

Scrollbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
}

export default Scrollbar
