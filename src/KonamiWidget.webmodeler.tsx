import { Component, ReactNode, createElement } from "react";
import { KonamiWidgetPreviewProps } from "../typings/KonamiWidgetProps";

declare function require(name: string): string;

export class preview extends Component<KonamiWidgetPreviewProps> {
    render(): ReactNode {
        return <div>No preview for Konami in WebModeler</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/KonamiWidget.css");
}
