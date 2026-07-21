import { describe, it, expect } from "vitest";
import { inferToolAnnotations } from "../../src/tool-annotations";

describe("inferToolAnnotations", () => {
    it("marks get-* tools as read-only", () => {
        const a = inferToolAnnotations("common-get-item-field-by-id");
        expect(a.readOnlyHint).toBe(true);
        expect(a.destructiveHint).toBeUndefined();
    });

    it("marks query/introspection tools as read-only", () => {
        expect(inferToolAnnotations("query-graphql-master").readOnlyHint).toBe(true);
        expect(inferToolAnnotations("introspection-graphql-edge").readOnlyHint).toBe(true);
    });

    it("marks delete/remove tools as destructive", () => {
        const del = inferToolAnnotations("item-service-delete-item");
        expect(del.readOnlyHint).toBe(false);
        expect(del.destructiveHint).toBe(true);

        const rem = inferToolAnnotations("common-remove-item-version-by-id");
        expect(rem.destructiveHint).toBe(true);
    });

    it("marks set/add/new tools as non-destructive writes", () => {
        const set = inferToolAnnotations("presentation-set-layout-by-id");
        expect(set.readOnlyHint).toBe(false);
        expect(set.destructiveHint).toBe(false);
    });

    it("does not treat unlock/unprotect as destructive (token, not substring, match)", () => {
        expect(inferToolAnnotations("security-unlock-item-by-id").destructiveHint).toBe(false);
        expect(inferToolAnnotations("security-unprotect-item-by-id").destructiveHint).toBe(false);
    });

    it("marks run-powershell-script as destructive and open-world", () => {
        const a = inferToolAnnotations("run-powershell-script");
        expect(a.readOnlyHint).toBe(false);
        expect(a.destructiveHint).toBe(true);
        expect(a.openWorldHint).toBe(true);
    });

    it("always includes a human-readable title", () => {
        expect(inferToolAnnotations("common-get-archive").title).toBe("Common Get Archive");
    });
});
