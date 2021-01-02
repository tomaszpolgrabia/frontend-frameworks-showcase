import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom';
import {FormattedMessage, IntlProvider} from 'react-intl';
import GlobalContext from './GlobalContext';
import PeopleIndex from "./views/People/PeopleIndex";
import PeopleAdd from "./views/People/PeopleAdd";
import PeopleEdit from "./views/People/PeopleEdit";
import {PeopleService} from "./views/People/PeopleService";
import messages from './locale/messages';

const defaultLocale = 'en';

function App() {
    // this should be read from for example local storage and should be changeable. For now it's fixed.
    const currentLocale = 'en';
    return (
        <IntlProvider locale={currentLocale} defaultLocale={defaultLocale} messages={messages[currentLocale]}>
            <GlobalContext.Provider value={{peopleService: new PeopleService()}}>
                <div>
                    <Router>
                        <nav className="navbar" role="navigation" aria-label="main navigation">
                            <div className="navbar-brand">
                                <a className="navbar-item" href="/">
                                    <h2 id="logo" className="is-uppercase bold">
                                        <FormattedMessage id='app.navbar.banner'/>
                                    </h2>
                                </a>

                                <a href="#logo" role="button" className="navbar-burger" aria-label="menu"
                                   aria-expanded="false"
                                   data-target="mainNavbar">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </a>
                            </div>

                            <div id="mainNavbar" className="navbar-menu">
                                <div className="navbar-start">
                                    <Link className="navbar-item" to="/">
                                        <FormattedMessage id="app.navbar.home"/>
                                    </Link>

                                    <Link className="navbar-item" to="/people/add">
                                        <FormattedMessage id="app.navbar.person.add"/>
                                    </Link>

                                </div>

                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <a href="#logo" className="button is-primary">
                                                <strong><FormattedMessage id="app.navbar.signup"/></strong>
                                            </a>
                                            <a href="#logo" className="button is-light">
                                                <strong><FormattedMessage id="app.navbar.login"/></strong>
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
        </IntlProvider>
    );
}

export default App;
