import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { Container } from "native-base";
import TableView from "react-native-tableview";
const { Section, Item } = TableView;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: []
    }

    this.insertValues = this.insertValues.bind(this);
  }

  componentWillMount() {
    this.connection_LoadQuestionJsonData();
  }

  insertValues(value) {
    Alert.alert(value);
  }

  //TODO: connection_LoadQuestionJsonData
  connection_LoadQuestionJsonData() {
    fetch("http://localhost:8080/questionandanwsers", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.data
        });
      })
      .catch(error => {
        console.error(error);  
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <TableView
          style={{ flex: 1 }}
          tableViewStyle={TableView.Consts.Style.Plain}
          selectedValue="ES53"
          onPress={({ label }) => this.insertValues(label)}
        >
          {this.state.data.map(item => (
            <Section label={item.question}>
              {item.answer.map(row => (
                <Item key={row.choice}>{row.choice}</Item>
              ))}
            </Section>
          ))}
        </TableView>
      </Container>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
 
});
