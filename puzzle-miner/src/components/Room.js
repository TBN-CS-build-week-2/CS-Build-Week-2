import React from 'react';
import styled from 'styled-components';


const RoomContainerS = styled.div `
    display: flex;
    flex-wrap: wrap;
    width: 1.666666%;
    height: 1.666666%;
    `


const RoomS = styled.div `
    width: 80%;
    height: 80%
    border: 1px solid black;
`

const ConnectHorS = styled.div `
    width: 20%;
    height: 20%;
    margin-top: 20%;
    border: 1px solid orange;
`

const ConnectVerS = styled.div `
    width: 20%;
    height: 20%;
    margin-left: 33%;
    border: 1px solid orange

`
class Room extends React.Component {
    state = {
        id:'',
        title:'',
        description: '',
        players: [],
        items: [],
        exits: [],
        cooldown: 0.0,
        errors: [],
        messages: [],
        coord: [],
    } 

    render() {
        return (
                <RoomContainerS>
                    <RoomS></RoomS>
                    <ConnectHorS></ConnectHorS>
                    <ConnectVerS></ConnectVerS>
                </RoomContainerS>
        )
    }
}

export default Room