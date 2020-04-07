/**
 * This file was generated from KonamiWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export type CodeTypeEnum = "default" | "custom";

export type CustomKeyEnum = "up" | "down" | "left" | "right" | "A" | "B";

export interface CustomKonamiCodeType {
    customKey: CustomKeyEnum;
}

export type OnKonamiActionEnum = "mxAction" | "comicSansMode" | "upsideDownMode";

export interface CustomKonamiCodePreviewType {
    customKey: CustomKeyEnum;
}

export interface KonamiWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    hintText?: DynamicValue<string>;
    codeType: CodeTypeEnum;
    customKonamiCode: CustomKonamiCodeType[];
    resetDelay: BigJs.Big;
    restartDelay: BigJs.Big;
    onKonamiAction: OnKonamiActionEnum;
    onKonamiMendixAction?: ActionValue;
}

export interface KonamiWidgetPreviewProps {
    class: string;
    style: string;
    hintText: string;
    codeType: CodeTypeEnum;
    customKonamiCode: CustomKonamiCodePreviewType[];
    resetDelay: number | null;
    restartDelay: number | null;
    onKonamiAction: OnKonamiActionEnum;
    onKonamiMendixAction: {} | null;
}
