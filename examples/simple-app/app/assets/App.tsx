// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

import InputField from '../../../../src/components/input_field'
export class App extends React.Component {
    render(): JSX.Element {
        return <div>
            <InputField type="text" onChangeHandler={() => {}}/>
            <InputField type="textarea" focusOnLoad onChangeHandler={() => {}}/>
        </div>
    }
}
