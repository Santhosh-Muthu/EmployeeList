import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

/**
 * Screen Employeelist - Display List of the Employees
 */

class EmployeeList extends Component {

    constructor(props) {
       super(props);
        this.state = {
            tableHead: [],  // Table Header
            tableData: []   // Table Body
        };
    }

    componentDidMount() {
        const { user } = this.props.route.params.employeeList; // Get the data from navigation 

        this.setState({ tableHead: Object.keys(user[0]) }); // Setting Table Header values into Header Array

        let empArry = [];  // Temp Array

        Object.keys(user).forEach((key) => { // Extracting Value from Json

            var value = user[key];

            empArry.push(Object.values(value));

            this.setState({ tableData: empArry }); // Setting Table Body Value into Body Array
        });
    }

    render() {
       
        const { tableData, tableHead } = this.state; // Destructring Table Header and Body State Value for rendering into the view
       
        return (
            <View style={{ flex: 1, marginTop: 30, padding: 16 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={{ marginBottom: 10 }}>Employee List</Text>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={tableData} textStyle={styles.text} />
                    </Table>
                </ScrollView>
            </View>
        );
    }
}

/**
 * Styles For The Screen Employee List
 */
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default EmployeeList;