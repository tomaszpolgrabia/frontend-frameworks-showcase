import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom';
import GlobalContext from './GlobalContext';
import PeopleIndex from "./views/People/PeopleIndex";
import PeopleAdd from "./views/People/PeopleAdd";
import PeopleEdit from "./views/People/PeopleEdit";
import {PeopleService} from "./views/People/PeopleService";

function App() {
    return (
        <GlobalContext.Provider value={{peopleService: new PeopleService()}}>
            <div>
                <Router>
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="/">
                                <h2 id="logo" className="is-uppercase bold" i18n="app-people-management-limited-label">
                                    PeopleIndex management limited
                                </h2>
                            </a>

                            <a href="#logo" role="button" className="navbar-burger" aria-label="menu"
                               aria-expanded="false"
                               data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className="navbar-menu">
                            <div className="navbar-start">
                                <Link className="navbar-item" to="/">
                                    Home
                                </Link>

                                <Link className="navbar-item" to="/people/add">
                                    Add person
                                </Link>

                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <a href="#logo" className="button is-primary">
                                            <strong>Sign up</strong>
                                        </a>
                                        <a href="#logo" className="button is-light">
                                            <strong>Log in</strong>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <Switch>
                        <Route path="/people/" exact={true}>
                            <PeopleIndex/>
                        </Route>
                        <Route path="/people/add" exact={true}>
                            <PeopleAdd/>
                        </Route>
                        <Route path="/people/edit/:personId" exact={true} children={<PeopleEdit/>}/>
                        <Route path="/" exact={true}>
                            <PeopleIndex/>
                        </Route>
                        <Route>
                            404 page
                        </Route>
                    </Switch>
                </Router>
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
