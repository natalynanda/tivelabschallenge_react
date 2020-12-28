/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import service from '../api/game.service';
import dataJson from './data/users.data.json';
import { Alert } from "react-bootstrap";


class Dashboard extends Component {

  state = {
    calculatedData : {},
    query: '',
    notification: null
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
        
    await service.calculateGamers(dataJson).then((response) => {
      if(response.data) {
        this.setState({
          calculatedData: response.data
        });
        localStorage.setItem('jsonConverter', response.data);
      } else {
        console.log('no hay datos');
      }
    })
    
  }

  showLevelInformation = () => {
      const gamerFound = this.state.calculatedData.filter(gamer => {
        return gamer.userId.includes(this.state.query);
      }
    );
    if(gamerFound.length > 0) {
      this.setState({
        notification: `Gamer level is:  ${gamerFound[0].level}`
      });
    }
  }

  showScoreInformation = () => {
    const gamerFound = this.state.calculatedData.filter(gamer => {
      return gamer.userId.includes(this.state.query);
    }
  );
  if(gamerFound.length > 0) {
    this.setState({
      notification: `Gamer score is: ${gamerFound[0].score}`
    });
  }
}


showRankPosition = () => {
  const gamerFound = this.state.calculatedData.filter(gamer => {
      return gamer.userId.includes(this.state.query);
    }
  );
  
  if(gamerFound.length > 0) {
    this.setState({
      notification: `Gamer rank is: ${gamerFound[0].globalRankPosition}`
    });
  }
}


showFriendRankPosition = () => {
  const gamerFound = this.state.calculatedData.filter(gamer => {
      return gamer.userId.includes(this.state.query);
    }
  );
  
  if(gamerFound.length > 0) {
    
      this.setState({
        notification: `Gamer friend rank is: ${gamerFound[0].friendRankPosition}`
      });
  }
}



showDataCalculated = () => {
  if(localStorage.getItem(this.state.query) === null) {
    const gamerFound = this.state.calculatedData.filter(gamer => {
      return gamer.userId.includes(this.state.query);
    }
  );
  
  if(gamerFound.length > 0) {
      this.setState({
        notification: `{ userId: ${gamerFound[0].userId},global: ${gamerFound[0].globalRankPosition}, friends: ${gamerFound[0].friendRankPosition}, score: ${gamerFound[0].score}, level: ${gamerFound[0].level}, time: ${gamerFound[0].time}`
      });
  }
  }
  
}


  render() {
    return (
      <div className="content">
        
          <Alert bsStyle="success">
            <span>{this.state.notification}</span>
        </Alert>
        
        
        <div className="form-group">
          <label>User Id</label>
          <input type="text" className="form-control"
          value={this.state.query}
          onChange={(e) => {
            this.setState({
              query: e.target.value
            });
          }}></input>
          
        </div>
        <div className="form-group">
        <Button bsStyle="info" onClick={this.showLevelInformation} pullRight fill type="submit">
                      CALCULATE LEVEL
          </Button>

          <Button bsStyle="info" onClick={this.showScoreInformation} pullRight fill type="submit">
                      CALCULATE SCORE
          </Button>

          <Button bsStyle="info" onClick={this.showRankPosition} pullRight fill type="submit">
                      GLOBAL POSITION
          </Button>

          <Button bsStyle="info" onClick={this.showFriendRankPosition} pullRight fill type="submit">
                      FRIEND POSITION
          </Button>


          <Button bsStyle="info" onClick={this.showDataCalculated} pullRight fill type="submit">
                      CACHE
          </Button>
        </div>
        
      </div>
    );
  }
}

export default Dashboard;
