import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
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
import DownloadIcon from '../components/icons/download_icon';
import UploadIcon from '../components/icons/upload_icon';
import LinkIcon from '../components/icons/link_icon';
import DraftIcon from '../components/icons/draft_icon';
import PublishedIcon from '../components/icons/published_icon';
import UnpublishedIcon from '../components/icons/unpublished_icon';
import RequiredIcon from '../components/icons/required_icon';
import ProfileIcon from '../components/icons/profile_icon';
import BuildPlateIcon from '../components/icons/build_plate_icon';
import CameraIcon from '../components/icons/camera_icon';
import DeleteIcon from '../components/icons/delete_icon';
import DisabledIcon from '../components/icons/disabled_icon';
import TransferIcon from '../components/icons/transfer_icon';
import MaintenanceIcon from '../components/icons/maintenance_icon';
import SingleArrowIcon from '../components/icons/single_arrow_icon';
import DoubleArrowIcon from '../components/icons/double_arrow_icon';
import PausedIcon from '../components/icons/paused_icon';
import SegmentIcon from '../components/icons/segment_icon';
import SettingsIcon from '../components/icons/settings_icon';
import Um3PrinterIcon from '../components/icons/um3_printer_icon';
import Um3xPrinterIcon from '../components/icons/um3x_printer_icon';
import Ums5PrinterIcon from '../components/icons/ums5_printer_icon';

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
                <Tooltip tooltipText="PausedIcon">
                    <PausedIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DisabledIcon">
                    <DisabledIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="TransferIcon">
                    <TransferIcon />
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
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="ProfileIcon">
                    <ProfileIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DownloadIcon">
                    <DownloadIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UploadIcon">
                    <UploadIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="LinkIcon">
                    <LinkIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="RequiredIcon">
                    <RequiredIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DraftIcon">
                    <DraftIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="PublishedIcon">
                    <PublishedIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UnpublishedIcon">
                    <UnpublishedIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="BuildPlateIcon">
                    <BuildPlateIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="CameraIcon">
                    <CameraIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DeleteIcon">
                    <DeleteIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="MaintenanceIcon">
                    <MaintenanceIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="SingleArrowIcon">
                    <SingleArrowIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DoubleArrowIcon">
                    <DoubleArrowIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="SegmentIcon">
                    <SegmentIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="SettingsIcon">
                    <SettingsIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="Um3PrinterIcon">
                    <Um3PrinterIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="Um3xPrinterIcon">
                    <Um3xPrinterIcon />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="Ums5PrinterIcon">
                    <Ums5PrinterIcon />
                </Tooltip>
            </GridItem>

            
        </Grid>
    </div>
));
