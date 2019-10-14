import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import GeneratorForm from './forms/GeneratorForm';
import { Container } from 'reactstrap';
import PageHeader from './forms/PageHeader';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <PageHeader />
                    <Container>
                        <GeneratorForm />
                    </Container>]
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));