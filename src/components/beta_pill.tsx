// Copyright (c) 2018 Ultimaker B.V.
import * as React from 'react';

// components
import Pill from './pill';
import Tooltip from './tooltip';

// utils
import { I18n } from '..';

/**
 * The translations for this view.
 */
const T = {
    beta: I18n.translate("beta pill text", "BETA"),
    betaExplanation: I18n.translate("beta pill explanation",
        "This feature is in beta and is visible because you are part of the closed beta program."),
};

/**
 * Popup confirming that the user invited other people to join a team.
 */
export default class BetaPill extends React.Component<{}, {}> {
    render() {
        return (
            <Tooltip tooltipText={T.betaExplanation}>
                <Pill active>{T.beta}</Pill>
            </Tooltip>
        );
    }
}
