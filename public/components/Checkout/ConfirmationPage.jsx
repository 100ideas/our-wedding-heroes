import React from 'react';
import { Link } from 'react-router';

import './Confirmation.styl';

function ConfirmationPage() {
    return (
        <section className="confirmation">
            <h1 className="confirmation__title">Thank you very much for your gift!</h1>

            <div className="confirmation__content">
                <p>You will receive an email (this is still a work in progress) with your gift confirmation.</p>

                <p>We will then be in touch with our bank transfer details, as all payments are offline.</p>
            </div>

            <Link to="" className="btn btn-success" role="button">Back to Home</Link>
        </section>
    );
}

export default ConfirmationPage;
