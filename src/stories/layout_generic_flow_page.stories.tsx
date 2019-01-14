import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';

import { GenericFlowPage } from '../components/generic_flow_page';
import Spinner from '../components/spinner';
import ApprovedIcon from '../components/icons/approved_icon';

const stories = storiesOf('Example layouts', module);

stories.addDecorator(withKnobs);

stories.add('Generic Flow Page', withInfo(
    'A example layout for a flow page',
)(() => (
    <div style={{ marginTop: '6rem' }}>
        <GenericFlowPage
            title="Enabling cloud connectivity"
            description="Waiting for the printer to enable cloud service, this can take a few seconds."
            image={<ApprovedIcon size="lg" color="green" />}
        >
            <Spinner />
        </GenericFlowPage>
    </div>
)));
