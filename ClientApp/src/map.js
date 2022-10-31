import React from 'react';
import './index.css';
import { useEffect } from 'react';
import * as L from "leaflet";
import { GestureHandling } from 'leaflet-gesture-handling';


import {
    NavLink
} from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown, Card, Dropdown } from 'react-bootstrap';
import logo from './logo.png';
import './map.css';


function Map(props) {
    useEffect(() => {
        let CartoDB_Positron;

        
            CartoDB_Positron = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: "abcd",
                maxZoom: 19,
            }
        );


        let map;

        let allMarkers = {};
        try {
            map = L.map("leaflet-map", {
                attributionControl: false,
                gestureHandling: true,
                zoomSnap: 0.1,
            }).setView([0, 0], 12)
                .addLayer(CartoDB_Positron);
        }
        catch (e) {
            map = L.DomUtil.get('leaflet-map');
            if (map !== undefined) {

                map._leaflet_id = null
        }
            
            L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
            map = L.map("leaflet-map", {
                attributionControl: false,
                gestureHandling: true,
                zoomSnap: 0.1,
            }).setView([0, 0], 12)
                .addLayer(CartoDB_Positron);
           
        }

            map.on("moveend", () => {
                let bounds = map.getBounds();
                bounds =
                    bounds.getNorth() +
                    "," +
                    bounds.getWest() +
                    "," +
                    bounds.getSouth() +
                    "," +
                    bounds.getEast();
                document.getElementById("leaflet-map-bounds").innerHTML = "bounds: " + bounds;

                populateMarkers(bounds);
            });
        
            function populateMarkers(bounds) {
                return fetch(
                    "https://api.waqi.info/map/bounds/?latlng=" + bounds + "&token=37c9ec0b0ebe0bb61232c4c1707d57d8a823ab4b"
                )
                    .then((x) => x.json())
                    .then((stations) => {
                        if (stations.status !== "ok") throw stations.reason;

                        stations.data.forEach((station) => {
                            if (allMarkers[station.uid]) map.removeLayer(allMarkers[station.uid]);

                            let iw = 83,
                                ih = 107;
                            let icon = L.icon({
                                iconUrl: "https://waqi.info/mapicon/" + station.aqi + ".30.png",
                                iconSize: [iw / 2, ih / 2],
                                iconAnchor: [iw / 4, ih / 2 - 5],
                            });

                            let marker = L.marker([station.lat, station.lon], {
                                zIndexOffset: station.aqi,
                                title: station.station.name,
                                icon: icon,
                            }).addTo(map);

                            marker.on("click", () => {
                                console.log("click");
                                let popup = L.popup()
                                    .setLatLng([station.lat, station.lon])
                                    .setContent(station.station.name)
                                    .openOn(map);

                                getMarkerAQI(station.uid).then((aqi) => {
                                    let details = "";
                                    if (!aqi.iaqi.hasOwnProperty('h'))
                                        aqi.iaqi.h = { "v": "NA" };
                                    if (!aqi.iaqi.hasOwnProperty('p'))
                                        aqi.iaqi.p = { "v": "NA" };
                                    if (!aqi.iaqi.hasOwnProperty('t'))
                                        aqi.iaqi.t = { "v": "NA" };
                                    if (!aqi.iaqi.hasOwnProperty('w'))
                                        aqi.iaqi.w = { "v": "NA" };
                                    details = `${details}<b>Relative Humidity</b>:${aqi.iaqi.h.v}<br>`;
                                    details = `${details}<b>Atmostpheric Pressure</b>:${aqi.iaqi.p.v}<br>`;
                                    details = `${details}<b>Temperature</b>:${aqi.iaqi.t.v}<br>`;
                                    details = `${details}<b>Wind</b>:${aqi.iaqi.w.v}<br>`;

                                    popup.setContent(station.station.name + "<br>" + details);
                                });
                            });

                            allMarkers[station.uid] = marker;
                        });

                        return stations.data.map(
                            (station) => new L.LatLng(station.lat, station.lon)
                        );
                    });
            }

            function getMarkerAQI(markerUID) {
                return fetch(
                    "https://api.waqi.info/feed/@" + markerUID + "/?token=37c9ec0b0ebe0bb61232c4c1707d57d8a823ab4b"
                )
                    .then((x) => x.json())
                    .then((data) => {
                        if (data.status !== "ok") throw data.reason;
                        return data.data;
                    });
            }
            populateMarkers("6,98,3,104").then((bounds) => {
                map.fitBounds(bounds, { maxZoom: 12, paddingTopLeft: [0, 40] });
            });
        });



    return (

        <Card>
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
            <Card style={{ marginTop:"3%" }}>
                <h1 style={{ "marginLeft": "2%" }}>Map</h1>
                <Card style={{"width": "96%", "margin": "3% 2%" }}>

                    <link rel="stylesheet" href="//unpkg.com/leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css" type="text/css" />
                        <script src="//unpkg.com/leaflet-gesture-handling"></script>
                    <link href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" rel="stylesheet" />


                    <div id="leaflet-map" style={{
                        "width": "100%"
                    }} >
                    </div>


                    <div id="leaflet-map-bounds" >
                    </div>
                </Card>
            </Card>
        </Card>
    );
}
export default Map;
