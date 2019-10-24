import React from 'react';
import styled from 'styled-components';


const RoomContainerS = styled.div `
    display: flex
    flex-wrap: wrap;
    width: 35.9px;  /* 1440/nbr of rooms in row */
    height: 25px; /* 1000/nbr of rooms in column */
    ${
        ({active}) => !active && `
            visibility:hidden;
        `}

        

    `

const RoomS = styled.div `
    width: 80%;
    height: 80%
    border: 1px solid black;
    ${
    
    ({special}) => special && `
        border: 2px solid green;
    `
    }
`

const ConnectHorS = styled.div `
    width: 20%;
    height: 20%;
    margin-top: 20%;
    background: purple;

    ${
        ({active}) => !active && `
        visibility: hidden
           `
    }
`

const ConnectVerS = styled.div `
    width: 20%;
    height: 20%;
    margin-left: 33%;
    background: purple

    ${
        ({active}) => !active && `
            visibility: hidden
        `
    }
`
const Me = styled.div `
    width: 14px;
    height: 14px;
    ${'' /* margin-top: 1px; */}
    border-radius: 50%;
    background: red;
    display: inline-block;
`

const  Room = (props) => {
    // console.log('current Info: ', Object.keys(props.currInfo))
    // console.log(props.room)

    return (
            <RoomContainerS active={props.room} >
                    
                <RoomS special={props.room.title != "A misty room"}>
                    {
                        props.room && props.currInfo &&
                        props.room.coordinates == props.currInfo[Object.keys(props.currInfo)[0]].coordinates && 
                        <Me></Me>
                    }
                </RoomS>

                <ConnectHorS active={props.east}></ConnectHorS>

                <ConnectVerS active={props.south}></ConnectVerS>

            </RoomContainerS>
    )
    
}

export default Room