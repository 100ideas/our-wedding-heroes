import React from 'react';
import GiverDetailsForm from './GiverDetailsForm';
import giftApi from '../../api/gift.api';
import basketActions from '../../actions/BasketActions';
import basketStore from '../../stores/BasketStore';
import { HOME_ROUTE, confirmationPageRoute } from '../../constants/routeConstants';

import css from './GiverDetailsPage.styl';

export default class GiverDetailsPage extends React.Component {
    static propTypes = {
        toastSuccess: React.PropTypes.func,
        toastError: React.PropTypes.func,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    state = {
        giver: {
            forename: '',
            surname: '',
            email: '',
            phoneNumber: '',
        },
        isSaving: false,
    };

    componentWillMount() {
        const { basketCount } = basketStore.getState();

        if (basketCount <= 0) {
            this.context.router.replace(HOME_ROUTE);
        }
    }

    setGiverState = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.state.giver[field] = value;
        return this.setState({ giver: this.state.giver });
    };

    submit = (event) => {
        event.preventDefault();

        this.setState({ isSaving: true });

        const { items } = basketStore.getState();

        giftApi
            .post({
                giver: this.state.giver,
                items: [...items.values()],
            })
            .then((giftSet) => {
                this.setState({ isSaving: false });
                basketActions.emptyBasket();
                this.context.router.push(confirmationPageRoute(giftSet._id)); // eslint-disable-line no-underscore-dangle
            })
            .catch((error) => {
                this.setState({ isSaving: false });
                this.props.toastError('There was an error', error);
            });
    };

    render() {
        return (
            <section className={css.root}>
                <div className={css.container}>
                    <h1 className={css.title}>Your Details</h1>

                    <GiverDetailsForm
                        giver={this.state.giver}
                        isSaving={this.state.isSaving}
                        onChange={this.setGiverState}
                        onSubmit={this.submit}
                    />
                </div>
            </section>
        );
    }
}
