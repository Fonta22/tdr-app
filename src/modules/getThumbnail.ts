/**
 * Returns the thumbnail of the specified YouTube video.
 * 
 * @param {string} url URL of the YouTube video
 * @returns {string} URL of the thumbnail of the YouTube video
 */
export function getThumb(url: any): any {
    const type: string = url.split('/')[3].split('?')[0];

    if (type === 'embed') {
        const vi: string = url.split('/').pop().split('?')[0];
        const thumb: string = 'https://img.youtube.com/vi/' + vi + '/0.jpg';
        return thumb;
    }
    else if (type === 'watch') {
        const vi: string = url.split('/').pop().split('?v=').pop();
        const thumb: string = 'https://img.youtube.com/vi/' + vi + '/0.jpg';
        return thumb;
    }
}