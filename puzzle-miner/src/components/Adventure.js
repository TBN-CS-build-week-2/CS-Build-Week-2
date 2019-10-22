import React, { useState, useEffect } from 'react';
import axios from 'axios';
import traverse from '../functions/traverseRooms.js';

function Adventure(props) {
    const [searchedRooms, setRooms] = useState({})
    const [currMap, setMap] = useState({})
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
            <button onClick={generateTraversal}>generateTraversal</button>
            <div>
                {searchedRooms[0] && searchedRooms[0].title}
            </div>



        </div>
    )

}

export default Adventure;