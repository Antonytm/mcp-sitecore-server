import { quotePowerShellString } from "./command-builder.js";

export function prepareArgsString(parameters: Record<string, any>): string {
    let scriptWithParameters = "";
    if (parameters) {
        for (const parameter in parameters) {
            if (parameters[parameter] === "") {
                scriptWithParameters += ` -${parameter}`;
            }
            else if (Array.isArray(parameters[parameter])) {
                const items = parameters[parameter]
                    .map((item: unknown) => quotePowerShellString(item))
                    .join(",");
                scriptWithParameters += ` -${parameter} ${items}`;
            } else {
                scriptWithParameters += ` -${parameter} ${quotePowerShellString(parameters[parameter])}`;
            }
        }
    }

    return scriptWithParameters;
}

export function getSwitchParameterValue(value: boolean | undefined): string | undefined 
{
    if (value === true)
    {
        return "";
    }

    return undefined;
}

export function getNumberParameterValue(value: number | undefined): number | undefined
{
    if (value || value === 0)
    {
        return value;
    }

    return undefined;
}

