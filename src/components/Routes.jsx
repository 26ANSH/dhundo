import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Results } from './Results'

export const Routes = () => {
    return (
        <div className="p-4">
            <Route exact path="/" >
                <Redirect to="/search" />
            </Route>
            <Route exact path={["/search", "/images", "/videos", "/news"]} >
                <Results />
            </Route>
        </div>
    )
}
