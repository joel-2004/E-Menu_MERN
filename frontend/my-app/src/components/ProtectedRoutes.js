import { Route, Navigate } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
    let auth = { "token": false }
    return <>
        <Route {...rest}>
            {!auth.token
                ? <Navigate to="/Admin"></Navigate> : children
            }
        </Route>
    </>
}

export default PrivateRoutes;