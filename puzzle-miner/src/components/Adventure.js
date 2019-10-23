import React, { useState, useEffect } from 'react';
import axios from 'axios';
import traverse from '../functions/traverseRooms.js';
import searchRoom from '../functions/searchRoom.js';
import Map from "./Map"
import Inputs from "./Inputs.js";

function Adventure(props) {
    const [searchedRooms, setRooms] = useState({})
    // const [currMap, setMap] = useState({})
    const [currInfo, setCurrInfo] = useState()

    useEffect(() => {
        const auth = `Token ${localStorage.getItem("key")}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        }
        // console.log(options)
        axios
            .get(`${props.backendUrl}/api/adv/init/`, options)
            .then(res => {
                setCurrInfo(res.data)
            })
    }, [props.logedIn, props.backendUrl])

    function generateTraversal() {
        if (currInfo && currInfo.title) {
            setRooms(traverse(currInfo, searchedRooms))
        }
    }

    function searchForRoom(targetId) {
        const auth = `Token ${localStorage.getItem("key")}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        }
        // console.log(options)
        axios
            .get(`${props.backendUrl}/api/adv/init/`, options)
            .then(res => {
                setCurrInfo(res.data)
                searchRoom(res.data, targetId)
            })
    }

    // console.log(searchedRooms)
    console.log(currInfo)


    console.log(searchedRooms)

    return (
        <div className='adventure'>
            <button onClick={(e) => {
                e.preventDefault()
                props.setLocalKey();
                localStorage.removeItem('key')
            }}>Logout</button>

            <p>adventure</p>
            <div className='container'>
                <Inputs currInfo={currInfo} setCurrInfo={setCurrInfo} setRooms={setRooms} searchedRooms={searchedRooms} backendUrl={props.backendUrl} />
                <Map></Map>

            </div>

        </div>
    )

}

export default Adventure;