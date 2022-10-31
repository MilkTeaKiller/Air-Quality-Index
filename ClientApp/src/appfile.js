import React from 'react';
import { Chart } from "react-google-charts";
import { parse } from 'papaparse'
import {
    NavLink,Redirect
} from "react-router-dom";
import Chart1 from './chart';
import './index.css';
import { Nav, Navbar, Container, NavDropdown, Table, Card, Dropdown } from 'react-bootstrap';
import logo from './logo.png';
import gototop from './gototop.jpg';

let CityArr = [];

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
async function fetchCsv(path)
{
    try {
        let data = await fetch(path)
            .then((x) => x.text())
            .then((x) => parse(x));

        return data;
    }
    catch (error) {
        console.log(error)
        this.props.history.push("/sorry");
    }
}



async function getDataByUID(input) {
    try {
        const urlForecast = "https://api.waqi.info/feed/@";
        const token = "/?token=37c9ec0b0ebe0bb61232c4c1707d57d8a823ab4b";

        let response = await fetch(urlForecast + input + token);
        let jsonData = await response.json();

        return jsonData;

    } catch (error) {
        console.error(error);
        this.props.history.push("/sorry");
    }
}

function compare(a, b) {
    if (a.aqi < b.aqi) {
        return 1;
    }
    if (a.aqi > b.aqi) {
        return -1;
    }
    return 0;
}

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            //element for local data graph
            el: ""
            , City: "", Cities: []
            //Local Data 
            , my : "" , vn : ""
            , displayCountry : "Malaysia"
            , displayCity: ""
            , years: [], displayYear: ""
            , month: [], displayMonth: ""
            , species: [], chosenSpecie: ""
            , forecast: []
            //Array for top 5 Station
            , topMy: [],topVn:[]
            //Condition For Forecast
                //Live Data Array
            , liveArr: []
                //Country And State
            , CountryFtStat: "Malaysia"
            , StateFtStat: "Kuala Lumpur"
            //Condition For Table
            , listTable: "", tableData: []
            , TableCountry: "Malaysia"
            ,
        }

        this.updateCountryDisplay = this.updateCountryDisplay.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.updateYearDisplay = this.updateYearDisplay.bind(this);
        this.updateMonth = this.updateMonth.bind(this);
        this.chooseSpecie = this.chooseSpecie.bind(this);

        this.updateFtCount = this.updateFtCount.bind(this);
        this.updateFtStat = this.updateFtStat.bind(this);
        this.createTable = this.createTable.bind(this);
    };
    groupby(xs, prop) {
        var grouped = {};
        for (var i = 0; i < xs.length; i++) {
            var p = xs[i][prop];
            if (!grouped[p]) { grouped[p] = []; }
            grouped[p].push(xs[i]);
        }
        return grouped;
    }

    //create table
    createTable() {
        let country = document.getElementById("cValue").value;
        let categoryFilter = parseInt(document.getElementById("fValue").value);
        try {
            return fetch("https://api.waqi.info/search/?token=37c9ec0b0ebe0bb61232c4c1707d57d8a823ab4b&keyword=" + country)
                .then((x) => x.json())
                .then((stations) => {
                    if (stations.status !== "ok") throw stations.reason;

                    let tableArr = [];
                    let none = [{ "city": { name: "none" }, "aqi": "none", "iaqi": { "h": { "v": "none" }, "p": { "v": "none" }, "t": { "v": "none" }, "w": { "v": "none" } } }];
                    let count = 0;

                    stations.data.forEach((station) => {
                        fetch("https://api.waqi.info/feed/@" + station.uid + "/?token=37c9ec0b0ebe0bb61232c4c1707d57d8a823ab4b")
                            .then((x) => x.json())
                            .then((x) => {
                                if (x.status !== "ok") throw x.reason;


                                if (!x.data.iaqi.hasOwnProperty('h'))
                                    x.data.iaqi.h = { "v": "NA" };
                                if (!x.data.iaqi.hasOwnProperty('p'))
                                    x.data.iaqi.p = { "v": "NA" };
                                if (!x.data.iaqi.hasOwnProperty('t'))
                                    x.data.iaqi.t = { "v": "NA" };
                                if (!x.data.iaqi.hasOwnProperty('w'))
                                    x.data.iaqi.w = { "v": "NA" };
                                if (x.data.aqi >= categoryFilter) {
                                    tableArr.push(x.data);
                                    count++;
                                }
                                if (count >= 1)
                                    this.setState({ tableData: tableArr });
                                else
                                    this.setState({ tableData: none });
                            });

                    });

                });
        }
        catch (error) {
            console.log(error);
            this.props.history.push("/sorry");
        }
    }


    componentDidMount() {
        
        
        

        this.createTable("Malaysia");

        let local, my = [], vn = [];
        fetchCsv('./data/vn.csv').then(
            async function (result) {
                local = result.data;
                local.shift();

                local.forEach(
                    x => {
                        let a = {
                            "Date": x[0], "Country": x[1], "City": x[2], "Specie": x[3],
                            "count": x[4], "min": x[5], "max": x[6], "median": x[7], "variance": x[8]
                        };
                        vn.push(a);
                    }
                )

            }
        ).then(() => this.setState({ vn: vn }));
        
        fetchCsv('./data/my.csv').then(
            async function (result) {
                local = result.data;
                local.shift();

                local.forEach(
                    x => {
                        let a = {
                            "Date": x[0], "Country": x[1], "City": x[2], "Specie": x[3],
                            "count": x[4], "min": x[5], "max": x[6], "median": x[7], "variance": x[8]
                        };
                        my.push(a);
                    }
                )

            }
        ).then(
            () => {
                this.setState({ my: my });
                this.setState({ el: this.state.my });
                let sptemp = [];
                this.state.el.forEach(x => {
                    if (sptemp.indexOf(x.Specie) === -1)
                        sptemp.push(x.Specie);
                })
                this.setState({ species: sptemp });
                this.setState({ chosenSpecie: sptemp[0] });

                let temp = this.sortwithtime(this.state.el);
                this.setState({ el: temp });
                let ys = [];
                ys = this.getuniqueyear(temp, 0);
                this.setState({ years: ys });
                this.setState({ displayYear: ys[1] });

                let cts = [];
                cts = this.getuniquecities(temp);
                this.setState({ Cities: cts });
                this.setState({ displayCity: cts[0] })

                let mth = [];
                this.state.el.filter(x => x.City === cts[0] && x.Date.getFullYear() === ys[1]).forEach(x => {
                    if (mth.indexOf(x.Date.getMonth()) === -1)
                        mth.push(x.Date.getMonth());
                })
                this.setState({ month: mth });
                this.setState({ displayMonth: mth[0] })

                CityArr.push(["Date", cts[0]]);
                temp = temp.filter(x => x.City === cts[0]
                    && x.Date.getMonth() === mth[0]
                    && parseInt(x.Date.getFullYear()) === ys[1]
                    && x.Specie === sptemp[0]).forEach((x) => {

                        CityArr.push([x.Date, parseInt(x.median)]);
                    })

                this.setState({ City: CityArr });
            }
        );

        let topFive = [
            ['City', 'AQI']
        ];
        let array;
        //Top 5 Chart
        getDataByKeyword("Malaysia").then(async function (result) {
            array = result.data;

            //Extract Station Name
            array.forEach(x => {
                var pos = x.station.name.indexOf(',');
                if (pos < 0)
                    x.station.name = x.station.name.substring(pos);
                else
                    x.station.name = x.station.name.substr(0, pos);
            });

            //Soft And Slice Top 5
            array.sort(compare);
            array = array.slice(0, 5);
            for (var i = 0; i < 5; i++) {

                topFive.push([array[i].station.name, parseInt(array[i].aqi)]);
            }


        }).then(async () => {

            this.setState({ topMy : topFive });

        })

        let topFiveVn = [
            ['City', 'AQI']
        ];
        getDataByKeyword("VietNam").then(async function (result) {
            array = result.data;

            //Extract Station Name
            array.forEach(x => {
                var pos = x.station.name.indexOf(',');
                if (pos < 0)
                    x.station.name = x.station.name.substring(pos);
                else
                    x.station.name = x.station.name.substr(0, pos);
            });

            //Soft And Slice Top 5
            array.sort(compare);
            array = array.slice(0, 5);
            for (var i = 0; i < 5; i++) {

                topFiveVn.push([array[i].station.name, parseInt(array[i].aqi)]);
            }


        }).then(async () => {

            this.setState({ topVn: topFiveVn });

        })
        

    }

    //Update Forecast Country
    updateFtCount(evt) {
        // For Forecast Chart 
        let array;
        if (evt.target.value === "null") {
            this.setState({ liveArr: [] });
            this.setState({ forecast: [] });
        }
        else {
            getDataByKeyword(evt.target.value).then(async function (result) {
                array = result.data;

                array.forEach(x => {
                    var pos = x.station.name.indexOf(',');
                    if (pos < 0)
                        x.station.name = x.station.name.substring(pos);
                    else
                        x.station.name = x.station.name.substr(0, pos);
                });


            }).then(async () => {
                this.setState({ liveArr: array });
            })
        }
    }
    updateFtStat(evt) {
        //Forecast Temporary Array
        let forecastTempArr = [];
        let dateArr = [];
        let temp = 0, tempArr = [];
        if (evt.target.value !== "null") {
            let selectedStation = this.state.liveArr.find(x => x.station.name === evt.target.value);
            getDataByUID(selectedStation.uid).then((y) => {
                forecastTempArr.push(["Date"].concat(Object.keys(y.data.forecast.daily)));

                temp = Object.keys(y.data.forecast.daily).length;

                for (let i = 0; i < temp; i++) {
                    y.data.forecast.daily[Object.keys(y.data.forecast.daily)[i]].forEach(z => {
                        if (dateArr.indexOf(z.day) === -1) {
                            dateArr.push(z.day);
                        }
                    })
                }
                tempArr = [];
                for (let i = 0; i < dateArr.length; i++) {

                    tempArr = [dateArr[i]];
                    for (let j = 0; j < temp; j++) {
                        let obj = y.data.forecast.daily[Object.keys(y.data.forecast.daily)[j]].find(q => (q.day === dateArr[i]));
                        if (obj !== undefined)
                            tempArr = tempArr.concat(obj.avg);
                        else {
                            tempArr = tempArr.concat(null);
                        }
                    }
                    forecastTempArr.push(tempArr);

                }
                this.setState({ forecast: forecastTempArr });
            })

        }
        else {
            this.setState({ forecast: [] });
        }
    }

    getuniqueyear(temp, x) {
        let years = [];
        if (x === 0) {
            temp.forEach(x => {
                if (years.indexOf(x.Date.getFullYear()) === -1) {
                    years.push(x.Date.getFullYear());
                }
            });
            years = years.filter(x => !isNaN(x))


        }
        else if (x === 1) {
            temp.forEach(x => {
                    if (years.indexOf(x[0].getFullYear()) === -1) {
                        years.push(x[0].getFullYear());
                    }
                });
                years = years.filter(x => !isNaN(x))
        }
        return years;
    }

    getuniquecities(temp) {
        let cities = [];
        temp.forEach(x => {
            if (cities.indexOf(x.City) === -1) {
                cities.push(x.City);
            }
        });

        return cities;
    }

    

    
    updateCountryDisplay(e) {
        CityArr = [];
        this.setState({ displayCountry: e.target.value });
        let tempEL;
        if (e.target.value === "Malaysia") {
            tempEL = this.state.my;
        }
        else {
            tempEL = this.state.vn;
        }

        let sptemp = [];
        tempEL.forEach(x => {
            if (sptemp.indexOf(x.Specie) === -1)
                sptemp.push(x.Specie);
        })
        this.setState({ species: sptemp });
        this.setState({ chosenSpecie: sptemp[0] });

        let temp = this.sortwithtime(tempEL);
        this.setState({ el: temp });
        let ys = [];
        ys = this.getuniqueyear(temp, 0);
        this.setState({ years: ys });
        this.setState({ displayYear: ys[0] });

        let cts = [];
        cts = this.getuniquecities(temp);
        this.setState({ Cities: cts });
        this.setState({ displayCity: cts[0] })
        
        let mth = [];
        tempEL.filter(x => x.City === cts[0] && x.Date.getFullYear() === ys[0]).forEach(x => {
            
            if (mth.indexOf(x.Date.getMonth()) === -1)
                mth.push(x.Date.getMonth());
        })
        this.setState({ month: mth });
        this.setState({ displayMonth: mth[0] })

        CityArr.push(["Date", cts[0]]);
        temp = temp.filter(x => x.City === cts[0]
            && x.Date.getMonth() === mth[0]
            && parseInt(x.Date.getFullYear()) === ys[0]
            && x.Specie === sptemp[0]).forEach((x) => {

                CityArr.push([x.Date, parseInt(x.median)]);
            })
        this.setState({ City: CityArr });
    }

    updateCity(e) {
        this.setState({ displayCity: e.target.value });

        CityArr = [];

        const tempyear = this.state.displayYear;
        let getys = [];
        this.state.el.filter(x => x.City === e.target.value).forEach(x => {
            if (getys.indexOf(x.Date.getFullYear()) === -1) {
                getys.push(x.Date.getFullYear())
            }
        })
        let yearFilter;
        this.setState({ years: getys });
        if (getys.indexOf(tempyear) === -1) {
            this.setState({ displayYear: getys[0] });
            yearFilter = getys[0];
        }
        else {
            this.setState({ displayYear: tempyear });
            yearFilter = tempyear;
        }

        const tempmonth = this.state.displayMonth;
        let mth = [];
        this.state.el.filter(x => x.City === e.target.value && x.Date.getFullYear() === yearFilter).forEach(x => {
            if (mth.indexOf(x.Date.getMonth()) === -1)
                mth.push(x.Date.getMonth());
        })
        let month;
        this.setState({ month: mth });
        if (mth.indexOf(tempmonth) === -1) {
            this.setState({ displayMonth: mth[0] });
            month = mth[0];
        }
        else {
            this.setState({ displayMonth: tempmonth });
            month = tempmonth;
        }

        CityArr.push(["Date", e.target.value]);
        this.state.el.filter(x => x.City === e.target.value
            && x.Date.getMonth() === month
            && x.Date.getFullYear() === parseInt(yearFilter)
            && x.Specie === this.state.chosenSpecie).forEach((x) => {

                CityArr.push([x.Date, parseInt(x.median)]);
            })
        this.setState({ City: CityArr });

    }

    updateYearDisplay(e) {
        this.setState({ displayYear: e.target.value });
        const tempmonth = this.state.displayMonth;
        let mth = [];
        this.state.el.filter(x => x.City === this.state.displayCity && x.Date.getFullYear() === parseInt(e.target.value)).map(x => {
            if (mth.indexOf(x.Date.getMonth()) === -1)
                mth.push(x.Date.getMonth());
            return 0;
        });
        let month;
        this.setState({ month: mth });
        if (mth.indexOf(tempmonth) === -1) {
            this.setState({ displayMonth: mth[0] });
            month = mth[0];
        }
        else {
            this.setState({ displayMonth: tempmonth });
            month = tempmonth;
        }

        CityArr = [];
        CityArr.push(["Date", this.state.displayCity]);
        this.state.el.filter(x => x.City === this.state.displayCity
            && x.Date.getMonth() === month
            && x.Date.getFullYear() === parseInt(e.target.value)
            && x.Specie === this.state.chosenSpecie).forEach((x) => {

                CityArr.push([x.Date, parseInt(x.median)]);
            })
        this.setState({ City: CityArr });
    }

    updateMonth(e) {
        this.setState({ displayMonth: e.target.value });
        const city = this.state.displayCity; const year = this.state.displayYear;
        CityArr = [];
        CityArr.push(["Date", city]);
        this.state.el.filter(x => x.City === city
            && x.Date.getMonth() === parseInt(e.target.value)
            && x.Date.getFullYear() === parseInt(year)
            && x.Specie === this.state.chosenSpecie).forEach((x) => {

                CityArr.push([x.Date, parseInt(x.median)]);
            })
        this.setState({ City: CityArr });
    }

    sortwithtime(el) {
        el.map(x => (x.Date = new Date(x.Date)));
        let temp = el.sort((x, y) => x.Date - y.Date);
        return temp;
    }

    chooseSpecie(e) {
        this.setState({ chosenSpecie: e.target.value });

        const city = this.state.displayCity; const year = this.state.displayYear; const month = this.state.displayMonth;
        CityArr = [];
        CityArr.push(["Date", city]);
        this.state.el.filter(x => x.City === city
            && x.Date.getMonth() === parseInt(month)
            && x.Date.getFullYear() === parseInt(year)
            && x.Specie === e.target.value).forEach((x) => {

                CityArr.push([x.Date, parseInt(x.median)]);
            })
        this.setState({ City: CityArr });
    }

    render() {
        let chart;
        let enough = this.state.City.length > 1;
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let month = monthNames[this.state.displayMonth];
        let SpecName;
        switch (this.state.chosenSpecie) {
            case "aqi":
                SpecName = "Air Quality Index";
                break;
            case "temperature":
               SpecName = "Temperature";
                break;
            case "humidity":
                SpecName = "Humidity";
                break;
            case "pressure":
                SpecName = "Pressure";
                break;
            default:
                SpecName = this.state.chosenSpecie;
                break;
        }

        const title = SpecName + ' in ' + this.state.displayCity+', ' + this.state.displayCountry +' on ' + month + ' ' + this.state.displayYear;
        if (enough) {
            chart =
            <div>
                <Chart1
                    data={this.state.City}
                    title={title}
                />
            </div>
        }
        else {
            chart = <h3 style={{ "color": "red", "height": "280px", "borderStyle": "dotted" }}>Sorry, there is no data of the chosen specie during these periods</h3>
        }

        // forecast
        let forecastchart = null;
        if (this.state.forecast.length === 0) {
            forecastchart = <h3 style={{ "color": "red", "margin": "1%", "minHeight" : "280px"}}>Choose Country and State</h3>;
        } else {
            forecastchart =
                <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={this.state.forecast}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Index',
                    },
                }}
            />;
        }


        //Top 5 Station My
        let top5My = <Chart
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={this.state.topMy}
            options={{
                chartArea: {
                    width: '63%'
                },
                title: 'Top 5 City with highest AQI in Malaysia',
                hAxis: {
                    title: 'City',
                    minValue: 0
                },
                vAxis: {
                    title: 'Air Quality Index',
                },
                width: '100%',
            }}
            legendToggle
        />;
        //Top 5 Station Vn
        let top5Vn = <Chart
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={this.state.topVn}
            options={{
                chartArea: {
                    width: '75%'
                },
                title: 'Top 5 City with highest AQI in VietNam',
                hAxis: {
                    title: 'City',
                    minValue: 0
                },
                vAxis: {
                    title: 'Air Quality Index',
                }
            }}
            legendToggle
        />;

        var mybutton = document.getElementById("myBtn");

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
        window.onscroll = function () { scrollFunction() };

        function topFunction() {
            window.scrollTo(0, 0);
        }
        

        let SelectionForArea = <Card style={{ "textAlign": "left", padding: "1%" }}>
            <label>Country: </label>
            <select onChange={this.updateCountryDisplay} value={this.state.displayCountry} id="selectCountry">
                <option key={"MY"} value={"Malaysia"}>Malaysia</option>
                <option key={"VN"} value={"VietNam"}>VietNam</option>
            </select>
            <label>Station: </label>
            <select onChange={this.updateCity} value={this.state.displayCity}>
                {
                    this.state.Cities.map((x, i) => {
                        return (<option key={i} value={x}>{x}</option>)
                    })
                }
            </select>
            <label>Year: </label>
            <select onChange={this.updateYearDisplay} value={this.state.displayYear}>
                {
                    this.state.years.map((x, i) => {
                        return (<option key={i} value={x}>{x}</option>)
                    })
                }
            </select>
            <label>Month: </label>
            <select onChange={this.updateMonth} value={this.state.displayMonth}>
                
                {
                    
                    
                    this.state.month.map((x, i) => {
                        return (<option key={i} value={x}>{x + 1}</option>)
                    })

                }
            </select>
            <label>Species: </label>
            <select onChange={this.chooseSpecie}>
                {
                    this.state.species.map((x, i) => {
                        return (<option key={i} value={x}>{x}</option>)
                    })
                }
            </select>
        </Card>;
        return (
            
            <Card style={{ "width": "100%"}}>

                <img src={gototop}  onClick={topFunction} id="myBtn" title="Go to top" />
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
                <Card style={{ "width": "100%", backgroundColor: "#c5d2d8" }} >
                    <h1 className="title" >Air Quality Index</h1>
                    
                    <Card style={{
                        "width": "96%", "margin": "0 auto", "height": "auto", padding: "1%"
                    }} id="table" className="box-shadow-1">
                        <div id="table1">
                            <div>
                                Country
                                    <Card style={{"width" : "50%" , "border" : "none"}}>
                                        <select id="cValue" onChange={ this.createTable }>
                                            <option key="MY" value="Malaysia" >Malaysia</option>
                                            <option key="VN" value="Vietnam" >VietNam</option>
                                            <option key="JP" value="Japan" >Japan</option>
                                            <option key="CN" value="China" >China</option>
                                            <option key="SG" value="Singapore" >Singapore</option>
                                            <option key="EG" value="England" >England</option>
                                        </select>
                                    AQI category above
                                        <select id="fValue" onChange={this.createTable}>
                                            <option key="GD" value="0" >Good</option>
                                            <option key="MD" value="51" >Moderate</option>
                                            <option key="US" value="101">Unhealthy for Sensitive Groups</option>
                                            <option key="UH" value="151" >Unhealthy</option>
                                            <option key="VH" value="201" >Very Unhealthy</option>
                                            <option key="HZ" value="301" >Hazardous</option>
                                        </select>
                                    </Card>
                                    <Card id="innertable">
                                        <Table bordered hover className= "styled-table" >
                                        <thead><tr><th>City</th><th>AQI</th><th>Humidity</th><th>Pressure</th><th>Temperature</th><th>Wind</th></tr></thead><tbody>
                                            {
                                                this.state.tableData.map((x,i) => {
                                                return(
                                                    <tr key={x.city.name}>
                                                        <td>{x.city.name}</td>
                                                        <td>{x.aqi}</td>
                                                        <td>{x.iaqi.h.v}</td>
                                                        <td>{x.iaqi.p.v}</td>
                                                        <td>{x.iaqi.t.v}</td>
                                                        <td>{x.iaqi.w.v}</td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                            <tfoot>
                                            </tfoot>
                                    </Table>
                            
                                    </Card>
                            
                                </div>
                            <div style={{ "borderStyle": "dotted", height: "50%", marginTop: "3%" }} id="plate">
                                    <b>AQI Category Range:</b>
                                    <ul>
                                        <li><b>Good (0-50)</b></li>
                                        <li><b>Moderate (51-100)</b> </li>
                                        <li><b>Unhealthy for Sensitive Groups (101-150)</b></li>
                                        <li><b>Unhealthy (151-200)</b></li>
                                        <li><b>Very Unhealthy (201-300)</b></li>
                                        <li><b>Hazardous (301 and above)</b></li>
                                    </ul>
                            </div>
                        </div>
                    </Card>
                    <div className="chart " id="top5">
                        <Card style={{ "textAlign": "center", "width": "96%", "margin": "0.5% auto", "float": "none", "padding": "0 5%" }} className="box-shadow-1">
                            <h3 >TOP 5 Station Comparison ( MY / VN ) </h3>
                            <div id="top5">
                                <div className="top5chart">
                                        {top5My}
                                </div>
                                <div className="top5chart">
                                        {top5Vn}
                                </div>
                            </div>
                        </Card>
                    </div>
                    <Card style={{ "textAlign": "center", "width": "96%", "margin": "0% auto" }} id="HistoryAreaGraph" className="box-shadow-1">
                        
                            { SelectionForArea }
                        
                        {chart}
                    </Card>

                    <Card style={{ "width": "96%", "margin": "0.5% auto", "textAlign": "center" }} id="forecast" className="box-shadow-1">
                        <h3>Forecast</h3>
                        <div>
                            Country : &nbsp;
                            <select onChange={this.updateFtCount} >
                                <option key="No" value="null" >Choose A Country</option>
                                <option key="MY" value="Malaysia" >Malaysia</option>
                                <option key="VN" value="VietNam" >VietNam</option>
                                </select>
                                <br/>
                            Station : &nbsp;&nbsp;
                            <select style={{"minWidth" : "300px"}} onChange={this.updateFtStat} >
                                <option key="MY" value="null" >Choose A State</option>
                                {
                                    this.state.liveArr.map((x, i) => {
                                        return (<option key={i} value={x.station.name}>{x.station.name}</option>)
                                    })
                                }
                                </select>
                        </div>
                        {
                            forecastchart
                        }
                    </Card>


                </Card>
                <div className="footer">
                    <div>
                        <h3 className="contribution">Thanks to EPA (US Environmental Protection Agency) AND World Air Quality Index Project For Providing The Data</h3>
                    </div>
                    <hr />
                    <footer>
                        GROUP MOYU @ 2021
                    </footer>
                </div>
            </Card>
        );
    }
}



export default Main;