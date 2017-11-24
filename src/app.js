import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'; //Github fetch
import {Router, Route, Link} from 'react-router'
import {MainView} from './components/mainview/MainView';

require("./App.scss");
//var url = require("./assets/imagename.png");
import BrowserHistory from 'react-router/lib/BrowserHistory';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            hello: 'Hello at PQM.'
        };
    }

    createGraph() {
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages': ['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Mushrooms', 3],
                ['Onions', 1],
                ['Olives', 1],
                ['Zucchini', 1],
                ['Pepperoni', 2]
            ]);

            // Set chart options
            var options = {
                'title': 'How Much Pizza I Ate Last Night',
                'width': 400,
                'height': 300
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.hello}</h1>
                <header className="tab-navigation">
                    <span className="tab"><Link to="/search" activeClassName="active-tab">Search and Overview</Link>
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
            <Route path="search" component={MainView}/>
        </Route>
    </Router>
), document.getElementById('content'));
