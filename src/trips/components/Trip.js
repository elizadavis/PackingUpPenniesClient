import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import Layout from '../../shared/Layout'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import TripForm from './TripForm'
// import Form from 'react-bootstrap/Form'

const blankTrip = {
  destination: '',
  transportation: 0,
  lodging: 0,
  costs: 0,
  total: 0,
  runningTotal: 0,
  owner: ''
}

const Trip = (props) => {
  const [trip, setTrip] = useState(blankTrip)
  const [deleted, setDeleted] = useState(false)
  // const [rTotal, setRTotal] = useState(0)
  const [error, setError] = useState(null)
  // const [loaded, setLoaded] = useState(false)
  // const [edited, setEdited] = useState(false)

  const { id } = props.match.params

  useEffect(() => {
    // const fetchData = async () => {
    axios({
      url: `${apiUrl}/trips/${id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setTrip({ ...res.data.trip }))
      // .then(() => setLoaded(true))
      .catch(err => setError(err.message))
    // fetchData()
  }, [])

  const handleChange = event => {
    // event.preventDefault()
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedTrip = Object.assign(trip, updatedField)
    // console.log(editedTrip)
    setTrip({ ...editedTrip })

    const aTotal = parseInt(trip.transportation) + parseInt(trip.costs) + parseInt(trip.lodging)
    const total = Object.assign(trip, { total: aTotal })

    setTrip({ ...total })
    console.log(total)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/trips/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        trip: trip
      }
    })
      // .then(() => setEdited(true))
      .then(() => props.alert('Trip updated!', 'info'))
      .catch(err => setError(err.message))
  }

  const destroy = () => {
    axios({
      url: `${apiUrl}/trips/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => props.alert('Trip Successfully Deleted!', 'warning'))
      .catch(err => setError(err.message))
  }

  const returnThis = () => {
    if (deleted) {
      return <Redirect to={
        { pathname: '/' }
      } />
    } else if (error) {
      return <p>ERROR: {error}</p>
    } else if (!trip) {
      return <p>Loading...</p>
    } else {
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
              <tr key={trip.id}>
                <td>{trip.destination}</td>
                <td>{trip.transportation}</td>
                <td>{trip.lodging}</td>
                <td>{trip.costs}</td>
                <td>{trip.total}</td>
                <td><Button className="mr-2" variant="danger" onClick={destroy}>Delete</Button></td>
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
  return (
    returnThis()
  )
}

// handleSavingsChange = event => {
//   this.setState({ rTotal: event.target.value })
//   console.log(this.state.rTotal)
//
//   const addSavings = parseInt(this.state.trip.runningTotal) + parseInt(this.state.rTotal)
//   console.log(addSavings)
//
//   const runTotal = Object.assign(this.state.trip, { runningTotal: addSavings })
//   console.log(runTotal)
//
//   this.setState({ trip: runTotal })
// }

//   render () {
//     const { trip, error, deleted } = this.state
//     const { handleChange, handleSubmit } = this

//   }
// }

// <Form onSubmit={handleSubmit}>
//   <Form.Group controlId="rTotal">
//     <Form.Label>Apply Savings</Form.Label>
//     <Form.Control
//       type="number"
//       name="rTotal"
//       onChange={this.handleSavingsChange}
//       value={this.state.rTotal}
//     />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>

export default withRouter(Trip)
