// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

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
		return (
			<div className={"app" + (fixedHeader && "app--fixed-header")}>
				{children}
			</div>
		)
	}

export default App;
