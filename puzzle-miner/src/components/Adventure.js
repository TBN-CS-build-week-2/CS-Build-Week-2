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
            "s": "?",
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
    "4": {
        "title": "A misty room",
        "coordinates": "(61,60)",
        "exits": {
            "n": 23,
            "e": 13,
            "w": 0
        }
    },
    "10": {
        "title": "A misty room",
        "coordinates": "(60,61)",
        "exits": {
            "n": 19,
            "s": 0,
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
    },
    "19": {
        "title": "A misty room",
        "coordinates": "(60,62)",
        "exits": {
            "n": 20,
            "s": 10,
            "w": "?"
        }
    },
    "20": {
        "title": "A misty room",
        "coordinates": "(60,63)",
        "exits": {
            "n": "?",
            "s": 19,
            "e": 27,
            "w": "?"
        }
    },
    "23": {
        "title": "A misty room",
        "coordinates": "(61,61)",
        "exits": {
            "s": 4,
            "e": 26
        }
    },
    "26": {
        "title": "A misty room",
        "coordinates": "(62,61)",
        "exits": {
            "e": 55,
            "w": 23
        }
    },
    "27": {
        "title": "A misty room",
        "coordinates": "(61,63)",
        "exits": {
            "n": 40,
            "s": 28,
            "e": 30,
            "w": 20
        }
    },
    "28": {
        "title": "A misty room",
        "coordinates": "(61,62)",
        "exits": {
            "n": 27
        }
    },
    "30": {
        "title": "A misty room",
        "coordinates": "(62,63)",
        "exits": {
            "s": 31,
            "e": 32,
            "w": 27
        }
    },
    "31": {
        "title": "A misty room",
        "coordinates": "(62,62)",
        "exits": {
            "n": 30,
            "e": 33
        }
    },
    "32": {
        "title": "A misty room",
        "coordinates": "(63,63)",
        "exits": {
            "n": 39,
            "e": 54,
            "w": 30
        }
    },
    "33": {
        "title": "A misty room",
        "coordinates": "(63,62)",
        "exits": {
            "e": 38,
            "w": 31
        }
    },
    "38": {
        "title": "A misty room",
        "coordinates": "(64,62)",
        "exits": {
            "s": 59,
            "e": 66,
            "w": 33
        }
    },
    "39": {
        "title": "A misty room",
        "coordinates": "(63,64)",
        "exits": {
            "n": 53,
            "s": 32,
            "e": 51,
            "w": 41
        }
    },
    "40": {
        "title": "A misty room",
        "coordinates": "(61,64)",
        "exits": {
            "s": 27
        }
    },
    "41": {
        "title": "A misty room",
        "coordinates": "(62,64)",
        "exits": {
            "e": 39
        }
    },
    "51": {
        "title": "A misty room",
        "coordinates": "(64,64)",
        "exits": {
            "n": 69,
            "e": 57,
            "w": 39
        }
    },
    "53": {
        "title": "A misty room",
        "coordinates": "(63,65)",
        "exits": {
            "n": 95,
            "s": 39,
            "w": 88
        }
    },
    "54": {
        "title": "A misty room",
        "coordinates": "(64,63)",
        "exits": {
            "w": 32
        }
    },
    "55": {
        "title": "Wishing Well",
        "coordinates": "(63,61)",
        "exits": {
            "w": 26
        }
    },
    "57": {
        "title": "A misty room",
        "coordinates": "(65,64)",
        "exits": {
            "e": 145,
            "w": 51
        }
    },
    "59": {
        "title": "A misty room",
        "coordinates": "(64,61)",
        "exits": {
            "n": 38,
            "s": 104,
            "e": 92
        }
    },
    "66": {
        "title": "A misty room",
        "coordinates": "(65,62)",
        "exits": {
            "n": 169,
            "e": 123,
            "w": 38
        }
    },
    "69": {
        "title": "A misty room",
        "coordinates": "(64,65)",
        "exits": {
            "n": 94,
            "s": 51,
            "e": 103
        }
    },
    "88": {
        "title": "A misty room",
        "coordinates": "(62,65)",
        "exits": {
            "e": 53,
            "w": 122
        }
    },
    "92": {
        "title": "A misty room",
        "coordinates": "(65,61)",
        "exits": {
            "w": 59
        }
    },
    "94": {
        "title": "A misty room",
        "coordinates": "(64,66)",
        "exits": {
            "n": 152,
            "s": 69
        }
    },
    "95": {
        "title": "A misty room",
        "coordinates": "(63,66)",
        "exits": {
            "n": 119,
            "s": 53,
            "w": 115
        }
    },
    "103": {
        "title": "A misty room",
        "coordinates": "(65,65)",
        "exits": {
            "n": 160,
            "w": 69
        }
    },
    "104": {
        "title": "A misty room",
        "coordinates": "(64,60)",
        "exits": {
            "n": 59,
            "e": 107
        }
    },
    "107": {
        "title": "A misty room",
        "coordinates": "(65,60)",
        "exits": {
            "s": 120,
            "e": 121,
            "w": 104
        }
    },
    "115": {
        "title": "A misty room",
        "coordinates": "(62,66)",
        "exits": {
            "n": 116,
            "e": 95
        }
    },
    "116": {
        "title": "A misty room",
        "coordinates": "(62,67)",
        "exits": {
            "n": 132,
            "s": 115
        }
    },
    "119": {
        "title": "A misty room",
        "coordinates": "(63,67)",
        "exits": {
            "n": 134,
            "s": 95
        }
    },
    "120": {
        "title": "A misty room",
        "coordinates": "(65,59)",
        "exits": {
            "n": 107,
            "e": 127
        }
    },
    "121": {
        "title": "A misty room",
        "coordinates": "(66,60)",
        "exits": {
            "n": 128,
            "e": 143,
            "w": 107
        }
    },
    "122": {
        "title": "A misty room",
        "coordinates": "(61,65)",
        "exits": {
            "n": 124,
            "e": 88
        }
    },
    "123": {
        "title": "A misty room",
        "coordinates": "(66,62)",
        "exits": {
            "w": 66
        }
    },
    "124": {
        "title": "A misty room",
        "coordinates": "(61,66)",
        "exits": {
            "n": 157,
            "s": 122
        }
    },
    "127": {
        "title": "A misty room",
        "coordinates": "(66,59)",
        "exits": {
            "e": 184,
            "w": 120
        }
    },
    "128": {
        "title": "A misty room",
        "coordinates": "(66,61)",
        "exits": {
            "s": 121,
            "e": 189
        }
    },
    "132": {
        "title": "A misty room",
        "coordinates": "(62,68)",
        "exits": {
            "s": 116
        }
    },
    "134": {
        "title": "A misty room",
        "coordinates": "(63,68)",
        "exits": {
            "n": 147,
            "s": 119,
            "e": 144
        }
    },
    "143": {
        "title": "A misty room",
        "coordinates": "(67,60)",
        "exits": {
            "e": 212,
            "w": 121
        }
    },
    "144": {
        "title": "A misty room",
        "coordinates": "(64,68)",
        "exits": {
            "e": 155,
            "w": 134
        }
    },
    "145": {
        "title": "A misty room",
        "coordinates": "(66,64)",
        "exits": {
            "n": 174,
            "e": 220,
            "w": 57
        }
    },
    "147": {
        "title": "A misty room",
        "coordinates": "(63,69)",
        "exits": {
            "n": 200,
            "s": 134,
            "e": 153,
            "w": 151
        }
    },
    "151": {
        "title": "A misty room",
        "coordinates": "(62,69)",
        "exits": {
            "n": 172,
            "e": 147,
            "w": 207
        }
    },
    "152": {
        "title": "A misty room",
        "coordinates": "(64,67)",
        "exits": {
            "s": 94
        }
    },
    "153": {
        "title": "A misty room",
        "coordinates": "(64,69)",
        "exits": {
            "e": 329,
            "w": 147
        }
    },
    "155": {
        "title": "A misty room",
        "coordinates": "(65,68)",
        "exits": {
            "s": 187,
            "e": 316,
            "w": 144
        }
    },
    "157": {
        "title": "A misty room",
        "coordinates": "(61,67)",
        "exits": {
            "n": 210,
            "s": 124,
            "w": 182
        }
    },
    "160": {
        "title": "A misty room",
        "coordinates": "(65,66)",
        "exits": {
            "s": 103
        }
    },
    "169": {
        "title": "A misty room",
        "coordinates": "(65,63)",
        "exits": {
            "s": 66,
            "e": 186
        }
    },
    "172": {
        "title": "A misty room",
        "coordinates": "(62,70)",
        "exits": {
            "n": 267,
            "s": 151
        }
    },
    "174": {
        "title": "A misty room",
        "coordinates": "(66,65)",
        "exits": {
            "n": 192,
            "s": 145,
            "e": 224
        }
    },
    "182": {
        "title": "A misty room",
        "coordinates": "(60,67)",
        "exits": {
            "e": 157,
            "w": 208
        }
    },
    "184": {
        "title": "A misty room",
        "coordinates": "(67,59)",
        "exits": {
            "e": 221,
            "w": 127
        }
    },
    "186": {
        "title": "A misty room",
        "coordinates": "(66,63)",
        "exits": {
            "e": 205,
            "w": 169
        }
    },
    "187": {
        "title": "A misty room",
        "coordinates": "(65,67)",
        "exits": {
            "n": 155
        }
    },
    "189": {
        "title": "A misty room",
        "coordinates": "(67,61)",
        "exits": {
            "e": 255,
            "w": 128
        }
    },
    "192": {
        "title": "A misty room",
        "coordinates": "(66,66)",
        "exits": {
            "n": 201,
            "s": 174,
            "e": 223
        }
    },
    "200": {
        "title": "A misty room",
        "coordinates": "(63,70)",
        "exits": {
            "n": 227,
            "s": 147,
            "e": 206
        }
    },
    "201": {
        "title": "A misty room",
        "coordinates": "(66,67)",
        "exits": {
            "s": 192
        }
    },
    "205": {
        "title": "A misty room",
        "coordinates": "(67,63)",
        "exits": {
            "s": 241,
            "e": 479,
            "w": 186
        }
    },
    "206": {
        "title": "A misty room",
        "coordinates": "(64,70)",
        "exits": {
            "n": 288,
            "e": 380,
            "w": 200
        }
    },
    "207": {
        "title": "A misty room",
        "coordinates": "(61,69)",
        "exits": {
            "n": 231,
            "e": 151,
            "w": 290
        }
    },
    "208": {
        "title": "A misty room",
        "coordinates": "(59,67)",
        "exits": {
            "e": 182
        }
    },
    "210": {
        "title": "A misty room",
        "coordinates": "(61,68)",
        "exits": {
            "s": 157
        }
    },
    "212": {
        "title": "A misty room",
        "coordinates": "(68,60)",
        "exits": {
            "w": 143
        }
    },
    "220": {
        "title": "A misty room",
        "coordinates": "(67,64)",
        "exits": {
            "w": 145
        }
    },
    "221": {
        "title": "A misty room",
        "coordinates": "(68,59)",
        "exits": {
            "s": 253,
            "e": 240,
            "w": 184
        }
    },
    "223": {
        "title": "A misty room",
        "coordinates": "(67,66)",
        "exits": {
            "n": 283,
            "w": 192
        }
    },
    "224": {
        "title": "A misty room",
        "coordinates": "(67,65)",
        "exits": {
            "w": 174
        }
    },
    "227": {
        "title": "A misty room",
        "coordinates": "(63,71)",
        "exits": {
            "n": 269,
            "s": 200
        }
    },
    "231": {
        "title": "A misty room",
        "coordinates": "(61,70)",
        "exits": {
            "s": 207,
            "w": 248
        }
    },
    "240": {
        "title": "A misty room",
        "coordinates": "(69,59)",
        "exits": {
            "n": 249,
            "e": 386,
            "w": 221
        }
    },
    "241": {
        "title": "A misty room",
        "coordinates": "(67,62)",
        "exits": {
            "n": 205,
            "e": 266
        }
    },
    "248": {
        "title": "A misty room",
        "coordinates": "(60,70)",
        "exits": {
            "n": 296,
            "e": 231,
            "w": 280
        }
    },
    "249": {
        "title": "A misty room",
        "coordinates": "(69,60)",
        "exits": {
            "n": 265,
            "s": 240,
            "e": 282
        }
    },
    "253": {
        "title": "A misty room",
        "coordinates": "(68,58)",
        "exits": {
            "n": 221,
            "e": 258
        }
    },
    "255": {
        "title": "A misty room",
        "coordinates": "(68,61)",
        "exits": {
            "w": 189
        }
    },
    "258": {
        "title": "A misty room",
        "coordinates": "(69,58)",
        "exits": {
            "e": 306,
            "w": 253
        }
    },
    "265": {
        "title": "A misty room",
        "coordinates": "(69,61)",
        "exits": {
            "n": 279,
            "s": 249,
            "e": 270
        }
    },
    "266": {
        "title": "A misty room",
        "coordinates": "(68,62)",
        "exits": {
            "w": 241
        }
    },
    "267": {
        "title": "A misty room",
        "coordinates": "(62,71)",
        "exits": {
            "n": 285,
            "s": 172,
            "w": 271
        }
    },
    "269": {
        "title": "A misty room",
        "coordinates": "(63,72)",
        "exits": {
            "n": 319,
            "s": 227
        }
    },
    "270": {
        "title": "A misty room",
        "coordinates": "(70,61)",
        "exits": {
            "n": 416,
            "e": 338,
            "w": 265
        }
    },
    "271": {
        "title": "A misty room",
        "coordinates": "(61,71)",
        "exits": {
            "n": 337,
            "e": 267
        }
    },
    "279": {
        "title": "A misty room",
        "coordinates": "(69,62)",
        "exits": {
            "s": 265
        }
    },
    "280": {
        "title": "A misty room",
        "coordinates": "(59,70)",
        "exits": {
            "n": 325,
            "e": 248
        }
    },
    "282": {
        "title": "A misty room",
        "coordinates": "(70,60)",
        "exits": {
            "w": 249
        }
    },
    "283": {
        "title": "A misty room",
        "coordinates": "(67,67)",
        "exits": {
            "n": 331,
            "s": 223,
            "e": 313
        }
    },
    "285": {
        "title": "A misty room",
        "coordinates": "(62,72)",
        "exits": {
            "n": 286,
            "s": 267
        }
    },
    "286": {
        "title": "A misty room",
        "coordinates": "(62,73)",
        "exits": {
            "n": 336,
            "s": 285,
            "w": 291
        }
    },
    "288": {
        "title": "A misty room",
        "coordinates": "(64,71)",
        "exits": {
            "s": 206
        }
    },
    "290": {
        "title": "A misty room",
        "coordinates": "(60,69)",
        "exits": {
            "e": 207
        }
    },
    "291": {
        "title": "A misty room",
        "coordinates": "(61,73)",
        "exits": {
            "n": 410,
            "e": 286,
            "w": 347
        }
    },
    "296": {
        "title": "A misty room",
        "coordinates": "(60,71)",
        "exits": {
            "s": 248
        }
    },
    "306": {
        "title": "A misty room",
        "coordinates": "(70,58)",
        "exits": {
            "e": 397,
            "w": 258
        }
    },
    "313": {
        "title": "A misty room",
        "coordinates": "(68,67)",
        "exits": {
            "w": 283
        }
    },
    "316": {
        "title": "A misty room",
        "coordinates": "(66,68)",
        "exits": {
            "n": 344,
            "w": 155
        }
    },
    "319": {
        "title": "A misty room",
        "coordinates": "(63,73)",
        "exits": {
            "n": 359,
            "s": 269,
            "e": 345
        }
    },
    "325": {
        "title": "A misty room",
        "coordinates": "(59,71)",
        "exits": {
            "n": 353,
            "s": 280,
            "w": 374
        }
    },
    "329": {
        "title": "A misty room",
        "coordinates": "(65,69)",
        "exits": {
            "w": 153
        }
    },
    "331": {
        "title": "A misty room",
        "coordinates": "(67,68)",
        "exits": {
            "s": 283,
            "e": 446
        }
    },
    "336": {
        "title": "A misty room",
        "coordinates": "(62,74)",
        "exits": {
            "s": 286
        }
    },
    "337": {
        "title": "A misty room",
        "coordinates": "(61,72)",
        "exits": {
            "s": 271
        }
    },
    "338": {
        "title": "A misty room",
        "coordinates": "(71,61)",
        "exits": {
            "s": 379,
            "w": 270
        }
    },
    "344": {
        "title": "A misty room",
        "coordinates": "(66,69)",
        "exits": {
            "n": 392,
            "s": 316,
            "e": 390
        }
    },
    "345": {
        "title": "A misty room",
        "coordinates": "(64,73)",
        "exits": {
            "s": 375,
            "w": 319
        }
    },
    "347": {
        "title": "A misty room",
        "coordinates": "(60,73)",
        "exits": {
            "n": 452,
            "s": 442,
            "e": 291
        }
    },
    "353": {
        "title": "A misty room",
        "coordinates": "(59,72)",
        "exits": {
            "s": 325
        }
    },
    "359": {
        "title": "A misty room",
        "coordinates": "(63,74)",
        "exits": {
            "s": 319
        }
    },
    "374": {
        "title": "A misty room",
        "coordinates": "(58,71)",
        "exits": {
            "e": 325
        }
    },
    "375": {
        "title": "A misty room",
        "coordinates": "(64,72)",
        "exits": {
            "n": 345,
            "e": 385
        }
    },
    "379": {
        "title": "A misty room",
        "coordinates": "(71,60)",
        "exits": {
            "n": 338,
            "e": 395
        }
    },
    "380": {
        "title": "A misty room",
        "coordinates": "(65,70)",
        "exits": {
            "n": 424,
            "w": 206
        }
    },
    "385": {
        "title": "A misty room",
        "coordinates": "(65,72)",
        "exits": {
            "w": 375
        }
    },
    "386": {
        "title": "A misty room",
        "coordinates": "(70,59)",
        "exits": {
            "e": 414,
            "w": 240
        }
    },
    "390": {
        "title": "A misty room",
        "coordinates": "(67,69)",
        "exits": {
            "w": 344
        }
    },
    "392": {
        "title": "A misty room",
        "coordinates": "(66,70)",
        "exits": {
            "s": 344,
            "e": 462
        }
    },
    "395": {
        "title": "A misty room",
        "coordinates": "(72,60)",
        "exits": {
            "s": 403,
            "e": 421,
            "w": 379
        }
    },
    "397": {
        "title": "A misty room",
        "coordinates": "(71,58)",
        "exits": {
            "w": 306
        }
    },
    "403": {
        "title": "A misty room",
        "coordinates": "(72,59)",
        "exits": {
            "n": 395
        }
    },
    "410": {
        "title": "A misty room",
        "coordinates": "(61,74)",
        "exits": {
            "s": 291
        }
    },
    "414": {
        "title": "A misty room",
        "coordinates": "(71,59)",
        "exits": {
            "w": 386
        }
    },
    "416": {
        "title": "A misty room",
        "coordinates": "(70,62)",
        "exits": {
            "s": 270
        }
    },
    "421": {
        "title": "A misty room",
        "coordinates": "(73,60)",
        "exits": {
            "n": 440,
            "w": 395
        }
    },
    "424": {
        "title": "A misty room",
        "coordinates": "(65,71)",
        "exits": {
            "s": 380,
            "e": 473
        }
    },
    "440": {
        "title": "A misty room",
        "coordinates": "(73,61)",
        "exits": {
            "s": 421,
            "w": 476
        }
    },
    "442": {
        "title": "A misty room",
        "coordinates": "(60,72)",
        "exits": {
            "n": 347
        }
    },
    "446": {
        "title": "A misty room",
        "coordinates": "(68,68)",
        "exits": {
            "e": 466,
            "w": 331
        }
    },
    "452": {
        "title": "A misty room",
        "coordinates": "(60,74)",
        "exits": {
            "s": 347
        }
    },
    "462": {
        "title": "A misty room",
        "coordinates": "(67,70)",
        "exits": {
            "w": 392
        }
    },
    "466": {
        "title": "A misty room",
        "coordinates": "(69,68)",
        "exits": {
            "s": 486,
            "e": 472,
            "w": 446
        }
    },
    "472": {
        "title": "A misty room",
        "coordinates": "(70,68)",
        "exits": {
            "w": 466
        }
    },
    "473": {
        "title": "A misty room",
        "coordinates": "(66,71)",
        "exits": {
            "e": 494,
            "w": 424
        }
    },
    "476": {
        "title": "A misty room",
        "coordinates": "(72,61)",
        "exits": {
            "e": 440
        }
    },
    "479": {
        "title": "A misty room",
        "coordinates": "(68,63)",
        "exits": {
            "w": 205
        }
    },
    "486": {
        "title": "A misty room",
        "coordinates": "(69,67)",
        "exits": {
            "n": 466
        }
    },
    "494": {
        "title": "A misty room",
        "coordinates": "(67,71)",
        "exits": {
            "w": 473
        }
    }
}

const starting_room = {
    "0": {
        "title": "A brightly lit room",
        "coordinates": "(60,60)",
        "exits": {
            "n": 10,
            "s": "?",
            "e": 4,
            "w": 1
        }
    },
}

function Adventure(props) {
    const [searchedRooms, setRooms] = useState(data)
    // const [currMap, setMap] = useState({})
    const [currInfo, setCurrInfo] = useState(starting_room)

    // useEffect(() => {
    //     const auth = `Token ${localStorage.getItem("key")}`
    //     const options = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': auth
    //         }
    //     }
    //     // console.log(options)
    //     axios
    //         .get(`${props.backendUrl}/api/adv/init/`, options)
    //         .then(res => {
    //             setCurrInfo(res.data)
    //         })
    // }, [props.logedIn, props.backendUrl])

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


    // console.log(searchedRooms)

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
                <Map rooms={searchedRooms} currInfo={currInfo}></Map>

            </div>

        </div>
    )

}

export default Adventure;