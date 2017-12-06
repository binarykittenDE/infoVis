import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'; //Github fetch
import {Router, Route, Link, IndexRedirect} from 'react-router'
import {MainView} from './components/mainview/MainView';

require("./App.scss");
//var url = require("./assets/imagename.png");
import BrowserHistory from 'react-router/lib/BrowserHistory';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hello: 'Welche Kulturangebote Münchens Touristen nutzen'
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.hello}</h1>
                <header className="tab-navigation">
                    <span className="tab"><Link to="/main" activeClassName="active-tab">Startseite</Link>
                    </span>
                </header>
                <main>
                    {this.props.children}
                    <div id="chart_div"></div>
                </main>
            </div>
        );
    }
}

ReactDOM.render((
    <Router history={BrowserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/main" />
            <Route path="main" component={MainView}/>
        </Route>
    </Router>
), document.getElementById('content'));
