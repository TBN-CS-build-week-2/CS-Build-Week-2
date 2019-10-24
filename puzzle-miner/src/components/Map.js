import React from 'react';
import Room from './Room';
import styled from 'styled-components'


const MapS = styled.div `
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    height: 100%
    border: solid 1px blue

`

const createRooms = (startX, startY, endX, endY, properties) => {
    const rooms = [];
    for(let y=startY; y < endY; y++) {
        for(let x=startX; x < endX; x++) {
            let roomId = Object.keys(properties.rooms).find(key=> properties.rooms[key].coordinates == `(${x},${y})`)
                // console.log('roomID: ',roomId)
                // console.log(`(x,y): ${x}, ${y}`)

            if(roomId)
                rooms.push(<Room key={[x,y]} room={true }></Room>)
            else
                rooms.push(<Room key={[x,y]} room={false}></Room>)
        }

    }
    return rooms;
}

const Map = (props) => {

    return (
        <MapS>
            {createRooms(40, 40, 80, 80, props)} 
        </MapS>
    )
}

export default Map
