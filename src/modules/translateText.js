import translate from 'translate';

/**
 * Using the Google Translate engine translates a text in any language to Catalan.
 * 
 * @param {string} text Text in any langauge
 * @returns {string} Text translated to Catalan
 */
export async function translateText(text) {
    translate.engine = 'google';
    const cat = await translate(text, { to: "ca" });
    return cat;
}