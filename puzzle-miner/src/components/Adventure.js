import React, { useState, useEffect } from 'react';
import axios from 'axios';
import traverse from '../functions/traverseRooms.js';
import searchRoom from '../functions/searchRoom.js';
import Map from "./Map"
import Inputs from "./Inputs.js";

const data = {
    "0": {
        "title": "A brightly lit room",
        "coordinates": "(60,60)",
        "exits": {
            "n": 10,
            "s": 2,
            "e": 4,
            "w": 1
        }
    },
    "1": {
        "title": "Shop",
        "coordinates": "(59,60)",
        "exits": {
            "e": 0
        }
    },
    "2": {
        "title": "A misty room",
        "coordinates": "(60,59)",
        "exits": {
            "n": 0,
            "s": "?",
            "e": 3
        }
    },
    "3": {
        "title": "Mt. Holloway",
        "coordinates": "(61,59)",
        "exits": {
            "s": 9,
            "e": 5,
            "w": 2
        }
    },
    "4": {
        "title": "A misty room",
        "coordinates": "(61,60)",
        "exits": {
            "n": 23,
            "e": 13,
            "w": 0
        }
    },
    "5": {
        "title": "A misty room",
        "coordinates": "(62,59)",
        "exits": {
            "w": 3
        }
    },
    "9": {
        "title": "Mt. Holloway",
        "coordinates": "(61,58)",
        "exits": {
            "n": 3,
            "s": 12,
            "e": 11
        }
    },
    "10": {
        "title": "A misty room",
        "coordinates": "(60,61)",
        "exits": {
            "n": 19,
            "s": 0,
            "w": 43
        }
    },
    "11": {
        "title": "Mt. Holloway",
        "coordinates": "(62,58)",
        "exits": {
            "e": 17,
            "w": 9
        }
    },
    "12": {
        "title": "Mt. Holloway",
        "coordinates": "(61,57)",
        "exits": {
            "n": 9,
            "s": 18,
            "e": "?",
            "w": "?"
        }
    },
    "13": {
        "title": "A misty room",
        "coordinates": "(62,60)",
        "exits": {
            "e": 15,
            "w": 4
        }
    },
    "15": {
        "title": "A misty room",
        "coordinates": "(63,60)",
        "exits": {
            "w": 13
        }
    }
}

function Adventure(props) {
    const [searchedRooms, setRooms] = useState(data)
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