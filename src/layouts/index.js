import React from 'react'
import { Container } from 'react-responsive-grid'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import BackgroundImages from '../components/background-images.js'

import { rhythm } from '../utils/typography'

module.exports = React.createClass({
  getInitialState () {
    return {
      hide: false,
    }
  },

  handleHideContent () {
    this.setState({
      hide: !this.state.hide
    })
  },

  goFullscreen () {
    if (document.webkitIsFullScreen) {
      document.webkitExitFullscreen()
    } else {
      document.getElementById('background-images').webkitRequestFullscreen()
    }
  },

  propTypes () {
    return {
      children: PropTypes.func,
    }
  },

  childrenWithProps () {
    return React.Children.map(
      this.props.children(),
      child => React.cloneElement(child, {
        hide: this.state.hide,
      })
    )
  },

  render () {
    const className = this.state.hide ? 'hidden' : '';
    return (
      <div id="wt-outer-container" style={{opacity: 0}}>
        <BackgroundImages
          handleHideContent={this.handleHideContent}
          goFullscreen={this.goFullscreen}
          hide={this.state.hide}
        />
        <div id="wt-content" className={className}>
          {this.childrenWithProps()}
        </div>
      </div>
    )
  },
})
