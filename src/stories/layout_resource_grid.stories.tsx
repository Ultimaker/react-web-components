import * as React from 'react';

// storybook
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
/* eslint-enable */

// components
import ResourceGrid from '../components/resource_grid';
import ResourceTile from '../components/resource_tile';
import SubResourceList from '../components/sub_resource_list';

const stories = storiesOf('Layout', module);

const logobot = process.env.NODE_ENV === 'development'
    ? '../images/logobot-placeholder-dark.svg'
    : './images/logobot-placeholder-dark.svg';

stories.addDecorator(withKnobs);

stories.add('Resource grid', withInfo(
    'A resource grid layout',
)(() => (
    <div style={{ marginTop: '6rem', marginBottom: '6rem' }}>
        <ResourceGrid
            emptyStateText="Get started by connecting your devices to the cloud"
            emptyStateImageUrl={logobot}
            emptyTileImageUrl={logobot}
            emptyStateImageAlt="My devices"
            emptyTileImageAlt="My devices"
            createButtonText="Add printers"
            onCreate={action('Created')}
        >
            <ResourceTile
                resource={{
                    resourceId: '1',
                    title: 'Printer 1',
                    imageUrl: logobot,
                    imageAlt: 'Printer 1',

                    menuItems: [{
                        id: '123456789',
                        label: 'Share',
                        handler: action('Shared'),
                        disabled: false,
                    }],
                }}
            />
            <ResourceTile
                resource={{
                    resourceId: '2',
                    title: 'Printer 2',
                    imageUrl: logobot,
                    imageAlt: 'Printer 2',

                    menuItems: [{
                        id: '123456789',
                        label: 'Share',
                        handler: action('Shared'),
                        disabled: false,
                    }],
                }}
            >
                <div className="sub-resource-list">Sub-resource</div>
            </ResourceTile>
            <ResourceTile
                resource={{
                    resourceId: '3',
                    title: 'Printer 3',
                    imageUrl: logobot,
                    imageAlt: 'Printer 3',

                    menuItems: [{
                        id: '123456789',
                        label: 'Share',
                        handler: action('Shared'),
                        disabled: false,
                    }],
                }}
            >
                <SubResourceList
                    subResourceTitle="Available to"
                    visibleSubResourceCount={number('Visible sub-resource count', 1)}
                    subResources={[
                        {
                            subResourceId: '1',
                            name: 'User 1',
                            iconUrl: logobot,
                            showIcon: true,
                        },
                        {
                            subResourceId: '2',
                            name: 'User 2',
                            iconUrl: logobot,
                            showIcon: true,
                        },
                        {
                            subResourceId: '3',
                            name: 'User 3',
                            iconUrl: logobot,
                            showIcon: true,
                        },
                        {
                            subResourceId: '4',
                            name: 'User 4',
                            iconUrl: logobot,
                            showIcon: true,
                        },
                    ]}
                />

            </ResourceTile>

            <ResourceTile
                resource={{
                    resourceId: '3',
                    title: 'Printer 3',
                    imageUrl: logobot,
                    imageAlt: 'Printer 3',

                    menuItems: [{
                        id: '123456789',
                        label: 'Share',
                        handler: action('Shared'),
                        disabled: false,
                    }],
                }}
            >
                <SubResourceList
                    subResourceTitle="Available to"
                    visibleSubResourceCount={number('Visible sub-resource count', 1)}
                    subResources={[
                        {
                            subResourceId: '1',
                            name: 'Team 1',
                            showName: true,
                        },
                        {
                            subResourceId: '2',
                            name: 'Team 2',
                            showName: true,
                        },
                    ]}
                />

            </ResourceTile>

        </ResourceGrid>
    </div>
)));
