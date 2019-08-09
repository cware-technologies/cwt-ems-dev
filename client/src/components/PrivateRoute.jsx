import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ component: Component, accessFunction, ...rest }) {
    console.log("PRIVATE ROUTE: ", accessFunction())
    return (
        <Route
            {...rest}
            render={props =>
                accessFunction() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}