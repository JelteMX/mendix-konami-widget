import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { KonamiWidgetContainerProps, CustomKeyEnum } from "../typings/KonamiWidgetProps";
import Konami from "react-konami-code";

import "./ui/KonamiWidget.css";

// Comic Sans CSS is hidden as Base64;
const csModeCSS =
    "Ym9keSAqIHtmb250LWZhbWlseToiQ29taWMgU2FucyBNUyIsIkNvbWljIFNhbnMiLGN1cnNpdmUsc2Fucy1zZXJpZiFpbXBvcnRhbnQ7fQ==";
// Upside Down CSS is hidden as Base64;
const upModeCSS =
    "I2NvbnRlbnR7dHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpO2hlaWdodDoxMDB2aDt0cmFuc2Zvcm0tb3JpZ2luOmNlbnRlcjt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxczt9";
const keyCodes: { [key in CustomKeyEnum]: number } = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    A: 65,
    B: 66
};

class KonamiWidget extends Component<KonamiWidgetContainerProps> {
    private action = this._action.bind(this);
    private keyCombo: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    constructor(props: KonamiWidgetContainerProps) {
        super(props);

        if (props.codeType === "custom" && props.customKonamiCode && props.customKonamiCode.length > 3) {
            this.keyCombo = props.customKonamiCode.map(code => keyCodes[code.customKey]);
        }
    }

    render(): ReactNode {
        const className = this.props.class;
        const resetDelay = parseInt(String(this.props.resetDelay), 10);
        const restartDelay = parseInt(String(this.props.restartDelay), 10);

        const child = this.props.hintText?.status === "available" ? this.props.hintText.value : null;

        return (
            <Konami
                action={this.action}
                code={this.keyCombo}
                className={className}
                resetDelay={resetDelay}
                timeout={restartDelay}
            >
                {child}
            </Konami>
        );
    }

    private _action(): void {
        const { onKonamiAction, onKonamiMendixAction } = this.props;

        if (onKonamiAction === "mxAction" && onKonamiMendixAction && onKonamiMendixAction.canExecute) {
            onKonamiMendixAction.execute();
        } else if (onKonamiAction === "comicSansMode") {
            const css = atob(csModeCSS);
            const styleID = "comicSansMode";
            this._applyCSS(css, styleID);
        } else if (onKonamiAction === "upsideDownMode") {
            const css = atob(upModeCSS);
            const styleID = "upsideDownMode";
            this._applyCSS(css, styleID);
        }
    }

    private _applyCSS(css: string, styleID: string): void {
        const head = document.head || document.getElementsByTagName("head")[0];
        const comicSansEl = document.getElementById(styleID);
        if (comicSansEl !== null) {
            return;
        }
        const style = document.createElement("style");

        style.type = "text/css";
        style.id = styleID;
        // @ts-ignore
        if (style.styleSheet) {
            // @ts-ignore
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }
}

export default hot(KonamiWidget);
