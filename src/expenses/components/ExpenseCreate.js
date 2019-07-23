import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Layout from '../../shared/Layout'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ExpenseCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expense: {
        higherItem: '',
        higherCost: '',
        lowerItem: '',
        lowerCost: '',
        difference: ''
      },
      createdExpenseId: null
    }
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedExpense = Object.assign(this.state.expense, updatedField)

    this.setState({ expense: editedExpense })

    const diff = parseInt(this.state.expense.higherCost) - parseInt(this.state.expense.lowerCost)
    const totalDiff = Object.assign(this.state.expense, { difference: diff })

    this.setState({ expense: totalDiff })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/expenses`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { expense: this.state.expense }
    })
      .then(res => this.setState({ createdTripId: res.data.expense._id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { expense } = this.state

    return (
      <Layout md="8" lg="6">
        <h4>Add an Expense</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="higherItem">
            <Form.Label>Pricier Option</Form.Label>
            <Form.Control
              type="text"
              placeholder="Pricier Option"
              name="higherItem"
              onChange={handleChange}
              value={expense.higherItem}
            />
          </Form.Group>
          <Form.Group controlId="higherCost">
            <Form.Label>Cost of Pricier Option</Form.Label>
            <Form.Control
              type="number"
              placeholder="$$"
              name="higherCost"
              onChange={handleChange}
              value={expense.higherCost}
            />
          </Form.Group>
          <Form.Group controlId="lowerItem">
            <Form.Label>Cheaper Option</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cheaper Option"
              name="lowerItem"
              onChange={handleChange}
              value={expense.lowerItem}
            />
          </Form.Group>
          <Form.Group controlId="lowerCost">
            <Form.Label>Cost of Cheaper Option</Form.Label>
            <Form.Control
              type="number"
              placeholder="$$"
              name="lowerCost"
              onChange={handleChange}
              value={expense.lowerCost}
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

export default withRouter(ExpenseCreate)
