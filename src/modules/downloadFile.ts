/**
 * Downloads a local file from the public/ directory.
 * 
 * @param {string} src File source
 */
export async function downloadFile(src: string): Promise<void> {
    const response = await fetch(src);
    const blob = await response.blob();

    const fileURL: string = window.URL.createObjectURL(blob);
    console.log(fileURL);
        
    let alink: HTMLAnchorElement = document.createElement('a');
    alink.href = fileURL;
    alink.download = src;
    alink.click();
}