import React from 'react'
import Layout from './Layout'
import Carousel from 'react-bootstrap/Carousel'

const Home = () => (
  <Layout>
    <Carousel interval={5000} style={{ height: '100vh' }}>
      <Carousel.Item style={{ height: '100%' }}>
        <img style={{ height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          className="d-block w-100"
          src="mountains.jpg"
          alt="lake with mountains in background"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '100%' }}>
        <img style={{ height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          className="d-block w-100"
          src="egypt.jpg"
          alt="man riding camel in Egypt"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '100%' }}>
        <img style={{ height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          className="d-block w-100"
          src="beachhouse.jpg"
          alt="view from beach house porch"
        />
      </Carousel.Item>
      <Carousel.Item style={{ height: '100%' }}>
        <img style={{ height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          className="d-block w-100"
          src="santorini.jpg"
          alt="coastline of Santorini, Greece"
        />
      </Carousel.Item>
    </Carousel>
  </Layout>
)

export default Home
