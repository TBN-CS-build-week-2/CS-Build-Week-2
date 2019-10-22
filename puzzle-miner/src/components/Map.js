import React from 'react';
import Room from './Room';
import styled from 'styled-components'


const MapS = styled.div `
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 2px;
    border: solid 1px blue

`

const createRooms = (startX, startY, endX, endY) => {
    const rooms = [];
    for(let y=startY; y < endY; y++) {
        for(let x=startX; x < endX; x++) {
            rooms.push(<Room key={[x,y]}></Room>)
        }

    }
    return rooms;
}

//According to help desk x < 73 and y < 50


const Map = (props) => {

    return (
        <MapS>
            {createRooms(20, 20, 80, 80)} 
        </MapS>
    )
}

export default Map
