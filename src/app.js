import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'; //Github fetch
import {Router, Route, Link, IndexRedirect} from 'react-router'
import {MainView} from './components/mainview/MainView';
import {TouristView} from './components/touristview/TouristView';
import {MuseumView} from './components/museumsview/MuseumView';
import {TheaterView} from './components/theaterview/TheaterView';
import {OrchesterView} from './components/orchesterrview/OrchesterView';
import {CinemaView} from './components/cinemaview/CinemaView';
import {LeisureView} from './components/leisureview/LeisureView';

require("./App.scss");
//var url = require("./assets/imagename.png");
import BrowserHistory from 'react-router/lib/BrowserHistory';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hello: 'Die Nutzung Münchens Kulturangebote - jetzt mit Bildern!'
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.hello}</h1>
                <header className="tab-navigation">
                    <span className="tab"><Link to="/main" activeClassName="active-tab">Startseite</Link></span>
                    <span className="tab"><Link to="/tourist" activeClassName="active-tab">Tourismus</Link></span>
                    <span className="tab"><Link to="/museums" activeClassName="active-tab">Museen</Link></span>
                    <span className="tab"><Link to="/theaters" activeClassName="active-tab">Theater</Link></span>
                    <span className="tab"><Link to="/orchesters" activeClassName="active-tab">Orchester</Link></span>
                    <span className="tab"><Link to="/cinemas" activeClassName="active-tab">Kinos</Link></span>
                    <span className="tab"><Link to="/leisure" activeClassName="active-tab">Freizeit</Link></span>
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
            <Route path="tourist" component={TouristView}/>
            <Route path="museums" component={MuseumView}/>
            <Route path="theaters" component={TheaterView}/>
            <Route path="orchesters" component={OrchesterView}/>
            <Route path="cinemas" component={CinemaView}/>
            <Route path="leisure" component={LeisureView}/>
        </Route>
    </Router>
), document.getElementById('content'));
