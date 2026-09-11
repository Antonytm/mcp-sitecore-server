import { describe, it, expect } from "vitest";
import { PowershellCommandBuilder, quotePowerShellString, wrapInScriptContext } from "../../src/tools/powershell/command-builder";

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

describe("wrapInScriptContext", () => {
    // Why a script is wrapped at all: Sitecore applies a template's default workflow at create
    // time only when Context.Site.EnableWorkflow is true. The remoting endpoint resolves its site
    // from the request host, which on a multi-site CM is a content site with workflow OFF, so a
    // page created through this server landed outside its workflow while the same create in the
    // Content Editor (site `shell`) landed in Draft.
    it("wraps the script in a shell site switch with the content database pinned by default", () => {
        const wrapped = wrapInScriptContext("Get-Item -Path 'master:/sitecore/content'");
        expect(wrapped).toContain("[Sitecore.Configuration.Factory]::GetSite('shell')");
        expect(wrapped).toContain("New-Object Sitecore.Sites.SiteContextSwitcher($__mcpSite)");
        expect(wrapped).toContain("New-Object Sitecore.Data.DatabaseSwitcher([Sitecore.Configuration.Factory]::GetDatabase('master'))");
        expect(wrapped).toContain("try {\r\nGet-Item -Path 'master:/sitecore/content'\r\n} finally {");
        // Both switchers are disposed, database first, so the site is restored last.
        expect(wrapped.indexOf("$__mcpDbSwitcher.Dispose()")).toBeLessThan(wrapped.indexOf("$__mcpSiteSwitcher.Dispose()"));
    });

    it("returns the script untouched when the site is empty (the documented opt-out)", () => {
        expect(wrapInScriptContext("1 + 1", { site: "", database: "master" })).toBe("1 + 1");
        expect(wrapInScriptContext("1 + 1", { site: "   " })).toBe("1 + 1");
    });

    it("switches the site without pinning a database when the database is empty", () => {
        const wrapped = wrapInScriptContext("1 + 1", { site: "shell", database: "" });
        expect(wrapped).toContain("GetSite('shell')");
        expect(wrapped).not.toContain("DatabaseSwitcher");
        expect(wrapped).not.toContain("$__mcpDbSwitcher");
    });

    it("emits the names as single-quoted literals so a configured value cannot escape the string", () => {
        const wrapped = wrapInScriptContext("1 + 1", { site: "x'; Remove-Item master:/sitecore -Recurse; '", database: "master" });
        expect(wrapped).toContain("GetSite('x''; Remove-Item master:/sitecore -Recurse; ''')");
    });

    it("throws inside Sitecore, not silently, when the site does not exist", () => {
        const wrapped = wrapInScriptContext("1 + 1", { site: "no-such-site" });
        expect(wrapped).toContain("if ($null -eq $__mcpSite) { throw");
    });
});
