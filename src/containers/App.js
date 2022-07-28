import React, { useState, useEffect } from 'react';
import Cardlist from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';

function App(){
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchField] = useState('')

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users').then(Response=> {
           return Response.json();
        })
        .then(users => setRobots(users))
    }, [])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }
        
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if(!robots.length) {
            return <h1>Loading</h1>
        } else {
        return (
            <div className="tc">
                <h1 className="f1">RoboFrieds</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <Cardlist robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default App;
