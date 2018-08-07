// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// components
import App from '../components/app';
import Header from '../components/header';
import Navigation from '../components/navigation';
import LoadingPage from '../components/loading_page';
import CuraLogo from '../components/icons/cura_logo';
import UltimakerLogo from '../components/icons/ultimaker_logo'
import Footer from '../components/footer';

// views
import PageNotFoundView from '../views/page_not_found';

// utils
import { I18n } from '../utils/i18n';

export interface BaseAppState {
    scopes: string[];
    isLoggedIn: boolean;
    error: string;
}

/**
 * Typing for Route. Extends default Route with some new props.
 */
export interface BaseAppRoute {
    path: string;
    label: string;
    visible?: boolean;
    component: React.ComponentClass | React.StatelessComponent;
    scopes?: string[];
    props?: object;
}

/**
 * Our main application class.
 */
export default abstract class BaseApp extends React.Component<{}, BaseAppState> {

    /**
     * Fetch the OAuth scopes from the back-end.
     */
    protected abstract _fetchScopes(): void

    /**
     * Get the app routes.
     */
    protected abstract _getRoutes(): BaseAppRoute[]

    /**
     * Get the app base URL.
     */
    protected abstract _getAppUrl(): string

    /**
     * Get the login view component.
     */
    protected abstract _getLoginUrl(): string

    /**
     * Set the default state.
     */
    state: BaseAppState = {
        scopes: [],
        isLoggedIn: null,
        error: ''
    }

    // keeps the result of this._getRoutes so it doesn't need to be recalculated
    private readonly _appRoutes: BaseAppRoute[]

    protected constructor(props) {
        super(props)
        this._createRoute = this._createRoute.bind(this)
        this._appRoutes = this._getRoutes()
    }

    componentDidMount(): void {
        this._fetchScopes()
    }

    render(): JSX.Element {
        return (
            <App fixedHeader>
                <Header headerLogo={<UltimakerLogo />} headerLogoUrl={this._getAppUrl()} showNav>
                    { this._renderNavigation()}
                </Header>
                <div className="content app__main" role="main">
                    { this._renderRoutes() }
                </div>
                <Footer>
                    { this._renderFooter() }
                </Footer>
            </App>
        )
    }

    /**
     * Renders all available routes.
     */
    protected _renderRoutes(): JSX.Element {
        return (
            <Switch>
                { this._appRoutes.map(this._createRoute) }
                <Route component={PageNotFoundView} />
            </Switch>
        )
    }

    /**
     * Renders the navigation items.
     */
    protected _renderNavigation(): JSX.Element {
        return (
            <Navigation navLinks={this._appRoutes} />
        )
    }

    /**
     * Renders the footer.
     */
    protected _renderFooter(): JSX.Element {
        return (
            <a>{I18n.translate("Footer About link", "About")}</a>
        )
    }

    /**
     * Create a routed component.
     * @param route - The specification of the route to be created.
     * @param key - The index of the route in the application routes.
     * @return The created route, or a redirect route if the user is denied access.
     */
    protected _createRoute(route: BaseAppRoute, key: number): Route {
        const {path, scopes: requiredScopes, props, component: Component} = route
        const {scopes: actualScopes, isLoggedIn} = this.state

        // by default we only have access if the component requires no additional scopes.
        let hasAccess = !requiredScopes;

        // determine if the user currently has access
        if (requiredScopes && isLoggedIn && requiredScopes.every(scope => actualScopes.indexOf(scope) >= 0)) {
            hasAccess = true;
        }

        console.log("Rendering", {key, route, state: this.state})
        // render will either show the login page or the component, passing on any parameters
        const render = ({match: {params}}) => hasAccess ?
            <Component scopes={actualScopes} {...props} {...params} />
                : isLoggedIn === null ? <LoadingPage />
                    : <Redirect to={this._getLoginUrl()} />;

        // return the rendered view
        return <Route key={key} render={render} path={path} exact />;
    }

    /**
     * Set the authentication state to loading.
     */
    protected _setAuthLoading(): void {
        this.setState({ isLoggedIn: null, scopes: null });
    }

    /**
     * Set the authentication state for the whole app.
     * @param scopes List of scopes that the user has access to.
     * @param error An optional error message.
     */
    protected _setAuth(scopes: string[], error?: string): void {
        this.setState({ isLoggedIn: scopes !== null, scopes, error });
    }
}
