import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Layout from '../../shared/Layout'
import TripForm from './TripForm'

const emptyTrip = {
  destination: '',
  transportation: '',
  lodging: '',
  costs: '',
  total: '',
  runningTotal: 0,
  owner: ''
}

const TripCreate = (props) => {
  const [trip, setTrip] = useState(emptyTrip)
  const [createdTripId, setCreatedTripId] = useState(null)

  const handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedTrip = Object.assign(trip, updatedField)

    setTrip({ ...editedTrip })

    const aTotal = parseInt(trip.transportation) + parseInt(trip.costs) + parseInt(trip.lodging)
    const total = Object.assign(trip, { total: aTotal })
    setTrip({ ...total })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/trips`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        trip: trip
      }
    })
      .then(res => setCreatedTripId(res.data.trip._id))
      .then(() => props.alert('New Trip Created!', 'info'))
      .catch(console.error)
  }

  const returnThis = () => {
    if (createdTripId) {
      return <Redirect to={`/trips/${createdTripId}`}/>
    } else {
      return (
        <Layout md="8" lg="4">
          <h4>Add a Trip</h4>
          <TripForm
            trip={trip}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cancelPath='/'
          />
        </Layout>
      )
    }
  }
  return (
    // { returnThis }
    returnThis()
  )
}

export default TripCreate
