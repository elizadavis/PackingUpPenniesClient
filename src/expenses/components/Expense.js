import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Layout from '../../shared/Layout'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

class Expense extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expense: {
        higherItem: '',
        higherCost: '',
        lowerItem: '',
        lowerCost: '',
        difference: '',
        owner: ''
      },
      error: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/expenses/${this.props.match.params.id}`)
      .then(res => this.setState({ expense: { ...res.data.expense, loaded: true } }))
      .catch(err => this.setState({ error: err.message }))
  }

  destroy = () => {
    axios({
      url: (`${apiUrl}/expenses/${this.props.match.params.id}`),
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      // .then(() => this.props.alert('You deleted a book!', 'danger'))
      .catch(err => this.setState({ error: err.message }))
  }

  // handleSubmit = event => {
  //   event.preventDefault()
  //   axios({
  //     url: `${apiUrl}/trips/${this.props.match.params.id}`,
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     },
  //     data: { book: this.state.book }
  //   })
  //     .then(res => this.setState({ edited: true }))
  //     .then(console.log)
  //     .catch(console.error)
  // }

  update = () => {
  }

  render () {
    const { expense, error, deleted } = this.state
    // const { user } = this.props
    // const buttons = (
    //   <div>
    //     <Button className="mr-2" variant="danger" onClick={this.destroy}>Delete</Button>
    //   </div>
    // )

    if (deleted) {
      return <Redirect to={
        { pathname: '/expenses' }
      } />
    }

    if (error) {
      return <p>Error: {error}</p>
    }

    return (
      <Layout md="8" lg="6">
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
            <tr>
              <td>{expense.higherItem}</td>
              <td>{expense.higherCost}</td>
              <td>{expense.lowerItem}</td>
              <td>{expense.lowerCost}</td>
              <td><Button className="mr-2" variant="primary" onClick={this.update}>Cheaper Choice!</Button></td>
              <td><Button className="mr-2" variant="danger" onClick={this.destroy}>Delete</Button></td>
            </tr>
          </tbody>
        </Table>
        <Link to='/expenses'>Back to Expense List</Link>
      </Layout>
    )
  }
}

export default withRouter(Expense)
