import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { filterByLogLevel, LogLevel } from "./utils.js";

const logFilePrefixes =
    [
        "log",
        "Crawiling.log",
        "Search.log",
        "SPE.log",
        "Client.log",
        "OWin.log",
        "Publising.log",
    ];

function formatDate(date?: string): string {
    const d = date ? new Date(date) : new Date();
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join("");
}

export function getLogsPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        `logging-get-logs`,
        `Retrieves Sitecore logs from the log directory.`,
        {
            name: z.string()
                .optional()
                .default("log")
                .describe(`The name of the log file to retrieve. If not provided, defaults to log.*. Possible options: ${logFilePrefixes.join(", ")}.`),
            level: z.enum(Object.values(LogLevel) as [string, ...[string]])
                .optional()
                .default(LogLevel.DEBUG)
                .describe("The level of the log to retrieve. Defaults to DEBUG."),
            date: z.string()
                .optional()
                .describe(`The date of the log file to retrieve. If not provided, defaults to today. Date format should be in ISO 8601 format (e.g., '2023-10-01T00:00:00Z'`),
            tail: z.number()
                .optional()
                .default(500)
                .describe("The number of lines to retrieve from the end of the log file. Defaults to 500."),
        },
        async (params) => {
            const stringDate = formatDate(params.date);
            const command = `Get-ChildItem -Path $SitecoreDataFolder/logs/${params.name}*${stringDate}*.* | Sort LastWriteTime | Get-Content -Tail ${params.tail} `;

            return safeMcpResponse((async () => {
                const json = await runGenericPowershellCommand(config, command, {});

                const filteredLogs = filterByLogLevel(JSON.parse(json.content[0].text as string) as any, LogLevel[params.level as keyof typeof LogLevel] || LogLevel.DEBUG);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(filteredLogs, null, 2),
                        },
                    ],
                    isError: false,
                };
            })());
        }
    );
}