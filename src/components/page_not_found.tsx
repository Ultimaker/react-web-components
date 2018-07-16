// Copyright (c) 2018 Ultimaker B.V.
import Settings from '../Settings'
import * as React from 'react'
import { Redirect } from 'react-router-dom'

// components
import Button from 'react-web-components/src/components/button'
import Page from 'react-web-components/src/components/page'
import Tile from 'react-web-components/src/components/tile'

// utils
import { I18n } from 'react-web-components/src/utils/i18n'

/**
 * Available properties for the login view.
 */
export interface LoginViewProps {
    /** Method called after logging in was successful. */
    onLoggedIn: Function;
}

export interface LoginViewState {
    isLoggedIn: boolean;
    isWaiting: boolean;
}

/**
 * The login page.
 * The app will show this page when a user tries to access a protected route but is not logged in with the correct permissions.
 */
export class LoginView extends React.Component<LoginViewProps, LoginViewState> {

    state = {
        isLoggedIn: false,
        isWaiting: false
    }

    signInTimeout = null;

    constructor(props) {
        super(props);

        // bind callbacks once
        this._onWindowMessage = this._onWindowMessage.bind(this);
        this._startOauthFlow = this._startOauthFlow.bind(this);
        this._onTimeout = this._onTimeout.bind(this);
    }

    // listen to oauth flow completion via window messages
    componentDidMount(): void {
        window.addEventListener('message', this._onWindowMessage);
    }

    // stop listening to prevent duplicated listeners on each component load
    componentWillUnmount(): void {
        window.removeEventListener('message', this._onWindowMessage);
    }
    
    render(): JSX.Element {
        if (this.state.isLoggedIn) {
            return <Redirect to={Settings.APP_URL + "/profile"} />
        } else {
            return <Page title={I18n.translate("title sign_in", "Sign In")} maxWidth={550}>
                <Tile padding="lg" align="center">
                    <p>
                        {I18n.translate("signin", "To continue to the Marketplace Portal, please sign in with your Ultimaker Cura Account.")}
                    </p>
                    <Button id="sign-in-button" onClickHandler={this._startOauthFlow} showSpinner={this.state.isWaiting}>
                        {I18n.translate("signin button", "Sign In")}

                    </Button>
                </Tile>
            </Page>
        }
    }

    /**
     * Starts the OAuth2 authentication flow by opening the login URL in a separate window.
     */
    private _startOauthFlow(): void {
        window.open(Settings.LOGIN_URL, 'oauth2', 'toolbar=0,status=0,width=800,height=600');
        this.signInTimeout = setTimeout(this._onTimeout, Settings.SIGN_IN_TIMEOUT);
        this.setState({ isWaiting: true });
    }

    /**
     * Handles the window message callback from the login flow.
     */
    private _onWindowMessage({ data }): void {
        if (data === "oauth_success") {
            if (this.signInTimeout) {
                clearTimeout(this.signInTimeout);
            }
            this.props.onLoggedIn();
            this.setState({ isLoggedIn: true, isWaiting: false });
        }
    }

    /**
     * Handles a timeout on the signin popup to prevent the button from staying in a loading state indefinitely.
     */
    private _onTimeout(): void {
        this.setState({ isLoggedIn: false, isWaiting: false });
    }
}
