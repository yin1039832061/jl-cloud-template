import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

function withRouter(Component: React.FC<any>) {
    return function RouterProps(props: JSX.IntrinsicAttributes) {
        const params = useParams();
        const location = useLocation();
        const navigate = useNavigate();
        return <Component {...props} router={{ params, location, navigate }} />;
    };
}
export default withRouter;