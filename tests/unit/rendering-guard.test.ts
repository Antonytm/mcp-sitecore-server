import { describe, it, expect } from "vitest";
import {
    renderingLookupGuard,
    renderingNotFoundMessage,
} from "../../src/tools/powershell/composite/presentation/rendering-guard";

describe("renderingLookupGuard", () => {
    it("emits a $null check for a single rendering variable", () => {
        const guard = renderingLookupGuard("$rendering", "not found");
        expect(guard).toBe("if ($null -eq $rendering) { Write-Error 'not found'; return; }");
    });

    it("emits an empty-collection check when collection is true", () => {
        const guard = renderingLookupGuard("$sourceRenderings", "not found", { collection: true });
        expect(guard).toBe("if (@($sourceRenderings).Count -eq 0) { Write-Error 'not found'; return; }");
    });

    it("uses Write-Error (not throw), so the SPE transport returns the message instead of an HTTP 500", () => {
        const guard = renderingLookupGuard("$rendering", "not found");
        expect(guard).toContain("Write-Error");
        expect(guard).not.toContain("throw");
    });

    it("escapes single quotes in the message so it cannot break out of the string literal", () => {
        // A message containing a quote (or a hostile value interpolated into it) must
        // stay a single PowerShell string literal.
        const guard = renderingLookupGuard("$rendering", "it's '; Remove-Item /sitecore; '");
        expect(guard).toBe(
            "if ($null -eq $rendering) { Write-Error 'it''s ''; Remove-Item /sitecore; '''; return; }"
        );
    });
});

describe("renderingNotFoundMessage", () => {
    it("includes the lookup description and points at the listing tool", () => {
        const msg = renderingNotFoundMessage(
            "a rendering with unique ID '{ABC}' on the item with ID '{DEF}' in database 'master'",
            "presentation-get-rendering-by-id"
        );
        expect(msg).toContain("Get-Rendering returned nothing for a rendering with unique ID '{ABC}'");
        expect(msg).toContain("use presentation-get-rendering-by-id to list");
        expect(msg).toContain("shared vs final");
    });
});
