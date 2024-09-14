import React from 'react';
import { Spinner } from 'react-bootstrap';

const AppSpinner = ({clsname, type="grow"}) => {
    return (
        <div className={`${clsname} d-flex justify-content-center align-items-center text-dark fw-bold my-5 fs-5`}>
            <Spinner animation={type} />
        </div>
    )
}

export default AppSpinner