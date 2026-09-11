import { describe, it, expect, afterAll } from "vitest";
import { client, transport, callTool } from "../../../../client";
import { seedScratch, SAMPLE_WORKFLOW } from "../../../../fixtures";

await client.connect(transport);

/**
 * The regression this file exists for: an item created through `run-powershell-script` used to
 * land OUTSIDE its template's default workflow, while the same create in the Content Editor
 * landed in Draft. Sitecore applies `__Default workflow` only when `Context.Site.EnableWorkflow`
 * is true, and the remoting endpoint resolves its site from the request host — on a multi-site
 * CM that is a content site with workflow off. The client now wraps every script in a switch
 * to the `shell` site with the content database pinned, which is what this proves end to end.
 *
 * Nothing here depends on seeded content: the template, its standard values and the item are
 * all the scratch's own, and the cleanup takes the lot.
 */
const scratch = await seedScratch("script-context");
afterAll(() => scratch.cleanup());

describe("powershell", () => {
    it("run-powershell-script runs as the shell site with master as the context database", async () => {
        const result = await callTool(client, "run-powershell-script", {
            script: `@{ site = [Sitecore.Context]::Site.Name; enableWorkflow = [Sitecore.Context]::Site.EnableWorkflow; database = [Sitecore.Context]::Database.Name } | ConvertTo-Json -Compress`,
        });
        expect(result.isError).toBeFalsy();
        const wrapper = JSON.parse(result.content[0].text);
        const payload = JSON.parse(Array.isArray(wrapper?.Obj) ? wrapper.Obj[0] : wrapper);
        expect(payload.site).toBe("shell");
        expect(payload.enableWorkflow).toBe(true);
        expect(payload.database).toBe("master");
    });

    it("an item created by a script receives its template's default workflow", async () => {
        // Arrange: give the scratch template standard values that name the Sample Workflow as
        // the default. Sitecore's own Sample Workflow ships with every CM, so this seeds nothing.
        const arrange = await callTool(client, "run-powershell-script", {
            script: `
$ErrorActionPreference = "Stop"
$template = Get-Item -Path "master:${scratch.template.path}"
$sv = New-Item -Path $template.Paths.Path -Name "__Standard Values" -ItemType $template.ID
$sv.Editing.BeginEdit() | Out-Null
$sv["__Default workflow"] = "${SAMPLE_WORKFLOW.id}"
$sv.Editing.EndEdit() | Out-Null
$template.Editing.BeginEdit() | Out-Null
$template["__Standard values"] = $sv.ID.ToString()
$template.Editing.EndEdit() | Out-Null
'"arranged"'`.trim(),
        });
        expect(arrange.isError).toBeFalsy();

        // Act: create an item the way any agent script would.
        const act = await callTool(client, "run-powershell-script", {
            script: `
$ErrorActionPreference = "Stop"
$item = New-Item -Path "master:${scratch.root.path}" -Name "Probe" -ItemType "${scratch.template.path}"
@{ workflow = [string]$item["__Workflow"]; state = [string]$item["__Workflow state"] } | ConvertTo-Json -Compress`.trim(),
        });
        expect(act.isError).toBeFalsy();
        const wrapper = JSON.parse(act.content[0].text);
        const fields = JSON.parse(Array.isArray(wrapper?.Obj) ? wrapper.Obj[0] : wrapper);

        // Assert against the fixture's constants, not against what the CM happens to hold.
        expect(fields.workflow.toUpperCase()).toBe(SAMPLE_WORKFLOW.id);
        expect(fields.state.toUpperCase()).toBe(SAMPLE_WORKFLOW.draft);
    });
});
