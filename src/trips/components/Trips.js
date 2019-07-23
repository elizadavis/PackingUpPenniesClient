import React, { Component } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Layout from '../../shared/Layout'
import apiUrl from '../../apiConfig'
import Table from 'react-bootstrap/Table'

// import Button from 'react-bootstrap/Button'

class Trips extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trips: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/trips`)
      .then(res => this.setState({ trips: res.data.trips, loaded: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { trips, error, loaded } = this.state
    // const { user } = this.props

    const tripsList = trips.map(trip => (
      <tr key={trip._id}>
        <td>{trip.destination}</td>
        <td>{trip.transportation}</td>
        <td>{trip.lodging}</td>
        <td>{trip.costs}</td>
        <td>{trip.total}</td>
      </tr>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }

    if (trips.length === 0) {
      return <p>No trips!</p>
    }

    if (error) {
      return <p>Error: {error}</p>
    }

    return (
      <Layout md="8" lg="6">
        <Table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Transportation</th>
              <th>Lodging</th>
              <th>Other Expenses</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tripsList}
          </tbody>
        </Table>
      </Layout>
    )
  }
}

export default Trips
