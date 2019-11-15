import React, { useState, useEffect } from 'react';
import axios from 'axios';
import traverse from '../functions/traverseRooms.js';
import searchRoom from '../functions/searchRoom.js';

function Inputs(props) {
    const [roomIdInput, setRoomId] = useState('')


    function generateTraversal() {

        const auth = `Token ${localStorage.getItem("key")}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        }

        axios
            .get(`${props.backendUrl}/api/adv/init/`, options)
            .then(res => {
                props.setCurrInfo(res.data)
                props.setRooms(traverse(res.data, props.searchedRooms))
            })

    }

    function handleSearchInput(e) {
        setRoomId(e.target.value)
    }

    function searchForRoom(e) {
        e.preventDefault();
        const auth = `Token ${localStorage.getItem("key")}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        }
        // console.log(options)
        if (roomIdInput) {
            axios
                .get(`${props.backendUrl}/api/adv/init/`, options)
                .then(res => {
                    props.setCurrInfo(res.data)
                    searchRoom(res.data, Number(roomIdInput))
                })
        }

    }

    function pray() {
        // e.preventDefault();
        const auth = `Token ${localStorage.getItem("key")}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        }
        // console.log(options)
        axios
            .post(`${props.backendUrl}/api/adv/pray/`, {}, options)
            .then(res => {
                console.log(res.data)
                // props.setCurrInfo(res.data)

            })

    }

    function stopTraversal() {
        console.log('stopped!')
        localStorage.setItem('isTraversing', false)
    }




    return (
        <div>
            <button onClick={generateTraversal}>Generate Traversal</button>
            <button onClick={stopTraversal}>Stop Traversal</button>
            <form onSubmit={searchForRoom}>
                <input
                    value={roomIdInput}
                    onChange={handleSearchInput}
                    name='roomIdInput'
                />
                <button type='Submit'>Search</button>
            </form>
            <button onClick={pray}>pray</button>
            <button onClick={() => localStorage.setItem('visited', JSON.stringify({}))}>empty visited</button>
            <button onClick={() => localStorage.setItem('visited', localStorage.getItem('allVisited'))}>fill visited</button>
        </div>
    )

}

export default Inputs;