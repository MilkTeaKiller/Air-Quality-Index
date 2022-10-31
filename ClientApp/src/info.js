import React from "react";
import {
    NavLink
} from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown, Table, Card, Dropdown } from 'react-bootstrap';
import logo from './logo.png';
import gototop from './gototop.jpg';

function Info(props) {
    
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        window.scroll(0, 0);
    }

    return (
        
        <div style={{ backgroundColor: "#c5d2d8" }} >

            <img src={gototop} onClick={topFunction} id="myBtn" title="Go to top" style={{ display: "block" }} />
            <Navbar bg="light" variant="light" expand="sm" style={{ "zIndex": "100" }}>
                <Container>
                    <img src={logo} alt="Logo" width="60" height="60" />
                    <Navbar.Brand >
                        <NavDropdown title="MOYU" id="main" data-toggle="dropdown">
                            <Dropdown.Item href="/main#table" className="maindrop">
                                Live Data For Stations
                            </Dropdown.Item>
                            <Dropdown.Item href="/main#top5" className="maindrop">
                                TOP 5 Station Comparison ( MY / VN )
                            </Dropdown.Item>
                            <Dropdown.Item href="/main#HistoryAreaGraph" className="maindrop">
                                History Area Graph
                            </Dropdown.Item>
                            <Dropdown.Item href="/main#forecast" className="maindrop">
                                Forecast
                            </Dropdown.Item>
                        </NavDropdown>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{ "textAlign": "center" }}>
                            <NavLink to="/map" className="navl">MAP</NavLink>
                            <NavLink to='/search' className="navl">Search</NavLink>
                            <NavDropdown title="Information" id="infonav">
                                <NavDropdown.Item href="/information#airpl">What is air pollution?</NavDropdown.Item>
                                <NavDropdown.Item href="/information#lungaffect">How does air pollution affect the lungs?</NavDropdown.Item>
                                <NavDropdown.Item href="/information#respiratory">What is respiratory disease?</NavDropdown.Item>
                                <NavDropdown.Item href="/information#protect">How do I protect myself from air pollution?</NavDropdown.Item>
                            </NavDropdown>
                            <NavLink to='/aboutUs' className="navl">GroupMoyu</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Card className="informationblock box-shadow-1" id="airpl">
                <h2>What is air pollution?</h2>
                <p>
                    Two common types of air pollutants that each reach unhealthy levels and affect lung health:<br />
                    <b>Ground level ozone smog</b>, commonly referred to as smog, is formed by a chemical reaction between volatile organic compounds (VOCs) and nitrogen oxides (NOx) in the presence of sunlight.<br />
                    VOCs usually come from engine exhaust.<br />
                    NOx gases are produced from the reaction among nitrogen and oxygen during combustion. Vehicle engine fuel combustion is one of the largest producers of NOx gases.<br />
                    Ozone concentrations can reach unhealthy levels when the weather is hot and sunny with little or no wind. Unlike upper atmosphere ozone, which occurs naturally and is beneficial because of its protective qualities, ground level ozone is manmade air pollutant that can have harmful effects on both humans and the environment. Daily ozone levels are typically highest in the evening and lowest around sunrise.<br />
                </p>
                <br />
                <p>
                    <b>Fine particulate matter</b>, refers to tiny particles or droplets in the air (nearly invisible to the naked eye), usually a by-product of combustion, such as auto and diesel exhaust, power plant emissions or wood smoke.
                    Soot can reach high levels under the same weather conditions as smog. It can also occur at any time of the year when dry, calm and clear conditions can allow particle pollution to concentrate. Soot reduces visibility and causes the air to appear hazy when levels are elevated.
                </p>
                <p>
                    <b>Common Air pollution factors</b><br/>
                    <ul>
                        <li>PM2.5- particles that are 2.5 microns or less in diameter</li>
                        <li>PM10- particles that are 10 micrometers or less in diameter</li>
                        <li>CO2- Carbon Dioxide</li>
                        <li>SOX- Sulfur oxide, can form acid rain if has a presence of catalyst </li>
                        <li>NOX- Nitrogen oxide, a reddish-brown toxic gas that has sharp, biting odor.</li>
                        <li>CO- Carbon monoxide, a toxic gas that is colorless and odorless</li>
                    </ul>
                </p>
            </Card>
            <br />
            <Card className="informationblock box-shadow-1" id="lungaffect">
                <h2>How does air pollution affect the lungs?</h2>
                <p>
                    Breathing in air pollutions can irritate your airways and may cause shortness of breath, coughing, wheezing, asthma episodes and chest pain. Exposure to air pollution puts you at risk for lung cancer, heart attacks, stroke and in extreme cases, premature death.
                </p>
                <p>
                    <b>Air pollution is a danger to lung health, particularly for:</b>
                    <ul>
                        <li>Babies and children, whose normal breathing is faster than older children and adults.</li>
                        <li>The elderly, who may have higher respiratory rates.</li>
                        <li>People who work or speed time outdoors.</li>
                        <li>People with heart or lung disease.</li>
                    </ul>
                    <b>Understand each category of aqi:</b>
                    <ul>
                        <li><b>Good (0-50)</b>
                            <ul>
                                <li>The air quality is safe, with little or no pollution</li>
                                <li>Feel free to engage in any outdoor activities</li>
                            </ul>
                        </li>
                        <li><b>Moderate (51-100)</b>
                            <ul>
                                <li>The air quality is acceptable</li>
                                <li>People with special constitutions may experience discomfort</li>
                            </ul>
                        </li>
                        <li><b>Unhealthy for Sensitive Groups (101-150)</b>
                            <ul>
                                <li>Will affect sensitive people</li>
                                <li>General public is unlikely to be affected</li>
                            </ul>
                        </li>
                        <li><b>Unhealthy (151-200)</b>
                            <ul>
                                <li>Will affect general public</li>
                                <li>Sensitive people will experience more serious health effcts</li>
                            </ul>
                        </li>
                        <li><b>Very Unhealthy (201-300)</b>
                            <ul>
                                <li>Emergency Condition</li>
                                <li>Everyone should avoid outdoor activities</li>
                            </ul>
                        </li>
                        <li><b>Hazardous (301 and above)</b>
                            <ul>
                                <li>Serious warning</li>
                                <li>Everyone will experiences severe symptoms</li>
                            </ul>
                        </li>
                    </ul>
                </p>
            </Card>
            <br />
            <Card className="informationblock box-shadow-1" id="respiratory">
                <h2>What is respiratory disease?</h2>
                <p>
                    A type of disease that affects the lungs and other parts of the respiratory system. Respiratory diseases may be caused by infection, by smoking tobacco, or by breathing in secondhand tobacco smoke, radon, asbestos, or other forms of air pollution. Respiratory diseases include asthma, chronic obstructive pulmonary disease (COPD), pulmonary fibrosis, pneumonia, and lung cancer. Also called lung disorder and pulmonary disease.
                </p>
                <p>
                    <b>Health Effect of Air Pollution, other than respiratory disease</b><br />
                    <ul>
                        <li>heart disease</li>
                        <li>COPD (Chronic obstructive pulmonary disease)</li>
                        <li>stroke </li>
                        <li>lung cancer</li>
                    </ul>
                    <b>You may experience:</b><br />
                    <ul>
                        <li>difficulty in breathing</li>
                        <li>worsening of existing respiratory and cardiac conditions</li>
                        <li>asthma </li>
                        <li>coughing</li>
                    </ul>
                </p>

            </Card>
            <br />
            <Card className="informationblock box-shadow-1" id="protect">
                <h2>How do I protect myself from air pollution?</h2>
                <ul>
                    <li>To form the habit of checking the air quality index (API) levels.</li>
                    <li>If API levels is above 150, avoid outdoor activities.</li>
                    <li>Wear mask when needed</li>
                    <li>Seek for treatement if you feel uncomfortable under bad air quality</li>

                </ul>
                <ul><b>Caring for the environment to reduce air pollution, you can:</b>
                    <li>Use public transportation</li>
                    <li>Use clean energy and avoid using firewoord or coal</li>
                    <li>Avoid open burning</li>
                    <li>Avoid using gas-powered lawn equipment.</li>
                    <li>Encourage others to protect environment</li>
                </ul>
            </Card>
            <div className="footer">
                <hr />
                <footer>
                    GROUP MOYU @ 2021
                </footer>
            </div>
        </div>
    );
}

export default Info;