
id={id}
                className={classes}
                onClick={this._onClickHandler}
                disabled={disabled || showSpinner}
                type={type}
            >
                <span className="text">{children}</span>
                {showSpinner
                    && <Spinner />
                }
            </button>
        );
    }

    render(): JSX.Element {
        const {
            disabled, type, style, shape, showSpinner, className, linkURL,
        } = this.props;

        const classes = classNames(`btn btn--${style} btn--${shape} ${className}`,
            { disabled }, { waiting: showSpinner });

        if (type === 'link' && this._isLinkInternal()) {
            return this._renderInternalLink(classes);
        }
        if (type === 'link' && !disabled && !showSpinner && linkURL) {
            return this._renderExternalLink(classes);
        }

        return this._renderButton(classes);
    }
}

export default Button;
