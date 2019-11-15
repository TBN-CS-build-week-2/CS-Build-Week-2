import axios from 'axios';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function playerTravel(direction) {
    const backendUrl = 'https://lambda-treasure-hunt.herokuapp.com'
    let nextRoom = null;

    console.log('key', localStorage.getItem('key'))
    const auth = `Token ${localStorage.getItem("key")}`
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },

    }
    console.log('traveled', options, direction)
    return axios
        .post(`${backendUrl}/api/adv/move/`, { 'direction': direction }, options)
        .then(result => {
            console.log(result.data)
            nextRoom = result.data
            console.log('nextroom', nextRoom)
            return nextRoom
        })
}


function searchRoom(currRoom, targetRoomId) {

    const roomId = currRoom.room_id
    const visited = JSON.parse(localStorage.getItem('allVisited'))

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
            // console.log(visited_search)
        }

        if (node === targetRoomId) {
            foundPath = path
            found += 1
        }

        if (found > 0) {
            break;
        }

        let exploredDirections = []
        for (let direction in searchRoom) {
            // console.log('e******direction---', direction)
            if (searchRoom[direction] !== '?') {
                let value = searchRoom[direction]
                // console.log('v and p', value, path)
                if (!(path.includes(value))) {
                    exploredDirections.push(direction)
                }
            }
        }
        // console.log('explored idrections', exploredDirections)
        for (let direction in exploredDirections) {
            direction = exploredDirections[direction]
            // console.log('direction---------', direction)
            reverseTraversal.push(direction)
            let new_path = [...path]
            // console.log('serach room direction', direction, searchRoom[direction])
            new_path.push(searchRoom[direction])
            // console.log('newpath', new_path)
            stack.push(new_path)
        }
    }
    localStorage.setItem('pathToSearch', foundPath)
    console.log('search output _________ --- :', foundPath)

    // function to move character
    let previous = foundPath[0];
    let trackIndex = 1;
    function startBackTrack() {
        async function backTrack() {
            if (trackIndex >= foundPath.length) {
                // trackIndex = 1
                currRoom.cooldown += currRoom.cooldown
                // console.log('____returnFinish room____', currRoom)
                return currRoom
                // return setTimeout(() => roomStep(), currRoom.cooldown * 1000);
            }
            let pathRoom = foundPath[trackIndex];

            // console.log('end-- pathroom', pathRoom, previous)

            for (let way in visited[previous]['exits']) {
                // console.log('end-- way', way)
                if (visited[previous]['exits'][way] == pathRoom) {
                    console.log('way-- selected', way, visited[previous]['exits'])
                    // console.log('currentroomReturn', currRoom)
                    currRoom = await playerTravel(way)
                    let pathRoomId = currRoom.room_id
                    // console.log('currentroomReturn2', pathRoomId, currRoom)
                    break;
                }
            }
            // console.log('pathroom', pathRoom)
            previous = pathRoom;
            trackIndex += 1
            setTimeout(() => { backTrack() }, currRoom.cooldown * 1000);
        }

        return backTrack();
    }

    startBackTrack();


}

export default searchRoom;