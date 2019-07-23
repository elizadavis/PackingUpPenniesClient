import React, { Component } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Layout from '../../shared/Layout'
import apiUrl from '../../apiConfig'
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'

class Expenses extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expenses: [],
      deleted: false,
      error: null
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/expenses`)
      .then(res => this.setState({ expenses: res.data.expenses, loaded: true }))
      .catch(err => this.setState({ error: err.message }))
  }

  destroy = (id) => {
    axios({
      url: (`${apiUrl}/expenses/${id}`),
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      // .then(() => this.props.alert('You deleted a book!', 'danger'))
      .catch(err => this.setState({ error: err.message }))
  }

  render () {
    const { expenses, error, loaded } = this.state
    // const { user } = this.props
    const expensesList = expenses.map(expense => (
      <tr key={expense._id}>
        <td>{expense.higherItem}</td>
        <td>{expense.higherCost}</td>
        <td>{expense.lowerItem}</td>
        <td>{expense.lowerCost}</td>
      </tr>
    ))

    if (!loaded) {
      return <p>Loading...</p>
    }

    if (expenses.length === 0) {
      return <p>No expenses found - input some to get started!</p>
    }

    if (error) {
      return <p>Error: {error}</p>
    }

    return (
      <Layout md="8" lg="6">
        <aside>
          <Table>
            <thead>
              <tr>
                <th>Expensive Option</th>
                <th>Expensive Cost</th>
                <th>Cheaper Option</th>
                <th>Cheaper Cost</th>
              </tr>
            </thead>
            <tbody>
              {expensesList}
            </tbody>
          </Table>
        </aside>
      </Layout>
    )
  }
}

export default Expenses

// <Button href={`#expenses/${this.props.match.params.id}/edit`}>Edit</Button>
