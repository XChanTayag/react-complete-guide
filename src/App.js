import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
        color: black;
    }
`;

class App extends Component {
    state = {
        persons: [
            { id: 'asd', name: 'Max', age: 28 },
            { id: 'asdf', name: 'Manu', age: 29 },
            { id: 'asdfg', name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value',
        showPersons: false
    };

    switchNameHandler = (newName) => {
        // console.log('Was clicked!');
        // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
        this.setState({
            persons: [
                { name: newName, age: 28 },
                { name: 'Manu', age: 29 },
                { name: 'Stephanie', age: 27 }
            ]
        });
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const personsList = [...this.state.persons];
        personsList[personIndex] = person;

        this.setState({ persons: personsList });
    }

    deletePersonHandler = (personIndex) => {
        // const personsList = this.state.persons.slice();
        const personsList = [...this.state.persons];
        personsList.splice(personIndex, 1);
        this.setState({ persons: personsList });
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    }

    render() {

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div > {
                    this.state.persons.map((person, index) => {
                        return (
                            <Person click={
                                () => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age}
                                key={person.id}
                                changed={
                                    (event) => this.nameChangedHandler(event, person.id)}
                            />
                        )
                    })
                }</div>
            );
        }

        const cssClasses = [];
        if (this.state.persons.length <= 2) {
            cssClasses.push('red');
        }

        if (this.state.persons.length <= 1) {
            cssClasses.push('bold');
        }

        return (
            <div className="App" >
                <h1> Hi, I 'm a React App</h1>
                <p className={cssClasses.join(' ')}> This is really working! </p>
                <StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
                     Toggle Persons
                </StyledButton>
                {persons}

            </div>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default App;