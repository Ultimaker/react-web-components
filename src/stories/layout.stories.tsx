import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import {
    withKnobs, text, boolean, selectV2, number,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styles from '@sambego/storybook-styles';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';
/* eslint-enable */

// components
import Tile from '../components/tile';
import Grid from '../components/grid';
import GridItem from '../components/grid_item';
import SlideOutContainer from '../components/slide_out_container';
import SlideInPanel from '../components/slide_in_panel';
import SettingPanel from '../components/setting_panel';
import Carousel from '../components/carousel';
import AspectRatioContainer from '../components/aspect_ratio_container';
import Header from '../components/header';
import Navigation from '../components/navigation';
import UserAccountMenu from '../components/user_account_menu';

import UM3PrinterIcon from '../components/icons/um3_printer_icon';
import UM3XPrinterIcon from '../components/icons/um3x_printer_icon';
import UMS5PrinterIcon from '../components/icons/ums5_printer_icon';

const stories = storiesOf('Layout', module);

stories.addDecorator(withKnobs)
    .addDecorator(styles({
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
    }));

const alignOptions = {
    left: 'left',
    right: 'right',
    center: 'center',
};
const alignDefaultValue = 'center';

const spacingOptions = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    none: 'none',
};
const spacingDefaultValue = 'md';

const layoutWidthOptions = {
    '1/1': '1/1',
    '1/2': '1/2',
    '1/3': '1/3',
    '1/4': '1/4',
    '1/5': '1/5',
};
const layoutWidthDefaultValue = '1/3';

const breakpointOptions = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
};
const breakpointDefaultValue = 'sm';

const tileAppearanceOptions = {
    shadow: 'shadow',
    dashed: 'dashed',
    flat: 'flat',
};
const tileAppearanceDefaultValue = 'shadow';

stories.add('Tile', withInfo(
    'A content tile that can be used as full width or as part of a grid',
)(() => (
    <Tile
        disabled={boolean('Disabled', false)}
        selected={boolean('Selected', false)}
        alert={boolean('Alert', false)}
        success={boolean('Success', false)}
        padding={selectV2('Padding', spacingOptions, spacingDefaultValue)}
        align={selectV2('Align', alignOptions, alignDefaultValue)}
        appearance={selectV2('Appearance', tileAppearanceOptions, tileAppearanceDefaultValue)}
        radius={text('Radius', '')}
    >
        <div>Tile</div>
        <div style={{ marginTop: '1.2rem' }}>Component</div>
    </Tile>
)));

stories.add('Grid', withInfo(
    'A basic grid layout component',
)(() => (
    <div style={{ width: '80vw' }}>
        <Grid
            align={selectV2('Align', alignOptions, alignDefaultValue)}
            gutter={selectV2('Gutter', spacingOptions, spacingDefaultValue)}
        >
            <GridItem layoutWidth="1/1">
                Grid component
            </GridItem>

            <GridItem
                layoutWidth={selectV2('Layout Width', layoutWidthOptions, layoutWidthDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }} />
            </GridItem>

            <GridItem
                layoutWidth={selectV2('Layout Width', layoutWidthOptions, layoutWidthDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }} />
            </GridItem>

            <GridItem
                layoutWidth={selectV2('Layout Width', layoutWidthOptions, layoutWidthDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }} />
            </GridItem>
            <GridItem
                layoutWidth={selectV2('Layout Width', layoutWidthOptions, layoutWidthDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }} />
            </GridItem>
            <GridItem
                layoutWidth={selectV2('Layout Width', layoutWidthOptions, layoutWidthDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }} />
            </GridItem>
            <GridItem
                layoutWidth={selectV2('Layout Width', layoutWidthOptions, layoutWidthDefaultValue)}
                breakpoint={selectV2('Breakpoint', breakpointOptions, breakpointDefaultValue)}
            >
                <div style={{ background: 'grey', height: '100px' }} />
            </GridItem>
        </Grid>
    </div>
)));

