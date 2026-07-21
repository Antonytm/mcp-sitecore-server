/**
 * Wraps a value as a single-quoted PowerShell string literal.
 *
 * PowerShell single-quoted strings are fully literal: `$`, backtick and `"`
 * carry no special meaning inside them, so the only character that must be
 * escaped is the single quote itself, which is escaped by doubling it.
 * This is the safe way to interpolate untrusted values (item paths, names,
 * field values, etc.) into a command string without allowing injection.
 */
export function quotePowerShellString(value: unknown): string {
    return `'${String(value).replace(/'/g, "''")}'`;
}

export class PowershellCommandBuilder
{
    buildCommandString(script: string, parameters: Record<string, any> = {}): string {
        return `${script}${this.buildParametersString(parameters)}`;
    }

    buildParametersString(parameters: Record<string, any> = {}): string {
        let parametersString = '';
        if (parameters) {
            for (const parameter in parameters) {
                if (parameters[parameter] === undefined || parameters[parameter] === null)
                {
                    continue;
                }

                if (parameters[parameter] === "") {
                    parametersString += ` -${parameter}`;
                }
                else if (Array.isArray(parameters[parameter])) {
                    const items = parameters[parameter]
                        .map((item: unknown) => quotePowerShellString(item))
                        .join(",");
                    parametersString += ` -${parameter} ${items}`;
                }
                else if (this.isRecord(parameters[parameter])) {
                    // Check whether the record has any keys
                    if(Object.getOwnPropertyNames(parameters[parameter]).length > 0)
                    {
                        parametersString += ` -${parameter} ${this.buildPowershellHashtableString(parameters[parameter])}`;
                    }
                }
                else {
                    parametersString += ` -${parameter} ${quotePowerShellString(parameters[parameter])}`;
                }
            }
        }

        return parametersString;
    }

    private buildPowershellHashtableString(parameters: Record<string, any>): string {
        let result = "@{ ";
        let first = true;
        for (const parameter in parameters) {
            if (!first)
            {
                result += "; ";
            }

            result += `${quotePowerShellString(parameter)} = ${quotePowerShellString(parameters[parameter])}`;
            first = false;
        }

        result += " }";

        return result;
    }

    private isRecord(value: any): boolean {
        if (!value)
        {
            return false;
        }

        if (typeof value !== "object")
        {
            return false;
        }

        if (Array.isArray(value))
        {
            return false;
        }

        if (Object.getOwnPropertySymbols(value).length > 0)
        {
            return false;
        }

        return Object.getOwnPropertyNames(value).every(prop => typeof value[prop] === "string")
    }
}
