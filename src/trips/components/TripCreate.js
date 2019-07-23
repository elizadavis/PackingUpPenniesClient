import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import Layout from '../../shared/Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class TripCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trip: {
        destination: '',
        transportation: '',
        lodging: '',
        costs: '',
        total: 0,
        runningTotal: 0
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="destination">
            <Form.Label>Trip Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Destination"
              name="destination"
              onChange={handleChange}
              value={trip.destination}
            />
          </Form.Group>
          <Form.Group controlId="transportation">
            <Form.Label>Transportation Costs</Form.Label>
            <Form.Control
              type="number"
              placeholder="$$"
              name="transportation"
              onChange={handleChange}
              value={trip.transportation}
            />
          </Form.Group>
          <Form.Group controlId="lodging">
            <Form.Label>Lodging Costs</Form.Label>
            <Form.Control
              type="number"
              placeholder="$$"
              name="lodging"
              onChange={handleChange}
              value={trip.lodging}
            />
          </Form.Group>
          <Form.Group controlId="costs">
            <Form.Label>Other Expenses</Form.Label>
            <Form.Control
              type="number"
              placeholder="$$"
              name="costs"
              onChange={handleChange}
              value={trip.costs}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default TripCreate
