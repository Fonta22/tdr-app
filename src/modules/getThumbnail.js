/**
 * Returns the thumbnail of the specified YouTube video.
 * 
 * @param {string} url URL of the YouTube video
 * @returns {string} URL of the thumbnail of the YouTube video
 */
export function getThumb(url) {
    const type = url.split('/')[3].split('?')[0];

    if (type === 'embed') {
        const vi = url.split('/').pop().split('?')[0];
        const thumb = 'https://img.youtube.com/vi/' + vi + '/0.jpg';
        return thumb;
    }
    else if (type === 'watch') {
        const vi = url.split('/').pop().split('?v=').pop();
        const thumb = 'https://img.youtube.com/vi/' + vi + '/0.jpg';
        return thumb;
    }
}