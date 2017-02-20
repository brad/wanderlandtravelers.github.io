import React from 'react'
import { Link } from 'react-router'
import { SocialIcon } from 'react-social-icons'
import Helmet from "react-helmet"
import WanderlandTravelersSVG from '../components/wanderland-travelers-svg.js'
import YouTube from 'react-youtube'
import '../css/index.less'
import '../fonts/Pacifico.woff2'


export default class Index extends React.Component {
  getContent () {
    let classes = 'wt-center wt-index wt-box'
    if (this.props.hide) {
      classes += ' hidden'
    }
    const socialUrls = [
      'https://www.instagram.com/wanderlandtravelers/',
      'https://www.youtube.com/channel/UCOMc1_p6kN13sgXYOtcxn-A',
      'https://www.facebook.com/wanderlandtravelers/',
      'https://twitter.com/wanderlandistas',
    ]
    return (
      <article className={classes}>
        <WanderlandTravelersSVG />
        <div id="social-icons">
          {socialUrls.map((socialUrl) =>
            <div key={socialUrl} className="social-icon-wrap">
              <SocialIcon url={socialUrl} />
            </div>
          )}
        </div>
        <div id="trailer" className="video-container">
          <div className="video-inner">
            <YouTube videoId="X9gTuZvFAW4" />
          </div>
        </div>
      </article>
    )
  }

  render () {
    return (
      <div id="wt-content">
        <Helmet
          title={this.props.data.site.siteMetadata.title}
          meta={[
            {"name": "description", "content": "A couple travelling, working, and filming it all as they go"},
            {"name": "keywords", "content": "travel, travelling, travelers, motorhome, nomad, nomads, digital nomads"},
          ]}
        />
        {this.getContent()}
      </div>
    )
  }
}


export const pageQuery = graphql`
  query SiteMetadataLookup {
    site {
      siteMetadata {
        title
      }
    }
  }
`
