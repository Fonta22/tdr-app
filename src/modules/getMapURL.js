export function getMapURL(lat, lon, zoom) {
    return `https://maps.google.com/?q=${lat},${lon}&ll=${lat},${lon}&z=${zoom}`;
}
