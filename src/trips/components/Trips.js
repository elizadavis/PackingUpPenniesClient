import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Layout from '../../shared/Layout'
import apiUrl from '../../apiConfig'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const Trips = props => {
  const [trips, setTrips] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(props.user)
    axios.get({
      url: `${apiUrl}/trips`,
      headers: {
        'Authorization': `Bearer token=${props.user.token}`
      }
    })
      .then(res => setTrips(res.data.trips))
      .then(() => setLoaded(true))
      .catch(err => setError(err.message))
  }, [])

  const tripsList = trips.map(trip => (
    <tr key={trip._id}>
      <td>{trip.destination}</td>
      <td>{trip.transportation}</td>
      <td>{trip.lodging}</td>
      <td>{trip.costs}</td>
      <td>{trip.total}</td>
      <td><Button variant="success" href={`#trips/${trip._id}`}>Options</Button></td>
    </tr>
  ))

  const returnThis = () => {
    if (!loaded) {
      return <p>Loading...</p>
    } else if (trips.length === 0) {
      return <p>No trips!</p>
    } else if (error) {
      return <p>Error: {error}</p>
    } else {
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

  return (
    returnThis()
  )
}

export default Trips
