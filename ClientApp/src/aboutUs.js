import React from 'react';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";
import {
    NavLink
} from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown, Table, Card, Dropdown } from 'react-bootstrap';
import logo from './logo.png';
import vs from './vs.png';
import exc from './exc.png';
import aj from './aj.png';
import fy from './fy.png';
import './aboutus.css';

function aboutUs() {
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());

    return (
        <div>
            
            <ScrollContainer>
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
                                <NavLink to="/search" className="navl">Search</NavLink>
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
                <ScrollPage page={0}>
                    <Animator animation={batch(Fade(), MoveOut(0))}>
                        <Card className="page justify-content-center">
                            <div style={{ textAlign: "center" }} >
                            <img src={logo} id="logo" /><br />
                            <div id="introwlogo">
                                <span >We are Group MOYU</span><br/>
                                <span >Group of People who made this web for Air Quality Index 😉</span>
                            </div>
                            </div>
                        </Card>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={1}>
                    <Animator animation={ZoomInScrollOut}>
                        <Card style={{padding : "10%" }}>
                            <div className="font">
                                <span >With Studies :<br/>
                                We have found that there is no website that providing real time information about Air Quality in Malaysia.<br /><br />
                                    Thus: <br/>
                                    We planned this project which will be developing an web application that providing air quality information in forms of visualization, allowing people who lives in Malaysia or anyone else want to investigate air quality of Malaysia to get to know the information they wants easily.
                                <br />
                                <br />
                                    Finally: <br/>
                                    We hope that our working outcome, which is this website can help those who wanted the information and allow them to understand the information related to air quality in Malaysia more easily.
                                </span>
                            </div>
                        </Card>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={2}>
                    <Animator animation={Fade()}>
                        <Card className="page justify-content-center">
                            <h1 style={{  margin: "auto", verticalAlign: "middle"}}><b>Introducing us</b></h1>
                        </Card>
                    </Animator>
                </ScrollPage>
                <ScrollPage page={3} animation={FadeUp}>
                    <div >
                        <Animator animation={MoveIn(-1000, 0)}>
                        <div className="cv justify-content-center" style={{ alignItems: "center", height: "100vh", textAlign: "center", backgroundColor: "#c5d2d8" }}>
                            <div>
                                
                                    <img src={vs} className="photo" />
                            </div>
                            <div className="introContent">
                                
                                
                                    <h1><b> Ong Vin Seng </b></h1>
                                    <div style={{ textAlign: "left" }}>
                                        <p style={{ fontSize: "50%" }}>Role : Leader </p>
                                        <p style={{ fontSize: "50%" }}> Studying Bachelor of Computer Science </p>
                                        <p style={{ fontSize: "50%" }}> Majoring in </p>
                                        <p style={{ fontSize: "50%" }}> - Software Engineering </p>
                                        <p style={{ fontSize: "50%" }}> - Multimedia & Game Development </p>
                                        <p style={{ fontSize: "35%" }}> ✦ In-Charge to lead the group throughout the project.</p>
                                        <p style={{ fontSize: "35%" }}> ✦ Collecting and gather the requirements needed for the web application.  </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Involved in the development of Application (Designing , Coding , Debugging)  </p>
                                    </div>
                                
                                
                            </div>
                            </div>
                        </Animator>
                    </div>
                </ScrollPage>
                <ScrollPage page={4}>
                    <div >
                        <Animator animation={MoveIn(1000, 0)}>
                        <div className="cv2 justify-content-center" style={{ alignItems: "center", height: "100vh", textAlign: "center" }}>
                            <div>
                                    <img src={exc} className="photo" />
                            </div>
                            <div className="introContent">

                                    <h1><b> Soh See Wee </b></h1>
                                    <div style={{ textAlign: "left" }}>
                                        <p style={{ fontSize: "50%" }}>Role : Programmer </p>
                                        <p style={{ fontSize: "50%" }}> Studying Bachelor of Computer Science </p>
                                        <p style={{ fontSize: "50%" }}> Majoring in </p>
                                        <p style={{ fontSize: "50%" }}> - Software Engineering </p>
                                        <p style={{ fontSize: "50%" }}> - Digital System Security </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Mainly in-charge to create the program.</p>
                                        <p style={{ fontSize: "35%" }}> ✦ Monitor the overall code development of application.  </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Involved in the development of Application (Designing , Coding , Debugging)  </p>
                                    </div>

                            </div>
                            </div>
                        </Animator>
                    </div>
                </ScrollPage>
                <ScrollPage page={5}>
                    <div  >
                        <Animator animation={MoveIn(-1000, 0)}>
                        <div className="cv justify-content-center" style={{ alignItems: "center", height: "100vh", textAlign: "center", backgroundColor: "#c5d2d8" }}>
                            <div>
                                    <img src={aj} className="photo" />
                            </div>
                            <div className="introContent">

                                    <h1><b> Anna Jasmine </b></h1>
                                    <div style={{ textAlign: "left" }}>
                                        <p style={{ fontSize: "50%" }}>Role : UI/UX Designer </p>
                                        <p style={{ fontSize: "50%" }}> Studying Bachelor of Computer Science </p>
                                        <p style={{ fontSize: "50%" }}> Majoring in </p>
                                        <p style={{ fontSize: "50%" }}> - Software Engineering </p>
                                        <p style={{ fontSize: "50%" }}> - Digital System Security </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Responsible to design the UI/UX of the website.</p>
                                        <p style={{ fontSize: "35%" }}> ✦ Responsible to implement the bootstrap of the website.  </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Responsible to assist in programming  </p>
                                    </div>

                            </div>
                            </div>
                        </Animator>
                    </div>
                </ScrollPage>
                <ScrollPage page={6}>
                    <div  >
                        <Animator animation={MoveIn(1000, 0)}>
                        <div className="cv2 justify-content-center" style={{ alignItems: "center", height: "100vh", textAlign: "center" }}>
                            <div>
                                    <img src={fy} className="photo" />
                            </div>
                            <div className="introContent">

                                    <h1><b> Wu Fu Yun </b></h1>
                                    <div style={{ textAlign: "left" }}>
                                        <p style={{ fontSize: "50%" }}>Role : Document Manager </p>
                                        <p style={{ fontSize: "50%" }}> Studying Bachelor of Computer Science </p>
                                        <p style={{ fontSize: "50%" }}> Majoring in </p>
                                        <p style={{ fontSize: "50%" }}> - Software Engineering </p>
                                        <p style={{ fontSize: "50%" }}> - Multimedia & Game Development </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Responsible to manage the documentation of the project </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Involve in the information page  </p>
                                        <p style={{ fontSize: "35%" }}> ✦ Program tester  </p>
                                    </div>

                            </div>
                            </div>
                        </Animator>
                    </div>
                </ScrollPage>
                <ScrollPage page={7}>
                    <div style={{ justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", backgroundColor: "#c5d2d8" }}  >
                        <Animator animation={batch(Fade(), Sticky())}>
                        
                            <span style={{ fontSize: "30px"}}>
                            Thanks for visiting our page, that's all about us. シ
                            <br />Hope you have a nice day.<br />
                            (*￣Ｏ￣)ノ BYEBYE
                            </span>
                        
                        </Animator>
                    </div>
                </ScrollPage>
            </ScrollContainer>
        </div>

    );
}
export default aboutUs;