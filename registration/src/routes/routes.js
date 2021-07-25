import { Route } from 'react-router-dom'
import React from 'react'
import MasterLayout from '../layouts/MasterLayout'

const PublicRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) => (
                <MasterLayout>
                    <Component {...props} />
                </MasterLayout>
            )}
        />
    );
};

export default PublicRoute;