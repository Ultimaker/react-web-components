// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import * as classNames from 'classnames';

/**
 * Allowed properties for an app.
 *
 * @export
 * @interface AppProps
 */
export interface AppProps {
	fixedHeader?: boolean;
}

/**
 * Application wrapper component that applies the correct CSS classes.
 */
const App: React.StatelessComponent<AppProps> = 
	({ fixedHeader, children }) => {

		const classes = classNames('app', { 'app--fixed-header': fixedHeader });
		
		return (
			<div className={classes}>
				{children}
			</div>
		)
	}

export default App;
