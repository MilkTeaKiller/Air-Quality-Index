import React from 'react';
import {
  Link,Redirect
} from "react-router-dom";
import './index.css';


function close(props){
  alert("Sorry , you must agree the term and condition to access the page.");
  window.open("about:blank", "_self");
}
 
class Ack extends React.Component {
    constructor(props) {
        super(props);

    }
  render() {
    return (
      <div>
        <div className = "ack">
              <h1 className = "title">Before Proceed To the Webpage, Please Read the Statement Below :</h1>
              <ol id = "statement"> 
                <li> 
                  <h3>All the data are collected from Aqicn.org</h3>
                </li>
                <li>
                 <h3>According to World Air Quality Index Project, these data are not fully verified or validated.</h3>
                </li>
                <li>
                 <h3> The data can not be used for any official comparison, ranking, report or data analysis.</h3>
                </li>
                <li>
                 <h3> The information is for reference only, we will not take responsibility for any loss or damage whatsoever caused</h3>
                </li>
                </ol>
                <Link to={{ pathname: '/main' }}><button>Agree</button></Link>
              <button id = "decline" onClick={close}>Decline</button>
        </div>
        <div> 
          <h3 className = "contribution">Thanks to EPA (US Environmental Protection Agency) AND World Air Quality Index Project For Providing The Data</h3>
        </div>
        <div className ="footer">
        <hr/>
        <footer>
          GROUP MOYU @ 2021 
        </footer>
        </div>
        </div>
    );
  }
}



export default Ack;
