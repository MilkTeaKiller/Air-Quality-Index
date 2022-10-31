import React from 'react';
import './index.css';
import {useState , useEffect} from 'react';
import {
    NavLink
} from "react-router-dom";
import { PieChart } from './chart';
import { Nav, Navbar, Container, Dropdown, NavDropdown, Card, Table } from 'react-bootstrap';
import logo from './logo.png'
import gototop from './gototop.jpg';

function Search(props){
    const [tableA, setTableA] = useState();

  var sBar=document.getElementById("searchBar");
  const [tableEle, setTable] = useState([]);
    const [pieData, setPie] = useState([
        ['Air Pollution Level', 'Total Location'],
        ['Good', 0],
        ['Moderate', 0],
        ['Unhealthy for Sensitive Groups', 0],
        ['Unhealthy', 0],
        ['Very Unhealthy', 0],
        ['Hazardous', 0],
        ['NA', 1]
    ]);
  async function getDataByKeyword(input) {
      try {
          const url = "https://api.waqi.info/search/?token=37c9ec0b0ebe0bb61232c4c1707d57d8a823ab4b&keyword=";
          let response = await fetch(url + input);
          let jsonData = await response.json();
          return jsonData;

      } catch (error) {
          console.error(error);
          this.props.history.push("/sorry");
      }
  }
    let tabledata;
function showList(){
    let input=document.getElementById("userInput").value;
    let pie =
        [
            ['Air Pollution Level', 'Total Location'],
            ['Good', 0],
            ['Moderate', 0],
            ['Unhealthy for Sensitive Groups', 0],
            ['Unhealthy', 0],
            ['Very Unhealthy', 0],
            ['Hazardous', 0],
            ['NA',0]
        ];

    let tableB;
    getDataByKeyword(input).then(function (result) {
    if(result.data.length<1)
      tableB="<h2>Sorry, no location matched your input</h2>";
    else
    {
        tabledata = result;
        console.log(tabledata);
        if (tabledata !== null) {
            tableB = <div style={{marginLeft: "auto", marginRight: "auto", textAlign: "left" }}>
                <Table bordered hover className="styled-table2" >
                    <thead><tr><th>Location</th><th>AQI</th><th>Time</th></tr></thead>
                    {
                        tabledata.data.map(x => {
                            return (
                                <tr key={x.station.name} >
                                    <td>{x.station.name}</td>
                                    <td>{x.aqi}</td>
                                    <td>{x.time.stime}</td>
                                </tr>
                            )
                        })
                    }
                </Table>
            </div>;
        }
        else {
            tableB = "";
        }
        setTableA(tableB);

      result.data.forEach((x,i)=>{

          if (x.aqi === '-')
              pie[7][1]++;
          else if (x.aqi <= 50)
              pie[1][1]++;
          else if (x.aqi <= 100)
              pie[2][1]++;
          else if (x.aqi <= 150)
              pie[3][1]++;
          else if (x.aqi <= 200)
              pie[4][1]++;
          else if (x.aqi <= 300)
              pie[5][1]++;
          else 
              pie[6][1]++;
      })
      
    }
        setPie(pie);
  })
    }

const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            showList();
        }
    }


    

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        window.scroll(0, 0);
    }


return	( 
    <div >

        <img src={gototop} onClick={topFunction} id="myBtn" title="Go to top" style={{display:"block"}} />
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

        
        <Card style={{margin: "0 auto", textAlign : "center" }}>
            <div id="searchBar">
                <input id="userInput" type="text" placeholder="Enter the location you want to search" style={{ "width": "70%", "height": "100%" }} onKeyDown={_handleKeyDown}/>
                <button onClick={showList}>Search</button>
            </div>
            <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "70%"}}>
                <div>
                     <PieChart
                         data={pieData}
                    />
                </div>
                <div>
                    {tableA}
                </div>
            </div>
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
export default Search;
