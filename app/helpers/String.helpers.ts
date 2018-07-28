import * as express from "express";
import { url } from "inspector";
export class StringHelpers {
    public static isNullOrWhitespace(str: string): boolean {
        return !str || !str.trim();
    }
}
