import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs  } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import styles from "@sambego/storybook-styles";

// components
import Form from '../components/form';
import { InputField } from '../components/input_field';

const stories = storiesOf('Layouts', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
	}));

stories.add('Form', withInfo(
    'A example layout for a form'
)(() =>
	<Form>
		<InputField onChangeHandler={console.log} />
		<InputField onChangeHandler={console.log} />
	</Form>
));
