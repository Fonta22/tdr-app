import React, { useState, useEffect } from 'react';
import { isMobile } from "react-device-detect";
import { downloadFile } from '../modules/downloadFile.ts';

import Portada from '../img/portada/Portada_1x1.png';

const About = () => {
    const [margin, setMargin] = useState('auto');
    const [imgWidth, setImgWidth] = useState('100%');

    const downloadPDF = async() => {
        const response = await fetch('Treball de Recerca.pdf');
        const blob = await response.blob();

        const fileURL = window.URL.createObjectURL(blob);

        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'Treball de Recerca.pdf';
        alink.click();
    }

    const downloadCSV = async () => {
        const response = await fetch('keywords.csv');
        const blob = await response.blob();

        const fileURL = window.URL.createObjectURL(blob);
        
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'keywords.csv';
        alink.click();
    }

    useEffect(() => {
        if (!isMobile) {
            setMargin(200);
            setImgWidth(650);
        }
    }, []);

    return (
        <div>
            <center>
                <h1>About</h1>
                <p className="about-paragraph">This website was made by <b>Pau Fontàs</b> as <i>Treball de Recerca</i>.</p>
                <img src={Portada} alt="Portada" className="portada-img" style={{ width: imgWidth }} />
                <p>The website's <i>Git</i> repository is available in <b>GitHub <i className="bi bi-github" /></b></p>
                <a href="https://github.com/Fonta22/tdr-app" className="btn btn-outline-primary"><i class="bi bi-git" />&nbsp;&nbsp;Fonta22/tdr-app</a>
            </center>
            <div style={{ marginLeft: margin, marginRight: margin }}>
                <br />
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
                <br />
                <h2>Documents</h2>
                {/*<h4>Download the <i>Treball de Recerca</i></h4>
                <p className="about-paragraph">Download the <i>Treball de Recerca</i> document in <b>PDF</b></p>*/}
                {isMobile ?
                    <center>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>

                                    <th scope="col">Language</th>

                                    <th scope="col">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Treball de Recerca</td>

                                    <td>Catalan</td>

                                    <td>
                                        <button type="button" onClick={() => downloadFile('Treball de Recerca.pdf')} class="btn btn-outline-danger">
                                            <i className="bi bi-file-earmark-pdf-fill" />&nbsp;&nbsp;Download PDF
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Glossary</td>

                                    <td>Catalan</td>

                                    <td>
                                        <button type="button" onClick={() => downloadFile('Glossary.csv')} class="btn btn-outline-success">
                                            <i className="bi bi-file-earmark-spreadsheet-fill" />&nbsp;&nbsp;Download CSV
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                    :
                    <center>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Released</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">File Type</th>
                                    <th scope="col">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Treball de Recerca</td>
                                    <td>20/10/2022</td>
                                    <td>Catalan</td>
                                    <td>PDF</td>
                                    <td>
                                        <button type="button" onClick={() => downloadFile('Treball de Recerca.pdf')} class="btn btn-outline-danger">
                                            <i className="bi bi-file-earmark-pdf-fill" />&nbsp;&nbsp;Download
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Glossary</td>
                                    <td>-</td>
                                    <td>Catalan</td>
                                    <td>CSV</td>
                                    <td>
                                        <button type="button" onClick={() => downloadFile('Glossary.csv')} class="btn btn-outline-success">
                                            <i className="bi bi-file-earmark-spreadsheet-fill" />&nbsp;&nbsp;Download
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                }
                {/*<br />
                <h4>Download the word dictionary</h4>
                <p className="about-paragraph">Download the word dictionary <b>CSV</b> file</p>
                <center>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Released</th>
                                <th scope="col">Language</th>
                                <th scope="col">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>20/10/2022</td>
                                <td>Catalan</td>
                                <td>
                                    <button type="button" onClick={() => downloadFile('keywords.csv')} class="btn btn-outline-success">
                                        <i className="" />&nbsp;&nbsp;Download CSV
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </center>*/}
            </div>
        </div>
    );
}

export default About;
