import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Layout from '../../shared/Layout'
import TripForm from './TripForm'

class TripCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trip: {
        destination: '',
        transportation: '',
        lodging: '',
        costs: '',
        total: '',
        runningTotal: 0,
        owner: ''
      },
      createdTripId: null
    }
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedTrip = Object.assign(this.state.trip, updatedField)

    this.setState({ trip: editedTrip })

    const aTotal = parseInt(this.state.trip.transportation) + parseInt(this.state.trip.costs) + parseInt(this.state.trip.lodging)
    const total = Object.assign(this.state.trip, { total: aTotal })
    console.log(total)
    this.setState({ trip: total })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/trips`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        trip: {
          destination: this.state.trip.destination,
          transportation: this.state.trip.transportation,
          lodging: this.state.trip.lodging,
          costs: this.state.trip.costs,
          total: this.state.trip.total,
          runningTotal: this.state.trip.runningTotal
        }
      }
    })
      .then(res => this.setState({ createdTripId: res.data.trip._id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { trip, createdTripId } = this.state

    if (createdTripId) {
      return <Redirect to={`/trips/${createdTripId}`}/>
    }

    return (
      <Layout md="8" lg="6">
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

export default TripCreate
