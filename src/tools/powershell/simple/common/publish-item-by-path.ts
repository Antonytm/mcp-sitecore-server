import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function publishItemByPathPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-publish-item-by-path",
        "Publishes a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item that should be published."),
            target: z.string().optional()
                .describe("Specifies the publishing target. The default target database is 'web'."),
            recurse: z.boolean().optional()
                .describe("Publishes the subitems with the root item."),
            publishMode: z.enum(["Full", "Incremental", "SingleItem", "Smart"]).optional()
                .describe("Specifies the Publish mode."),
            publishRelatedItems: z.boolean().optional()
                .describe("Publishes the related items."),
            republishAll: z.boolean().optional()
                .describe("Republishes all items provided to the publishing job."),
            compareRevisions: z.boolean().optional()
                .describe("Turns revision comparison on."),
            fromDate: z.date().optional()
                .describe("Publishes items newer than the date provided only."),
            asJob : z.boolean().optional()
                .describe("The Sitecore API called to perform the publish is different with this parameter."),
            language: z.string().optional()
                .describe("The language of the item that should be published. Supports globbing/wildcards."),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database).")
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
            };
            const command = `Publish-Item`;

            if (params.target) {
                options["Target"] = params.target;
            }

            if (params.recurse) {
                options["Recurse"] = getSwitchParameterValue(params.recurse);
            }

            if (params.publishMode) {
                options["PublishMode"] = params.publishMode;
            }

            if (params.publishRelatedItems) {
                options["PublishRelatedItems"] = getSwitchParameterValue(params.publishRelatedItems);
            }
            
            if (params.republishAll) {
                options["RepublishAll"] = getSwitchParameterValue(params.republishAll);
            }

            if (params.compareRevisions) {
                options["CompareRevisions"] = getSwitchParameterValue(params.compareRevisions);
            }

            if (params.fromDate) {
                options["FromDate"] = params.fromDate;
            }

            if (params.asJob) {
                options["AsJob"] = getSwitchParameterValue(params.asJob);
            }

            if (params.language) {
                options["Language"] = params.language;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}