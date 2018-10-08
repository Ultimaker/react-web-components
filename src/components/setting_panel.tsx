import * as React from 'react';

import ToggleButton from './toggle_button';
import SlideOutContainer from './slide_out_container';

export interface SettingPanelProps {
    /** id for the settings toggle button */
    toggleId: string;
    /** The value of the setting toggle */
    settingValue: boolean;
    /** Called when the setting toggle is clicked */
    onChangeHandler: (checked: boolean) => void;
    /** Text to be displayed as the setting header */
    headerText: string;
    /** Text to be displayed when the setting is true */
    trueValueText: string;
    /** Text to be displayed when the setting is false */
    falseValueText: string;
    /** Text to be displayed when the panel is expanded */
    explanationText: string;
}

export interface SettingPanelState {
    showExplanation: boolean;
}

export class SettingPanel extends React.Component<SettingPanelProps, SettingPanelState> {

    constructor(props) {
        super(props);
        this.state = {
            showExplanation: false
        };

        this._handleOnchange = this._handleOnchange.bind(this);
        this._toggleExplanationVisibility = this._toggleExplanationVisibility.bind(this);
    }

    _toggleExplanationVisibility() {
        this.setState({
            showExplanation: !this.state.showExplanation
        });
    }

    _getLabelText(): string {
        const { settingValue, trueValueText, falseValueText } = this.props;
        return settingValue ? trueValueText : falseValueText;
    }

    _handleOnchange(checked: boolean): void {
        this.props.onChangeHandler(checked)
    }

    render(): JSX.Element {
        const { showExplanation } = this.state;
        const { toggleId, settingValue, headerText, explanationText } = this.props;

        return <div className="setting-panel">

            <SlideOutContainer isOpen={showExplanation} headerText={headerText} onHeaderClick={this._toggleExplanationVisibility}>
                <div className="setting-panel__explanation-text">{explanationText}</div>
            </SlideOutContainer>

            <div className="layout setting-panel__option">

                <div className="layout__item u-fill">
                    <div className="setting-panel__value-text">{this._getLabelText()}</div>
                </div>

                <div className="layout__item u-fit-sm">
                    <ToggleButton
                        id={toggleId}
                        value={settingValue}
                        onChangeHandler={this._handleOnchange}
                        disabled={false} />
                </div>
            </div>

        </div>
    }
}

export default SettingPanel;
