import translate from 'translate';

export async function translateText(text) {
    translate.engine = 'google';
    const cat = await translate(text, { to: "ca" });
    return cat;
}