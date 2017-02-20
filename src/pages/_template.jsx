import React from 'react'
import { Container } from 'react-responsive-grid'
import Link from 'gatsby-link'
import Headroom from 'react-headroom'
import '../css/markdown-styles'
import BackgroundImages from '../components/background-images.js'

import { rhythm } from '../utils/typography'

module.exports = React.createClass({
  getInitialState () {
    return {
      hide: false,
      loaded: true
    }
  },

  handleHideContent () {
    this.setState({
      hide: !this.state.hide
    })
  },

  onLoad () {
    this.setState({
      loaded: true
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
      children: React.PropTypes.any,
    }
  },

  childrenWithProps () {
    return React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       hide: this.state.hide,
       onLoaded: this.onLoaded
     })
    )
  },

  render () {
    return (
      <div id="wt-outer-container" style={{opacity: 0}}>
        <BackgroundImages
          handleHideContent={this.handleHideContent}
          goFullscreen={this.goFullscreen}
          hide={this.state.hide}
        />
        {this.childrenWithProps()}
      </div>
    )
  },
})
