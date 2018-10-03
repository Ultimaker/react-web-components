import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2 } from '@storybook/addon-knobs/react';
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
import UM3PrinterIcon from '../components/icons/um3_printer_icon';
import UM3XPrinterIcon from '../components/icons/um3x_printer_icon';
import UMS5PrinterIcon from '../components/icons/ums5_printer_icon';
import MultiplyIcon from '../components/icons/multiply_icon';
import MoveUpIcon from '../components/icons/move_up_icon';

const stories = storiesOf('Icons', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px'
    }));

const colorOptions = {
    'black': 'black',
    'blue': 'blue',
    'red': 'red',
    'green': 'green',
    'orange': 'orange',
    'grey': 'grey',
    'white': 'white'
};
const colorDefaultValue = 'black';

const sizeOptions = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg'
};
const sizeDefaultValue = 'sm';

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
                    <ApprovedIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="PendingIcon">
                    <PendingIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="RejectedIcon">
                    <RejectedIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="PausedIcon">
                    <PausedIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DisabledIcon">
                    <DisabledIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="TransferIcon">
                    <TransferIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="WarningIcon">
                    <WarningIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="HighlightIcon">
                    <HighlightIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="EmailIcon">
                    <EmailIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="PasswordIcon">
                    <PasswordIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="WebsiteIcon">
                    <WebsiteIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="ProfileIcon">
                    <ProfileIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DownloadIcon">
                    <DownloadIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UploadIcon">
                    <UploadIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="LinkIcon">
                    <LinkIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="RequiredIcon">
                    <RequiredIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DraftIcon">
                    <DraftIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="PublishedIcon">
                    <PublishedIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UnpublishedIcon">
                    <UnpublishedIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="BuildPlateIcon">
                    <BuildPlateIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="CameraIcon">
                    <CameraIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DeleteIcon">
                    <DeleteIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="MaintenanceIcon">
                    <MaintenanceIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="SingleArrowIcon">
                    <SingleArrowIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="DoubleArrowIcon">
                    <DoubleArrowIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="SegmentIcon">
                    <SegmentIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="SettingsIcon">
                    <SettingsIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UM3PrinterIcon">
                    <UM3PrinterIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UM3XPrinterIcon">
                    <UM3XPrinterIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="UMS5PrinterIcon">
                    <UMS5PrinterIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="MultiplyIcon">
                    <MultiplyIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>
            <GridItem layoutWidth="fit">
                <Tooltip tooltipText="MoveUpIcon">
                    <MoveUpIcon color={selectV2('Color', colorOptions, colorDefaultValue)} size={selectV2('Size', sizeOptions, sizeDefaultValue)} />
                </Tooltip>
            </GridItem>


        </Grid>
    </div>
));
