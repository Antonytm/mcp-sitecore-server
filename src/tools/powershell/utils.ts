export function prepareArgsString(parameters: Record<string, any>): string {
    let scriptWithParameters = "";
    if (parameters) {
        for (const parameter in parameters) {
            if (parameters[parameter] === "") {
                scriptWithParameters += ` -${parameter}`;
            }
            else if (Array.isArray(parameters[parameter])) {
                scriptWithParameters += ` -${parameter} "${parameters[parameter].join('","')}"`;
            } else {
                scriptWithParameters += ` -${parameter} "${parameters[parameter]}"`;
            }
        }
    }

    return scriptWithParameters;
}

export function generateUUID(): string {
    // Do not use crypto.randomUUID() directly in tests, as it can cause issues with snapshot testing.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}