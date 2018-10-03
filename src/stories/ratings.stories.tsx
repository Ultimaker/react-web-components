// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';
import {storiesOf} from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, selectV2 } from '@storybook/addon-knobs/react';
import styles from "@sambego/storybook-styles";

import Ratings from '../components/ratings'

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

const stories = storiesOf('Ratings', module);

const iconOptions = {
    approved: ApprovedIcon,
    email: EmailIcon,
    highlight: HighlightIcon,
    password: PasswordIcon,
    pending: PendingIcon,
    rejected: RejectedIcon,
    warning: WarningIcon,
    website: WebsiteIcon,
    download: DownloadIcon,
    upload: UploadIcon,
    link: LinkIcon,
    draft: DraftIcon,
    published: PublishedIcon,
    unpublished: UnpublishedIcon,
    required: RequiredIcon,
    profile: ProfileIcon,
    build_plate: BuildPlateIcon,
    camera: CameraIcon,
    delete: DeleteIcon,
    disabled: DisabledIcon,
    transfer: TransferIcon,
    maintenance: MaintenanceIcon,
    single_arrow: SingleArrowIcon,
    double_arrow: DoubleArrowIcon,
    paused: PausedIcon,
    segment: SegmentIcon,
    settings: SettingsIcon,
    um3_printer: UM3PrinterIcon,
    um3x_printer: UM3XPrinterIcon,
    ums5_printer: UMS5PrinterIcon,
}
const colorOptions = {
    'black': 'black',
    'blue': 'blue',
    'red': 'red',
    'green': 'green',
    'orange': 'orange',
    'grey': 'grey',
    'white': 'white'
};

const sizeOptions = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg'
};

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }));

stories.add('Ratings', withInfo(
    'Ratings component'
)(() =>
    <Ratings
        max={number("Maximum rating", 5)}
        rating={number("Current rating", 3.5)}
        Icon={iconOptions[selectV2("Icon", Object.keys(iconOptions), 'highlight')]}
        foregroundColor={selectV2("Foreground color", colorOptions, Ratings.defaultProps.foregroundColor)}
        backgroundColor={selectV2("Background color", colorOptions, Ratings.defaultProps.backgroundColor)}
        size={selectV2("Size", sizeOptions, Ratings.defaultProps.size)}
    />
));
