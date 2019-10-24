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

const createRooms = (startX, startY, endX, endY, props) => {
    const rooms = [];
    
    for(let y=startY; y < endY; y++) {
        for(let x=startX; x < endX; x++) {

            let south, east = false
            //matches room coordinates with the grid
            let roomId = Object.keys(props.rooms).find(key=> props.rooms[key].coordinates == `(${x},${y})`)
        
            if(roomId) {
                if('s' in props.rooms[roomId].exits)
                    south = true;
                if('e' in props.rooms[roomId].exits)
                    east = true;
                rooms.push(<Room key={[x,y]} room={true } east={east} south={south}></Room>)
            }
            else {
                rooms.push(<Room key={[x,y]} room={false} south={south} south={south}></Room>)
            }
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
