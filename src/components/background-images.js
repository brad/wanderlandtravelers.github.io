import React from 'react'
import Slider from 'react-slick'
import responsiveImages from './responsive-images.js'
import {Icon} from 'react-fa'
import '../css/background-images.less'
// import 'slick-carousel/slick/slick.scss'
// import 'slick-carousel/slick/slick-theme.scss'


export default class BackgroundImages extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.updatedDimensions()

    this.updateDimensions = this.updateDimensions.bind(this)
    this.updatedDimensions = this.updatedDimensions.bind(this)
    this.className = this.className.bind(this)
    this.fullscreenClass = this.fullscreenClass.bind(this)
    this.fullscreenBUtton = this.fullscreenButton.bind(this)
    this.hideBUtton = this.hideButton.bind(this)
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateDimensions);
    }
    this.setState({loaded: true});
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDimensions);
    }
  }

  updatedDimensions () {
    return {
      loaded: false,
      width: typeof window === 'undefined' ? null : window.innerWidth,
      height: typeof window === 'undefined' ? null : window.innerHeight,
    }
  }

  updateDimensions () {
    this.setState(this.updatedDimensions())
  }

  isMoreLandscapey (img) {
    return (img.width / img.height) > (this.state.width / this.state.height)
  }

  isFullScreen () {
    return typeof(document) !== 'undefined' && document.webkitIsFullScreen
  }

  fullscreenButton () {
    return (
      <a
        id="fullscreen"
        className={this.fullscreenClass()}
        onClick={this.props.goFullscreen}
      >
        <Icon name="arrows-alt"/>
      </a>
    )
  }

  hideButton () {
    if (!this.isFullScreen()) {
      return (
        <a id="hide-content" onClick={this.props.handleHideContent}>
          <Icon name={this.props.hide ? 'eye' : 'eye-slash'}/>
        </a>
      )
    }
    return
  }

  className () {
    return this.fullscreenClass() + (this.state.loaded ? ' loaded' : '')
  }

  fullscreenClass () {
    return this.isFullScreen() ? 'fullscreen' : ''
  }

  render () {
    const settings = {
      dots: false,
      infinite: true,
      pauseOnHover: false,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      lazyLoad: 'progressive',
      arrows: true,
      dots: false,
      autoplay: true,
      autoplaySpeed: 25000,
    }
    return (
      <div id="background-images" className={this.className()}>
        <Slider {...settings}>
          {responsiveImages.map((image, i) => (
            <div key={i} className="responsive-background-image">
              <img
                srcSet={image.srcset}
                src={image.src}
                width={this.isMoreLandscapey(image.images[0]) ? '100%' : 'auto'}
                height={this.isMoreLandscapey(image.images[0]) ? 'auto' : '100%'}
              />
              <img
                className="blurred-image"
                srcSet={image.srcset}
                src={image.src}
              />
            </div>
          ))}
        </Slider>
        {this.fullscreenButton()}
        {this.hideButton()}
      </div>
    )
  }
}
