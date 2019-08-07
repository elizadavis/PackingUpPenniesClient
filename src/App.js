import React, { Component, Fragment } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
// import Expenses from './expenses/components/Expenses'
// import Expense from './expenses/components/Expense'
// import ExpenseCreate from './expenses/components/ExpenseCreate'
import Trips from './trips/components/Trips'
import TripCreate from './trips/components/TripCreate'
import Trip from './trips/components/Trip'
import Home from './shared/Home'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/tripcreate' render={() => (
            <TripCreate user={user} alert={this.alert} />
          )} />
          <AuthenticatedRoute user={user} exact path='/trips/:id' render={() => (
            <Trip user={user} alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/trips' render={() => (
            <Trips user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

// <Route user={user} exact path='/dashboard' render={() => (
//   <Fragment>
//     <Trips user={user} />
//     // <Expenses user={user} />
//     // <ExpenseCreate user={user} />
//   </Fragment>
// )} />
// <AuthenticatedRoute user={user} exact path='/expenses' render={() => (
//   <Expenses user={user} />
// )} />
// <AuthenticatedRoute user={user} exact path='/expenses/:id' render={() => (
//   <Expense user={user} />
// )} />

export default App
