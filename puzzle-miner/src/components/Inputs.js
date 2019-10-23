import React, { useState, useEffect } from 'react';
import axios from 'axios';
import traverse from '../functions/traverseRooms.js';
import searchRoom from '../functions/searchRoom.js';

function Inputs(props) {
    const [roomIdInput, setRoomId] = useState('')


    function generateTraversal() {
        if (props.currInfo && props.currInfo.title) {
            props.setRooms(traverse(props.currInfo, props.searchedRooms))
        }
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


    return (
        <>
            <button onClick={generateTraversal}>generateTraversal</button>
            <form onSubmit={searchForRoom}>
                <input
                    value={roomIdInput}
                    onChange={handleSearchInput}
                    name='roomIdInput'
                />
                <button type='Submit'>Search</button>
            </form>
        </>
    )

}

export default Inputs;