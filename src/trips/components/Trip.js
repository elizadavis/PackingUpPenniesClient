import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import Layout from '../../shared/Layout'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import TripForm from './TripForm'

class Trip extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: null,
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: { ...res.data.trip, loaded: true } }))
      .catch(err => this.setState({ error: err.message }))
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedTrip = Object.assign(this.state.trip, updatedField)

    this.setState({ trip: editedTrip })

    const aTotal = parseInt(this.state.trip.transportation) + parseInt(this.state.trip.costs) + parseInt(this.state.trip.lodging)
    const total = Object.assign(this.state.trip, { total: aTotal })

    this.setState({ trip: total })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/trips/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { trip: this.state.trip }
    })
      .then(res => this.setState({ edited: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/trips/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { trip, error, deleted } = this.state
    const { handleChange, handleSubmit } = this

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Trip Successfully Deleted!' } }
      } />
    }

    if (error) {
      return <p>ERROR: {error}</p>
    }

    if (!trip) {
      return <p>Loading...</p>
    }
    return (
      <Layout>
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
            <tr key={trip._id}>
              <td>{trip.destination}</td>
              <td>{trip.transportation}</td>
              <td>{trip.lodging}</td>
              <td>{trip.costs}</td>
              <td>{trip.total}</td>
              <td><Button className="mr-2" variant="danger" onClick={this.destroy}>Delete</Button></td>
            </tr>
          </tbody>
        </Table>
        <h4>Edit Your Trip</h4>
        <TripForm
          trip={trip}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath='/trips'
        />
      </Layout>
    )
  }
}

export default withRouter(Trip)
