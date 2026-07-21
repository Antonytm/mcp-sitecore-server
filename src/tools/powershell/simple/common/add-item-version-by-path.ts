import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";
import { getSwitchParameterValue } from "../../utils.js";

export function addItemVersionByPathPowerShellTool(server: McpServer, config: Config) {
    server.registerTool(
        "common-add-item-version-by-path",
        {
            description: "Creates a version of the item (by its path) in a new language based on an existing language version.",
            inputSchema: {
                path: z.string()
                    .describe("The path of the item to add version for (e.g. /sitecore/content/Home)."),
                language: z.string().optional()
                    .describe("Language that will be used as source language. If not specified the current user language will be used."),
                targetLanguage: z.string().optional()
                    .describe("Language that should be created."),
                recurse: z.boolean().optional()
                    .describe("Process the item and all of its children."),
                ifExist: z.enum(["Append", "Skip", "OverwriteLatest"]).default("Append"),
                ifNoSourceVersion: z.enum(["Skip", "Add"]).default("Skip"),
                doNotCopyFields: z.boolean().optional()
                    .describe("Creates a new version in the target language but does not copy field values from the original language."),
                ignoredFields: z.array(z.string()).optional()
                    .describe("List of fields that should not be copied over from original item."),
                database: z.string().optional()
                    .describe("The database containing the item (defaults to the context database)."),
            },
        },
        async (params) => {
            const options: Record<string, any> = {
                "Path": params.path,
            };
            const command = `Add-ItemVersion`;

            if (params.language) {
                options["Language"] = params.language;
            }
            
            if (params.targetLanguage) {
                options["TargetLanguage"] = params.targetLanguage;
            }

            if (params.recurse) {
                options["Recurse"] = getSwitchParameterValue(params.recurse);
            }

            if (params.ifExist) {
                options["IfExist"] = params.ifExist;
            }

            if (params.ifNoSourceVersion) {
                options["IfNoSourceVersion"] = params.ifNoSourceVersion;
            }

            if (params.doNotCopyFields) {
                options["DoNotCopyFields"] = getSwitchParameterValue(params.doNotCopyFields);
            }

            if (params.ignoredFields && params.ignoredFields.length > 0) {
                options["IgnoredFields"] = params.ignoredFields;
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
