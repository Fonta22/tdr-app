import React, { useState, useEffect } from 'react';
import { isMobile } from "react-device-detect";

const About = () => {
    const [margin, setMargin] = useState('auto');

    useEffect(() => {
        if (!isMobile) setMargin(200);
    }, []);

    return (
        <div>
            <center>
                <h1>About</h1>
                <p>This website was made by <b>Pau Fontàs</b> as <i>Treball de Recerca</i>.</p>
            </center>
            <br />
            <div style={{ marginLeft: margin, marginRight: margin }}>
                <h2>Abstract</h2>
                <p id="en" align="justify">
                    <img className="flagicon" src="https://www.speedrun.com/images/flags/gb.png" alt="English" />&nbsp;&nbsp;
                    My work consists of the creation of a web page, using the <b>public APIs</b> from <b>NASA</b> and the technology of the JavaScript framework <b>React JS</b>, one of the most used tools in the world of programming today, and the most relevant with which most web pages are made of nowadays (Facebook, Instagram, among others). The goal is to learn React, a necessary skill in today's programming world, and also explain how NASA's APIs work. The APIs return metadata, which is data contained in JSON format, in this case, which must be processed to be displayed visually in the form of a web page. This <i>Treball de Recerca</i> brings together two of the topics that I am most interested in: <b>programming and space</b>.
                </p>
                <p id="ca" align="justify">
                    <img className="flagicon" src="https://www.speedrun.com/images/flags/es/ct.png" alt="Catalan" />&nbsp;&nbsp;
                    El meu treball consisteix en la realització d'una pàgina web, empleant les <b>APIs públiques</b> de la <b>NASA</b>, i la tecnologia del framework de JavaScript <b>React JS</b>, una de les eines més utilitzades en el món de la programació actual i la més rellevant, amb la qual la majoria de les pàgines webs actuals estàn fetes (Facebook, Instagram, entre altres). L'objectiu és aprendre React, una habilitat necessària en el món de la programació actual, i també explicar com funcionen les APIs de la Nasa. Les APIs, retornen metadata, és a dir, dades contingudes en aquest cas en format JSON, les quals s'han de tractar per a mostrar-les visualment en forma de pàgina web. Aquest <i>Treball de Recerca</i> uneix dos dels meus temes d'interés: <b>la programació i l'espai</b>.
                </p>
                <p id="es" align="justify">
                    <img className="flagicon" src="https://www.speedrun.com/images/flags/es.png" alt="Spanish" />&nbsp;&nbsp;
                    Mi trabajo consiste en la realización de una página web, empleando las <b>APIs públicas</b> de la <b>NASA</b> y la tecnología del framework de JavaScript <b>React JS</b>, una de las herramientas más utilizadas en el mundo de la programación actual y la más relevante, con la que la mayoría de las páginas web actuales están desarrolladas (Facebook, Instagram, entre otras). El objetivo es aprender React, una habilidad necesaria en el mundo de la programación actual, y, también, explicar cómo funcionan las APIs de la Nasa. Las APIs devuelven metadata, es decir, datos contenidos, en este caso, en formato JSON, las cuales han de ser tratadas para mostrarlas visualmente en forma de página web. Este <i>Treball de Recerca</i> une dos de mis temas de interés: <b>la programación y el espacio</b>.
                </p>
            </div>
        </div>
    );
}

export default About;
