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
`

const ConnectHorS = styled.div `
    width: 20%;
    height: 20%;
    margin-top: 20%;
    border: 1px solid orange;

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
    border: 1px solid orange

    ${
        ({active}) => !active && `
            visibility: hidden
        `
    }
`

const me = styled.div `
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    display: inline-block;
`

const  Room = (props) => {

    console.log(props)
    return (
            <RoomContainerS active={props.room}>
                    
                <RoomS>
                    {/* {
                        this.state.isCurrentRoom && 
                        <me></me>
                    } */}
                </RoomS>

                <ConnectHorS active={props.east}></ConnectHorS>

                <ConnectVerS active={props.south}></ConnectVerS>

            </RoomContainerS>
    )
    
}

export default Room