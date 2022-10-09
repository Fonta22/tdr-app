/**
 * Geneartes a Google Maps URL with the specified coordinates and zoom level.
 * 
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @param {number} zoom Zoom level
 * @returns {string} The Google Maps URL with the specified coordinates and zoom level
 */
export function getMapURL(lat, lon, zoom) {
    return `https://maps.google.com/?q=${lat},${lon}&ll=${lat},${lon}&z=${zoom}`;
}