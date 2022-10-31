import './App.css';
import Ack from './ACK';
import Main from './appfile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Map from './map';
import Search from './search';
import Info from './info';
import aboutUs from './aboutUs';
import React from 'react';
import error from './error';

class App extends React.Component {

    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/" component={Ack} />
                    <Route path="/main" component={Main} />
                    <Route path="/map" component={Map} />
                    <Route path="/search" component={Search} />
                    <Route path="/information" component={Info} />
                    <Route path="/aboutUs" component={aboutUs} />
                    <Route path="/sorry" component={error} />
                </Router>
            </div>
        );
    }
  
}

export default App;
