import translate from 'translate';

/**
 * Using the Google Translate engine translates a text in any language to Catalan.
 * 
 * @param {string} text Text in any langauge
 * @returns {string} Text translated to Catalan
 */
export async function translateText(text: string): Promise<string> {
    translate.engine = 'google';
    const cat: Promise<string> = await translate(text, { to: "ca" });
    return cat;
}