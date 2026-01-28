/**
 * Capitalizes the first character of a string and makes the rest lowercase
 * @param str - The string to capitalize
 * @returns The capitalized string or empty string if input is falsy
 */
export const capitalizeFirst = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes the first character of a string but preserves the rest of the string as-is
 * @param str - The string to capitalize
 * @returns The capitalized string or empty string if input is falsy
 */
export const capitalizeFirstOnly = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats an array of strings by capitalizing each and replacing hyphens with spaces
 * @param areas - Array of strings to format
 * @returns Formatted string with items joined by commas
 */
export const formatAreas = (areas: string[]): string => {
    if (!areas || !Array.isArray(areas) || areas.length === 0) return '';
    
    return areas
        .map(area => capitalizeFirstOnly(area).replace(/-/g, ' '))
        .join(', ');
};
