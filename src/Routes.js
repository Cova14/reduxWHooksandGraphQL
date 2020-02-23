import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'
import { connect } from 'react-redux'

function PrivateRoute({path, component, loggedIn, ...rest}) {
    if(loggedIn) {
        return <Route path={path} component={component} {...rest} />
    } else {
        return <Redirect to="/login/" {...rest} />
    }
}

function Routes({loggedIn}) {

    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} loggedIn={loggedIn} />
            <PrivateRoute path="/favs" component={FavPage} loggedIn={loggedIn} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}

function mapState({user:{ loggedIn, uid}}) {
    return {
        loggedIn,
        uid
    }
}

export default connect(mapState)(Routes)