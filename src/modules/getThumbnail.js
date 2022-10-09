// https://www.youtube.com/embed/ts0Ek3nLHew?rel=0

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