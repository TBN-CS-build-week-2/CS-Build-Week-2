import axios from 'axios';

function playerTravel(direction) {
    const backendUrl = 'https://lambda-treasure-hunt.herokuapp.com'
    let nextRoom = null;
    // setTimeout(() => { }, 15000);
    // setTimeout(() => null, 15000);
    console.log('key', localStorage.getItem('key'))
    const auth = `Token ${localStorage.getItem("key")}`
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },

    }
    console.log('traveled', options)
    return axios
        .post(`${backendUrl}/api/adv/move/`, { 'direction': direction }, options)
        .then(result => {
            console.log(result.data)
            nextRoom = result.data
            console.log('nextroom', nextRoom)
            return nextRoom
        })
}

function traverse(room, currentRooms) {
    // console.log(room)
    currentRooms[room.room_id] = room
    // console.log(currentRooms)
    // return currentRooms

    let traversalPath = []
    let visited = {}
    let currRoom = room

    visited[room.room_id] = { title: currRoom.title, coordinates: currRoom.coordinates }
    visited[room.room_id]['exits'] = {}
    for (let i = 0; i < room.exits.length; i++) {
        visited[room.room_id]['exits'][room.exits[i]] = '?'
    }

    // loop until all rooms have been explored (all rooms added to visited)
    // change to 500
    // while (visited.length !== 50) {
    async function roomStep() {

        if (visited.length === 15) {
            return
        }

        // get the current room, id, and exits
        console.log('currroom', currRoom)
        let roomId = currRoom.room_id
        let roomExits = currRoom.exits

        // create a list of unvisited rooms for the visited list
        let unvisited = []
        for (let element in visited[roomId]['exits']) {
            if (visited[roomId]['exits'][element] == '?') {
                unvisited.push(element)
            }
        };
        console.log(unvisited)

        if (unvisited.length > 0) {
            // grab random unvisited room
            let nextDirectionIndex = Math.floor(Math.random() * (unvisited.length))
            let nextDirection = unvisited[nextDirectionIndex]

            // move to a new room
            // console.log(nextDirection)
            // console.log(currRoom)

            currRoom = await playerTravel(nextDirection)
            let nextRoomId = currRoom.room_id
            // set the previous room direction and new room direction accordingly
            console.log(currRoom)
            // setTimeout(() => console.log(currRoom), currRoom.cooldown * 1000);
            // break;
            visited[roomId]['exits'][nextDirection] = nextRoomId;
            // if new room not visited add it to visited
            if (!(nextRoomId in visited)) {
                let nextExits = currRoom.exits
                visited[nextRoomId] = { title: currRoom.title, coordinates: currRoom.coordinates }
                visited[nextRoomId]['exits'] = {}
                for (let i = 0; i < currRoom.exits.length; i++) {
                    visited[currRoom.room_id]['exits'][currRoom.exits[i]] = '?'
                }
            }
            let reverseDirs = { "n": "s", "s": "n", "e": "w", "w": "e" }
            let reverseDir = reverseDirs[nextDirection]
            visited[nextRoomId]['exits'][reverseDir] = roomId
            console.log(visited)


        } else {
            // run a search to return to the nearest room with an unexplored direction
            console.log('dead end', roomId)
            let stack = []
            let visited_search = new Set()
            stack.push([roomId])
            let found = 0
            let foundPath = []
            // console.log(stack, stack[0])

            while (stack.length > 0 && found === 0) {
                let reverseTraversal = []
                let path = stack.pop()
                console.log(path, path[path.length - 1])
                let node = path[path.length - 1]
                let searchRoom = visited[node]['exits']
                console.log(searchRoom)
                if (!(node in visited_search)) {
                    visited_search.add(node)
                    console.log(visited_search)
                }

                for (let direction in searchRoom) {
                    console.log('-------direction---', direction)
                    if (searchRoom[direction] === '?') {
                        foundPath = path
                        found += 1
                    }
                }
                if (found > 0) {
                    break;
                }

                let exploredDirections = []
                for (let direction in searchRoom) {
                    console.log('e******direction---', direction)
                    if (searchRoom[direction] !== '?') {
                        let value = searchRoom[direction]
                        if (!(value in path)) {
                            exploredDirections.push(direction)
                        }
                    }
                }
                console.log('explored idrections', exploredDirections)
                for (let direction in exploredDirections) {
                    direction = exploredDirections[direction]
                    console.log('direction---------', direction)
                    reverseTraversal.push(direction)
                    let new_path = [...path]
                    console.log('serach room direction', direction, searchRoom[direction])
                    new_path.push(searchRoom[direction])
                    console.log('newpath', new_path)
                    stack.push(new_path)
                }
            }
            console.log(foundPath)
            let previous = foundPath[0]
            for (let pathRoom in foundPath) {
                pathRoom = foundPath[pathRoom]
                console.log('end-- pathroom', pathRoom, previous)
                if (pathRoom != foundPath[0]) {
                    for (let way in visited[previous]['exits']) {
                        console.log('end-- way', way)
                        if (visited[previous][way] == pathRoom) {
                            playerTravel(way)
                            traversalPath.push(way)
                        }
                    }
                }
                previous = pathRoom;
            }

        }
        setTimeout(() => roomStep(), currRoom.cooldown * 1000);
    }
    roomStep()

    return traversalPath, visited;
}

export default traverse;