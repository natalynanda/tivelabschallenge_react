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
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray } from "variables/Variables.jsx";
import dataJson from './data/users.data.json';
import service from '../api/game.service';

function useSearchGamers(gamers) {
  const[query, setQuery] = React.useState('');

  const[filteredResults, setFilteredResults] = React.useState(gamers);

  React.useMemo(() => {
    const result = dataJson.filter(gamer => {
    return gamer.name.toLowerCase().includes(query.toLowerCase());
  });

  setFilteredResults(result);

  }, [dataJson, query]);

  return {setQuery, filteredResults}
}

function TableList (props) {

  /*const result = async() => {
    const response = await service.calculateGamers(dataJson).then((r) => {
    console.log('entro aqui');
    return r
  })
  return response;
};*/
  
  const {query, setQuery, filteredResults} = useSearchGamers(dataJson);
  return (
    <div className="content">
      <div className="form-group">
        <label>Filter Gamer</label>
        <input type="text" className="form-control"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}></input>
      </div>
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Gamers"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {thArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map(gamer => {
                      return (
                        <tr key={gamer.userId}>
                          <td >{gamer.userId}</td>
                          <td >{gamer.name}</td>
                          <td >{gamer.level}</td>
                          <td >{gamer.coins}</td>
                          <td >{gamer.time}</td>
                          <td >{gamer.country}</td>
                          <td><button> Details</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}


export default TableList;
