import React from 'react';
import aboutUsApi from '../../api/aboutUs.api';
import { Jumbotron, Col} from 'react-bootstrap';
import AboutUsForm from './AboutUsForm.jsx';

class AboutUsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            aboutUs: '',
        };
    }

    componentDidMount() {
        aboutUsApi
            .get()
            .then((response) => {
                this.setState({
                    aboutUs: response,
                });
            })
            .catch(() => {
                this.props.toastError('There was an error getting about us');
            });
    }

    setAboutUsState(event) {
        this.setState({aboutUs: event.target.value});
    }

    submit(event) {
        event.preventDefault();

        aboutUsApi
            .put(this.state)
            .then(() => {
                this.props.toastSuccess('About us updated');
            })
            .catch(() => {
                this.props.toastError('There was an error saving about us');
            });
    }

    render() {
        return (
            <Col md={6} mdOffset={3}>
                <Jumbotron>
                    <h1>About Us</h1>

                    <AboutUsForm aboutUs={this.state.aboutUs} onChange={this.setAboutUsState.bind(this)} onSubmit={this.submit.bind(this)} />
                </Jumbotron>
            </Col>
        );
    }
}

AboutUsPage.propTypes = {
    toastSuccess: React.PropTypes.func,
    toastError: React.PropTypes.func,
};

export default AboutUsPage;