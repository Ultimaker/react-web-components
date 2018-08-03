import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";
import { withInfo } from '@storybook/addon-info';

import Grid from '../components/grid';
import GridItem from '../components/grid_item';
import Tooltip from '../components/tooltip'
import ApprovedIcon from '../components/icons/approved_icon';
import EmailIcon from '../components/icons/email_icon';
import HighlightIcon from '../components/icons/highlight_icon';
import PasswordIcon from '../components/icons/password_icon';
import PendingIcon from '../components/icons/pending_icon';
import RejectedIcon from '../components/icons/rejected_icon';
import WarningIcon from '../components/icons/warning_icon';
import WebsiteIcon from '../components/icons/website_icon';

const stories = storiesOf('Icons', module);

stories.addDecorator(withKnobs)
  .addDecorator(styles({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px'
  }));

stories.add('Icons', withInfo(
  'All icons'
)(() =>
  <div style={{ width: '80vw' }}>
    <Grid>
      <GridItem layoutWidth="1/1">
        Icons
      </GridItem>

      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="ApprovedIcon">
          <ApprovedIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="PendingIcon">
          <PendingIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="RejectedIcon">
          <RejectedIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="WarningIcon">
          <WarningIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="HighlightIcon">
          <HighlightIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="EmailIcon">
          <EmailIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="PasswordIcon">
          <PasswordIcon />
        </Tooltip>
      </GridItem>
      <GridItem layoutWidth="fit">
        <Tooltip tooltipText="WebsiteIcon">
          <WebsiteIcon />
        </Tooltip>
      </GridItem>

    </Grid>
  </div>
));