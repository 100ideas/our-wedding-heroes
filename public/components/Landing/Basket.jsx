import React from 'react';
import { Link } from 'react-router';
import FontAwesome from '../common/FontAwesome.jsx';

import './Basket.styl';

class Basket extends React.Component {
    render() {
        let element;

        if (this.props.basketCount > 0) {
            element = (
                <section className="basket-summary">
                    <div style={{ marginRight: '6px' }}>
                        <FontAwesome icon="shopping-basket" />
                    </div>

                    <div style={{ marginRight: '6px' }}>
                        {this.props.basketCount} item(s)
                    </div>

                    <div style={{ marginRight: '6px' }}>
                        £{this.props.total}
                    </div>

                    <Link to="basket" className="btn btn-success btn-sm">
                        Checkout
                    </Link>
                </section>
            );
        } else {
            element = null;
        }

        return element;
    }
}

Basket.propTypes = {
    items: React.PropTypes.object.isRequired,
    basketCount: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired,
};

export default Basket;
