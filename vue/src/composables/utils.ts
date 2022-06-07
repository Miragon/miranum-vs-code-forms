/**
 * Small helper function to check if a string is valid json.
 * @param str String which is checked.
 */
export function isStringJson(str: string): boolean {
    try {
        JSON.parse(str);
    } catch {
        return false;
    }
    return true;
}
