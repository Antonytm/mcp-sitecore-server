import { describe, it, expect } from "vitest";
import { PowershellCommandBuilder, quotePowerShellString } from "../../src/tools/powershell/command-builder";

describe("quotePowerShellString", () => {
    it("wraps a plain value in single quotes", () => {
        expect(quotePowerShellString("hello")).toBe("'hello'");
    });

    it("escapes embedded single quotes by doubling them", () => {
        expect(quotePowerShellString("O'Brien")).toBe("'O''Brien'");
    });

    it("neutralizes a command-injection payload", () => {
        // A classic injection attempt: break out and run a second command.
        const malicious = "master:'; Remove-Item -Path /sitecore -Recurse; '";
        const quoted = quotePowerShellString(malicious);
        // The dangerous single quotes are doubled, so the whole payload stays a
        // single literal string argument.
        expect(quoted).toBe("'master:''; Remove-Item -Path /sitecore -Recurse; '''");
        expect(quoted.startsWith("'")).toBe(true);
        expect(quoted.endsWith("'")).toBe(true);
    });

    it("leaves $, backticks and double quotes literal (they are inert in single quotes)", () => {
        expect(quotePowerShellString('$(Get-Item) `whoami` "x"')).toBe("'$(Get-Item) `whoami` \"x\"'");
    });

    it("coerces non-string values", () => {
        expect(quotePowerShellString(42)).toBe("'42'");
    });
});

describe("PowershellCommandBuilder.buildParametersString", () => {
    const builder = new PowershellCommandBuilder();

    it("renders a scalar parameter as a single-quoted value", () => {
        expect(builder.buildParametersString({ Path: "/sitecore/content" }))
            .toBe(" -Path '/sitecore/content'");
    });

    it("renders an empty string as a switch flag", () => {
        expect(builder.buildParametersString({ Recurse: "" })).toBe(" -Recurse");
    });

    it("skips null and undefined parameters", () => {
        expect(builder.buildParametersString({ A: null, B: undefined, C: "x" }))
            .toBe(" -C 'x'");
    });

    it("renders arrays as a comma-separated list of quoted values", () => {
        expect(builder.buildParametersString({ Fields: ["a", "b'c"] }))
            .toBe(" -Fields 'a','b''c'");
    });

    it("escapes injection payloads in scalar values", () => {
        const out = builder.buildParametersString({ Name: "x'; Remove-Item; '" });
        expect(out).toBe(" -Name 'x''; Remove-Item; '''");
    });

    it("renders record parameters as an escaped hashtable", () => {
        const out = builder.buildParametersString({ Props: { Title: "O'Brien" } });
        expect(out).toBe(" -Props @{ 'Title' = 'O''Brien' }");
    });
});