const routes = [{
    path: '/profile',
    label: 'Profile',
    component: null,
    visible: true,
},
{
    path: '/settings',
    label: 'Settings',
    component: null,
    visible: true,
}];

stories.add('Header', withInfo(
    'Application header with navigation',
)(() => (
    <BrowserRouter>
        <div style={{ width: '100vw', marginTop: '-50px' }}>
            <Header headerLogoUrl="/" showNav rightSideLabel={text('Label', '')}>
                <Navigation navLinks={routes} manageAccountURL={text('Manage Account URL', '')} onSignOutClickHandler={() => { }}>
                    <UserAccountMenu
                        onSignOutClickHandler={() => { }}
                        displayName="Test User"
                        onSignInClickHandler={() => { }}
                        triggerWidth="10rem"
                    />
                </Navigation>
            </Header>
        </div>
    </BrowserRouter>
)));

stories.add('Carousel', withInfo(
    'A carrousel component',
)(() => {
    const itemCounts = [
        number('Items (xs)', 1),
        number('Items (sm)', 2),
        number('Items (md)', 3),
        number('Items (lg)', 4),
    ];
    const icons = {
        0: <UM3PrinterIcon size="lg" />,
        1: <UM3XPrinterIcon size="lg" />,
        2: <UMS5PrinterIcon size="lg" />,
    };
    return (
        <div style={{ width: `${number('Width (rem)', 30).toString()}rem` }}>
            <Carousel
                itemCounts={itemCounts}
                autoPlayInterval={number('Auto Play Interval', 5000)}
                transitionDuration={number('Transition Duration', 1000)}
            >
                {Array.from(Array(number('Amount of items', 10)).keys()).map(i => (
                    <div key={i} style={{ margin: '0 auto', width: '4.8rem' }}>
                        {icons[i % Object.keys(icons).length]}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}));

stories.add('Slide out container', withInfo(
    'A toggle slide out container',
)(() => (
    <div style={{ width: '80vw' }}>
        <Tile padding="md">
            <SlideOutContainer
                isOpen={boolean('isOpen', true)}
                headerText={text('Header text', 'Slide out container component')}
                onHeaderClick={action('clicked')}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </SlideOutContainer>
        </Tile>
    </div>
)));

stories.add('Slide in panel', withInfo(
    'A toggle slide in panel, that slides into view from the right side of the screen.',
)(() => (
    <div>
        <SlideInPanel
            headerTitle="Panel title"
            headerLabels={[{ label: 'Panel label', info: '1.0.0' }]}
            isOpen={boolean('isOpen', false)}
            width="600px"
            includeFooter
        >
            <div>Panel body</div>
            <div>Panel Footer</div>
        </SlideInPanel>
    </div>
)));

stories.add('Setting Panel', withState({ value: null })(withInfo('Toggle setting with description')(({ store }) => (
    <div style={{ width: '50vw' }}>
        <Tile padding="md">
            <SettingPanel
                toggleId="id"
                headerText="Share anonymous usage data with Ultimaker?"
                trueValueText="Yes, share usage data with Ultimaker"
                falseValueText="No, don't share usage data with Ultimaker"
                explanationText="In order to continuously improve Ultimaker products and your 3D printing experience, this 3D printer can share anonymous usage data with Ultimaker."
                settingValue={store.state.value}
                onChangeHandler={() => store.set({ value: !store.state.value })}
            />
        </Tile>
    </div>
))));

stories.add('Aspect ratio container', withInfo(
    'A container to keep a given aspect ratio for it\'s content, eg. an image or iframe',
)(() => (
    <div style={{ width: '94vw' }}>
        <AspectRatioContainer aspectRatio={(number('Aspect ratio', 16 / 9))} className="my-picture-frame">
            <div className="my-picture-or-video" style={{ backgroundColor: 'grey' }} />
        </AspectRatioContainer>
    </div>
)));
