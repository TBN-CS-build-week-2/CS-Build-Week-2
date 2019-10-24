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
            "s": 2,
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
    "2": {
        "title": "A misty room",
        "coordinates": "(60,59)",
        "exits": {
            "n": 0,
            "s": 6,
            "e": 3
        }
    },
    "3": {
        "title": "Mt. Holloway",
        "coordinates": "(61,59)",
        "exits": {
            "s": 9,
            "e": 5,
            "w": 2
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
    "5": {
        "title": "A misty room",
        "coordinates": "(62,59)",
        "exits": {
            "w": 3
        }
    },
    "6": {
        "title": "A misty room",
        "coordinates": "(60,58)",
        "exits": {
            "n": 2,
            "w": 7
        }
    },
    "7": {
        "title": "A misty room",
        "coordinates": "(59,58)",
        "exits": {
            "n": 8,
            "e": 6,
            "w": 56
        }
    },
    "8": {
        "title": "A misty room",
        "coordinates": "(59,59)",
        "exits": {
            "s": 7,
            "w": 16
        }
    },
    "9": {
        "title": "Mt. Holloway",
        "coordinates": "(61,58)",
        "exits": {
            "n": 3,
            "s": 12,
            "e": 11
        }
    },
    "10": {
        "title": "A misty room",
        "coordinates": "(60,61)",
        "exits": {
            "n": 19,
            "s": 0,
            "w": 43
        }
    },
    "11": {
        "title": "Mt. Holloway",
        "coordinates": "(62,58)",
        "exits": {
            "e": 17,
            "w": 9
        }
    },
    "12": {
        "title": "Mt. Holloway",
        "coordinates": "(61,57)",
        "exits": {
            "n": 9,
            "s": 18,
            "e": 14,
            "w": 21
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
    "14": {
        "title": "Mt. Holloway",
        "coordinates": "(62,57)",
        "exits": {
            "s": 34,
            "e": 37,
            "w": 12
        }
    },
    "15": {
        "title": "A misty room",
        "coordinates": "(63,60)",
        "exits": {
            "w": 13
        }
    },
    "16": {
        "title": "A misty room",
        "coordinates": "(58,59)",
        "exits": {
            "n": 58,
            "e": 8,
            "w": 67
        }
    },
    "17": {
        "title": "A misty room",
        "coordinates": "(63,58)",
        "exits": {
            "n": 24,
            "e": 42,
            "w": 11
        }
    },
    "18": {
        "title": "Mt. Holloway",
        "coordinates": "(61,56)",
        "exits": {
            "n": 12,
            "s": 22,
            "w": 25
        }
    },
    "19": {
        "title": "A misty room",
        "coordinates": "(60,62)",
        "exits": {
            "n": 20,
            "s": 10,
            "w": 77
        }
    },
    "20": {
        "title": "A misty room",
        "coordinates": "(60,63)",
        "exits": {
            "n": 63,
            "s": 19,
            "e": 27,
            "w": 46
        }
    },
    "21": {
        "title": "Mt. Holloway",
        "coordinates": "(60,57)",
        "exits": {
            "e": 12,
            "w": 29
        }
    },
    "22": {
        "title": "The Peak of Mt. Holloway",
        "coordinates": "(61,55)",
        "exits": {
            "n": 18,
            "s": 78,
            "w": 36
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
    "24": {
        "title": "A misty room",
        "coordinates": "(63,59)",
        "exits": {
            "s": 17
        }
    },
    "25": {
        "title": "Mt. Holloway",
        "coordinates": "(60,56)",
        "exits": {
            "e": 18
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
    "29": {
        "title": "Mt. Holloway",
        "coordinates": "(59,57)",
        "exits": {
            "s": 45,
            "e": 21,
            "w": 49
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
    "34": {
        "title": "Mt. Holloway",
        "coordinates": "(62,56)",
        "exits": {
            "n": 14,
            "s": 50,
            "e": 35
        }
    },
    "35": {
        "title": "A misty room",
        "coordinates": "(63,56)",
        "exits": {
            "s": 52,
            "w": 34
        }
    },
    "36": {
        "title": "Mt. Holloway",
        "coordinates": "(60,55)",
        "exits": {
            "s": 48,
            "e": 22,
            "w": 60
        }
    },
    "37": {
        "title": "Mt. Holloway",
        "coordinates": "(63,57)",
        "exits": {
            "w": 14
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
    "42": {
        "title": "A misty room",
        "coordinates": "(64,58)",
        "exits": {
            "n": 44,
            "s": 80,
            "e": 118,
            "w": 17
        }
    },
    "43": {
        "title": "A misty room",
        "coordinates": "(59,61)",
        "exits": {
            "e": 10,
            "w": 47
        }
    },
    "44": {
        "title": "A misty room",
        "coordinates": "(64,59)",
        "exits": {
            "s": 42
        }
    },
    "45": {
        "title": "Mt. Holloway",
        "coordinates": "(59,56)",
        "exits": {
            "n": 29,
            "s": 60
        }
    },
    "46": {
        "title": "A misty room",
        "coordinates": "(59,63)",
        "exits": {
            "e": 20,
            "w": 62
        }
    },
    "47": {
        "title": "A misty room",
        "coordinates": "(58,61)",
        "exits": {
            "n": 71,
            "e": 43
        }
    },
    "48": {
        "title": "Mt. Holloway",
        "coordinates": "(60,54)",
        "exits": {
            "n": 36,
            "s": 105,
            "w": 149
        }
    },
    "49": {
        "title": "A misty room",
        "coordinates": "(58,57)",
        "exits": {
            "s": 79,
            "e": 29,
            "w": 136
        }
    },
    "50": {
        "title": "A misty room",
        "coordinates": "(62,55)",
        "exits": {
            "n": 34,
            "s": 89
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
    "52": {
        "title": "A misty room",
        "coordinates": "(63,55)",
        "exits": {
            "n": 35,
            "s": 68,
            "e": 75
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
    "56": {
        "title": "A misty room",
        "coordinates": "(58,58)",
        "exits": {
            "e": 7,
            "w": 61
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
    "58": {
        "title": "A misty room",
        "coordinates": "(58,60)",
        "exits": {
            "s": 16,
            "w": 65
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
    "60": {
        "title": "Mt. Holloway",
        "coordinates": "(59,55)",
        "exits": {
            "n": 22,
            "e": 36,
            "w": 70
        }
    },
    "61": {
        "title": "A misty room",
        "coordinates": "(57,58)",
        "exits": {
            "e": 56,
            "w": 171
        }
    },
    "62": {
        "title": "A misty room",
        "coordinates": "(58,63)",
        "exits": {
            "n": 64,
            "e": 46,
            "w": 84
        }
    },
    "63": {
        "title": "A misty room",
        "coordinates": "(60,64)",
        "exits": {
            "n": 72,
            "s": 20,
            "w": 73
        }
    },
    "64": {
        "title": "A misty room",
        "coordinates": "(58,64)",
        "exits": {
            "s": 62,
            "w": 82
        }
    },
    "65": {
        "title": "A misty room",
        "coordinates": "(57,60)",
        "exits": {
            "n": 74,
            "e": 58,
            "w": 139
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
    "67": {
        "title": "A misty room",
        "coordinates": "(57,59)",
        "exits": {
            "e": 16,
            "w": 162
        }
    },
    "68": {
        "title": "A misty room",
        "coordinates": "(63,54)",
        "exits": {
            "n": 52,
            "e": 100
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
    "70": {
        "title": "Mt. Holloway",
        "coordinates": "(58,55)",
        "exits": {
            "s": 163,
            "e": 60,
            "w": 98
        }
    },
    "71": {
        "title": "A misty room",
        "coordinates": "(58,62)",
        "exits": {
            "s": 47
        }
    },
    "72": {
        "title": "A misty room",
        "coordinates": "(60,65)",
        "exits": {
            "s": 63,
            "w": 76
        }
    },
    "73": {
        "title": "A misty room",
        "coordinates": "(59,64)",
        "exits": {
            "e": 63
        }
    },
    "74": {
        "title": "A misty room",
        "coordinates": "(57,61)",
        "exits": {
            "n": 87,
            "s": 65,
            "w": 161
        }
    },
    "75": {
        "title": "A misty room",
        "coordinates": "(64,55)",
        "exits": {
            "e": 85,
            "w": 52
        }
    },
    "76": {
        "title": "A misty room",
        "coordinates": "(59,65)",
        "exits": {
            "n": 83,
            "e": 72,
            "w": 110
        }
    },
    "77": {
        "title": "A misty room",
        "coordinates": "(59,62)",
        "exits": {
            "e": 19
        }
    },
    "78": {
        "title": "Mt. Holloway",
        "coordinates": "(61,54)",
        "exits": {
            "n": 22,
            "s": 108
        }
    },
    "79": {
        "title": "A misty room",
        "coordinates": "(58,56)",
        "exits": {
            "n": 49
        }
    },
    "80": {
        "title": "A misty room",
        "coordinates": "(64,57)",
        "exits": {
            "n": 42,
            "s": 81,
            "e": 86
        }
    },
    "81": {
        "title": "A misty room",
        "coordinates": "(64,56)",
        "exits": {
            "n": 80
        }
    },
    "82": {
        "title": "A misty room",
        "coordinates": "(57,64)",
        "exits": {
            "n": 191,
            "e": 64
        }
    },
    "83": {
        "title": "A misty room",
        "coordinates": "(59,66)",
        "exits": {
            "s": 76,
            "e": 130,
            "w": 125
        }
    },
    "84": {
        "title": "A misty room",
        "coordinates": "(57,63)",
        "exits": {
            "e": 62,
            "w": 91
        }
    },
    "85": {
        "title": "A misty room",
        "coordinates": "(65,55)",
        "exits": {
            "e": 154,
            "w": 75
        }
    },
    "86": {
        "title": "A misty room",
        "coordinates": "(65,57)",
        "exits": {
            "s": 96,
            "e": 90,
            "w": 80
        }
    },
    "87": {
        "title": "A misty room",
        "coordinates": "(57,62)",
        "exits": {
            "s": 74
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
    "89": {
        "title": "Mt. Holloway",
        "coordinates": "(62,54)",
        "exits": {
            "n": 50,
            "s": 93
        }
    },
    "90": {
        "title": "A misty room",
        "coordinates": "(66,57)",
        "exits": {
            "e": 178,
            "w": 86
        }
    },
    "91": {
        "title": "A misty room",
        "coordinates": "(56,63)",
        "exits": {
            "n": 180,
            "s": 101,
            "e": 84,
            "w": 99
        }
    },
    "92": {
        "title": "A misty room",
        "coordinates": "(65,61)",
        "exits": {
            "w": 59
        }
    },
    "93": {
        "title": "Mt. Holloway",
        "coordinates": "(62,53)",
        "exits": {
            "n": 89,
            "w": 108
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
    "96": {
        "title": "A misty room",
        "coordinates": "(65,56)",
        "exits": {
            "n": 86,
            "e": 97
        }
    },
    "97": {
        "title": "A misty room",
        "coordinates": "(66,56)",
        "exits": {
            "e": 181,
            "w": 96
        }
    },
    "98": {
        "title": "Mt. Holloway",
        "coordinates": "(57,55)",
        "exits": {
            "n": 102,
            "s": 126,
            "e": 70,
            "w": 109
        }
    },
    "99": {
        "title": "A misty room",
        "coordinates": "(55,63)",
        "exits": {
            "n": 190,
            "e": 91,
            "w": 146
        }
    },
    "100": {
        "title": "A misty room",
        "coordinates": "(64,54)",
        "exits": {
            "s": 106,
            "e": 112,
            "w": 68
        }
    },
    "101": {
        "title": "A misty room",
        "coordinates": "(56,62)",
        "exits": {
            "n": 91,
            "w": 113
        }
    },
    "102": {
        "title": "A misty room",
        "coordinates": "(57,56)",
        "exits": {
            "s": 98,
            "w": 142
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
    "105": {
        "title": "Mt. Holloway",
        "coordinates": "(60,53)",
        "exits": {
            "n": 48,
            "w": 202
        }
    },
    "106": {
        "title": "A misty room",
        "coordinates": "(64,53)",
        "exits": {
            "n": 100,
            "s": 111,
            "w": 135
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
    "108": {
        "title": "Mt. Holloway",
        "coordinates": "(61,53)",
        "exits": {
            "n": 78,
            "s": 117,
            "e": 93
        }
    },
    "109": {
        "title": "A misty room",
        "coordinates": "(56,55)",
        "exits": {
            "s": 185,
            "e": 98,
            "w": 175
        }
    },
    "110": {
        "title": "A misty room",
        "coordinates": "(58,65)",
        "exits": {
            "e": 76
        }
    },
    "111": {
        "title": "A misty room",
        "coordinates": "(64,52)",
        "exits": {
            "n": 106,
            "s": 367,
            "e": 158
        }
    },
    "112": {
        "title": "A misty room",
        "coordinates": "(65,54)",
        "exits": {
            "s": 141,
            "e": 140,
            "w": 100
        }
    },
    "113": {
        "title": "A misty room",
        "coordinates": "(55,62)",
        "exits": {
            "s": 114,
            "e": 101
        }
    },
    "114": {
        "title": "A misty room",
        "coordinates": "(55,61)",
        "exits": {
            "n": 113,
            "w": 176
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
    "117": {
        "title": "Mt. Holloway",
        "coordinates": "(61,52)",
        "exits": {
            "n": 108,
            "s": 131,
            "e": 166,
            "w": 133
        }
    },
    "118": {
        "title": "A misty room",
        "coordinates": "(65,58)",
        "exits": {
            "e": 137,
            "w": 42
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
    "125": {
        "title": "A misty room",
        "coordinates": "(58,66)",
        "exits": {
            "n": 165,
            "e": 83,
            "w": 237
        }
    },
    "126": {
        "title": "A misty room",
        "coordinates": "(57,54)",
        "exits": {
            "n": 98,
            "s": 129
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
    "129": {
        "title": "A misty room",
        "coordinates": "(57,53)",
        "exits": {
            "n": 126,
            "e": 194,
            "w": 170
        }
    },
    "130": {
        "title": "A misty room",
        "coordinates": "(60,66)",
        "exits": {
            "w": 83
        }
    },
    "131": {
        "title": "Mt. Holloway",
        "coordinates": "(61,51)",
        "exits": {
            "n": 117,
            "s": 244,
            "w": 138
        }
    },
    "132": {
        "title": "A misty room",
        "coordinates": "(62,68)",
        "exits": {
            "s": 116
        }
    },
    "133": {
        "title": "Mt. Holloway",
        "coordinates": "(60,52)",
        "exits": {
            "e": 117,
            "w": 173
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
    "135": {
        "title": "A misty room",
        "coordinates": "(63,53)",
        "exits": {
            "s": 150,
            "e": 106
        }
    },
    "136": {
        "title": "A misty room",
        "coordinates": "(57,57)",
        "exits": {
            "e": 49,
            "w": 148
        }
    },
    "137": {
        "title": "A misty room",
        "coordinates": "(66,58)",
        "exits": {
            "w": 118
        }
    },
    "138": {
        "title": "A misty room",
        "coordinates": "(60,51)",
        "exits": {
            "s": 211,
            "e": 131,
            "w": 195
        }
    },
    "139": {
        "title": "A misty room",
        "coordinates": "(56,60)",
        "exits": {
            "e": 65,
            "w": 188
        }
    },
    "140": {
        "title": "A misty room",
        "coordinates": "(66,54)",
        "exits": {
            "w": 112
        }
    },
    "141": {
        "title": "A misty room",
        "coordinates": "(65,53)",
        "exits": {
            "n": 112,
            "e": 156
        }
    },
    "142": {
        "title": "A misty room",
        "coordinates": "(56,56)",
        "exits": {
            "e": 102,
            "w": 159
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
    "146": {
        "title": "A misty room",
        "coordinates": "(54,63)",
        "exits": {
            "n": 215,
            "s": 177,
            "e": 99,
            "w": 257
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
    "148": {
        "title": "A misty room",
        "coordinates": "(56,57)",
        "exits": {
            "e": 136,
            "w": 292
        }
    },
    "149": {
        "title": "Mt. Holloway",
        "coordinates": "(59,54)",
        "exits": {
            "e": 48
        }
    },
    "150": {
        "title": "A misty room",
        "coordinates": "(63,52)",
        "exits": {
            "n": 135,
            "w": 166
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
    "154": {
        "title": "A misty room",
        "coordinates": "(66,55)",
        "exits": {
            "e": 193,
            "w": 85
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
    "156": {
        "title": "A misty room",
        "coordinates": "(66,53)",
        "exits": {
            "s": 168,
            "e": 164,
            "w": 141
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
    "158": {
        "title": "A misty room",
        "coordinates": "(65,52)",
        "exits": {
            "s": 167,
            "w": 111
        }
    },
    "159": {
        "title": "A misty room",
        "coordinates": "(55,56)",
        "exits": {
            "e": 142,
            "w": 196
        }
    },
    "160": {
        "title": "A misty room",
        "coordinates": "(65,66)",
        "exits": {
            "s": 103
        }
    },
    "161": {
        "title": "A misty room",
        "coordinates": "(56,61)",
        "exits": {
            "e": 74
        }
    },
    "162": {
        "title": "A misty room",
        "coordinates": "(56,59)",
        "exits": {
            "e": 67
        }
    },
    "163": {
        "title": "Mt. Holloway",
        "coordinates": "(58,54)",
        "exits": {
            "n": 70
        }
    },
    "164": {
        "title": "A misty room",
        "coordinates": "(67,53)",
        "exits": {
            "n": 217,
            "e": 298,
            "w": 156
        }
    },
    "165": {
        "title": "A misty room",
        "coordinates": "(58,67)",
        "exits": {
            "n": 203,
            "s": 125,
            "w": 204
        }
    },
    "166": {
        "title": "Mt. Holloway",
        "coordinates": "(62,52)",
        "exits": {
            "s": 198,
            "e": 150,
            "w": 117
        }
    },
    "167": {
        "title": "A misty room",
        "coordinates": "(65,51)",
        "exits": {
            "n": 158,
            "s": 262,
            "e": 260
        }
    },
    "168": {
        "title": "A misty room",
        "coordinates": "(66,52)",
        "exits": {
            "n": 156,
            "e": 340
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
    "170": {
        "title": "A misty room",
        "coordinates": "(56,53)",
        "exits": {
            "e": 129
        }
    },
    "171": {
        "title": "A misty room",
        "coordinates": "(56,58)",
        "exits": {
            "e": 61
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
    "173": {
        "title": "A misty room",
        "coordinates": "(59,52)",
        "exits": {
            "e": 133,
            "w": 214
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
    "175": {
        "title": "A misty room",
        "coordinates": "(55,55)",
        "exits": {
            "s": 183,
            "e": 109,
            "w": 179
        }
    },
    "176": {
        "title": "A misty room",
        "coordinates": "(54,61)",
        "exits": {
            "e": 114,
            "w": 402
        }
    },
    "177": {
        "title": "A misty room",
        "coordinates": "(54,62)",
        "exits": {
            "n": 146,
            "w": 346
        }
    },
    "178": {
        "title": "A misty room",
        "coordinates": "(67,57)",
        "exits": {
            "n": 209,
            "e": 243,
            "w": 90
        }
    },
    "179": {
        "title": "A misty room",
        "coordinates": "(54,55)",
        "exits": {
            "s": 233,
            "e": 175,
            "w": 213
        }
    },
    "180": {
        "title": "A misty room",
        "coordinates": "(56,64)",
        "exits": {
            "s": 91
        }
    },
    "181": {
        "title": "A misty room",
        "coordinates": "(67,56)",
        "exits": {
            "w": 97
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
    "183": {
        "title": "A misty room",
        "coordinates": "(55,54)",
        "exits": {
            "n": 175,
            "s": 229
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
    "185": {
        "title": "A misty room",
        "coordinates": "(56,54)",
        "exits": {
            "n": 109
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
    "188": {
        "title": "A misty room",
        "coordinates": "(55,60)",
        "exits": {
            "e": 139,
            "w": 335
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
    "190": {
        "title": "A misty room",
        "coordinates": "(55,64)",
        "exits": {
            "s": 99
        }
    },
    "191": {
        "title": "A misty room",
        "coordinates": "(57,65)",
        "exits": {
            "s": 82
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
    "193": {
        "title": "A misty room",
        "coordinates": "(67,55)",
        "exits": {
            "e": 251,
            "w": 154
        }
    },
    "194": {
        "title": "A misty room",
        "coordinates": "(58,53)",
        "exits": {
            "s": 214,
            "w": 129
        }
    },
    "195": {
        "title": "A misty room",
        "coordinates": "(59,51)",
        "exits": {
            "s": 228,
            "e": 138,
            "w": 225
        }
    },
    "196": {
        "title": "A misty room",
        "coordinates": "(54,56)",
        "exits": {
            "n": 222,
            "e": 159,
            "w": 197
        }
    },
    "197": {
        "title": "A misty room",
        "coordinates": "(53,56)",
        "exits": {
            "n": 232,
            "e": 196,
            "w": 276
        }
    },
    "198": {
        "title": "A misty room",
        "coordinates": "(62,51)",
        "exits": {
            "n": 166,
            "s": 239,
            "e": 199
        }
    },
    "199": {
        "title": "A misty room",
        "coordinates": "(63,51)",
        "exits": {
            "s": 230,
            "w": 198
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
    "202": {
        "title": "Mt. Holloway",
        "coordinates": "(59,53)",
        "exits": {
            "e": 105
        }
    },
    "203": {
        "title": "A misty room",
        "coordinates": "(58,68)",
        "exits": {
            "n": 268,
            "s": 165,
            "e": 299
        }
    },
    "204": {
        "title": "A misty room",
        "coordinates": "(57,67)",
        "exits": {
            "n": 219,
            "e": 165,
            "w": 216
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
    "209": {
        "title": "A misty room",
        "coordinates": "(67,58)",
        "exits": {
            "s": 178
        }
    },
    "210": {
        "title": "A misty room",
        "coordinates": "(61,68)",
        "exits": {
            "s": 157
        }
    },
    "211": {
        "title": "A misty room",
        "coordinates": "(60,50)",
        "exits": {
            "n": 138
        }
    },
    "212": {
        "title": "A misty room",
        "coordinates": "(68,60)",
        "exits": {
            "w": 143
        }
    },
    "213": {
        "title": "A misty room",
        "coordinates": "(53,55)",
        "exits": {
            "e": 179,
            "w": 420
        }
    },
    "214": {
        "title": "A misty room",
        "coordinates": "(58,52)",
        "exits": {
            "n": 194,
            "e": 173,
            "w": 226
        }
    },
    "215": {
        "title": "A misty room",
        "coordinates": "(54,64)",
        "exits": {
            "n": 246,
            "s": 146
        }
    },
    "216": {
        "title": "A Dark Cave",
        "coordinates": "(56,67)",
        "exits": {
            "n": 234,
            "e": 204,
            "w": 218
        }
    },
    "217": {
        "title": "A misty room",
        "coordinates": "(67,54)",
        "exits": {
            "s": 164,
            "e": 247
        }
    },
    "218": {
        "title": "A Dark Cave",
        "coordinates": "(55,67)",
        "exits": {
            "s": 263,
            "e": 216,
            "w": 242
        }
    },
    "219": {
        "title": "A misty room",
        "coordinates": "(57,68)",
        "exits": {
            "s": 204
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
    "222": {
        "title": "A misty room",
        "coordinates": "(54,57)",
        "exits": {
            "n": 305,
            "s": 196
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
    "225": {
        "title": "A misty room",
        "coordinates": "(58,51)",
        "exits": {
            "s": 278,
            "e": 195
        }
    },
    "226": {
        "title": "A misty room",
        "coordinates": "(57,52)",
        "exits": {
            "s": 300,
            "e": 214
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
    "228": {
        "title": "A misty room",
        "coordinates": "(59,50)",
        "exits": {
            "n": 195,
            "s": 281
        }
    },
    "229": {
        "title": "A misty room",
        "coordinates": "(55,53)",
        "exits": {
            "n": 183,
            "s": 250,
            "w": 236
        }
    },
    "230": {
        "title": "A misty room",
        "coordinates": "(63,50)",
        "exits": {
            "n": 199,
            "s": 307,
            "e": 297
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
    "232": {
        "title": "A misty room",
        "coordinates": "(53,57)",
        "exits": {
            "n": 272,
            "s": 197,
            "w": 235
        }
    },
    "233": {
        "title": "A misty room",
        "coordinates": "(54,54)",
        "exits": {
            "n": 179,
            "w": 238
        }
    },
    "234": {
        "title": "A Dark Cave",
        "coordinates": "(56,68)",
        "exits": {
            "n": 368,
            "s": 216,
            "w": 252
        }
    },
    "235": {
        "title": "A misty room",
        "coordinates": "(52,57)",
        "exits": {
            "n": 330,
            "e": 232,
            "w": 355
        }
    },
    "236": {
        "title": "A misty room",
        "coordinates": "(54,53)",
        "exits": {
            "s": 264,
            "e": 229
        }
    },
    "237": {
        "title": "A misty room",
        "coordinates": "(57,66)",
        "exits": {
            "e": 125,
            "w": 245
        }
    },
    "238": {
        "title": "A misty room",
        "coordinates": "(53,54)",
        "exits": {
            "e": 233
        }
    },
    "239": {
        "title": "A misty room",
        "coordinates": "(62,50)",
        "exits": {
            "n": 198,
            "w": 244
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
    "242": {
        "title": "A Dark Cave",
        "coordinates": "(54,67)",
        "exits": {
            "n": 287,
            "s": 259,
            "e": 218,
            "w": 275
        }
    },
    "243": {
        "title": "A misty room",
        "coordinates": "(68,57)",
        "exits": {
            "s": 293,
            "e": 256,
            "w": 178
        }
    },
    "244": {
        "title": "A misty room",
        "coordinates": "(61,50)",
        "exits": {
            "n": 131,
            "e": 239
        }
    },
    "245": {
        "title": "A misty room",
        "coordinates": "(56,66)",
        "exits": {
            "s": 254,
            "e": 237
        }
    },
    "246": {
        "title": "A misty room",
        "coordinates": "(54,65)",
        "exits": {
            "s": 215
        }
    },
    "247": {
        "title": "A misty room",
        "coordinates": "(68,54)",
        "exits": {
            "e": 261,
            "w": 217
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
    "250": {
        "title": "A misty room",
        "coordinates": "(55,52)",
        "exits": {
            "n": 229,
            "s": 294,
            "e": 289
        }
    },
    "251": {
        "title": "A misty room",
        "coordinates": "(68,55)",
        "exits": {
            "e": 315,
            "w": 193
        }
    },
    "252": {
        "title": "A Dark Cave",
        "coordinates": "(55,68)",
        "exits": {
            "n": 284,
            "e": 234
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
    "254": {
        "title": "A misty room",
        "coordinates": "(56,65)",
        "exits": {
            "n": 245,
            "w": 314
        }
    },
    "255": {
        "title": "A misty room",
        "coordinates": "(68,61)",
        "exits": {
            "w": 189
        }
    },
    "256": {
        "title": "A misty room",
        "coordinates": "(69,57)",
        "exits": {
            "s": 360,
            "e": 327,
            "w": 243
        }
    },
    "257": {
        "title": "A misty room",
        "coordinates": "(53,63)",
        "exits": {
            "n": 320,
            "e": 146,
            "w": 364
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
    "259": {
        "title": "A Dark Cave",
        "coordinates": "(54,66)",
        "exits": {
            "n": 242,
            "w": 310
        }
    },
    "260": {
        "title": "A misty room",
        "coordinates": "(66,51)",
        "exits": {
            "w": 167
        }
    },
    "261": {
        "title": "A misty room",
        "coordinates": "(69,54)",
        "exits": {
            "s": 277,
            "e": 322,
            "w": 247
        }
    },
    "262": {
        "title": "A misty room",
        "coordinates": "(65,50)",
        "exits": {
            "n": 167,
            "s": 370,
            "e": 358
        }
    },
    "263": {
        "title": "A Dark Cave",
        "coordinates": "(55,66)",
        "exits": {
            "n": 218
        }
    },
    "264": {
        "title": "A misty room",
        "coordinates": "(54,52)",
        "exits": {
            "n": 236,
            "s": 274,
            "w": 273
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
    "268": {
        "title": "A misty room",
        "coordinates": "(58,69)",
        "exits": {
            "s": 203,
            "e": 411,
            "w": 312
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
    "272": {
        "title": "A misty room",
        "coordinates": "(53,58)",
        "exits": {
            "n": 295,
            "s": 232
        }
    },
    "273": {
        "title": "A misty room",
        "coordinates": "(53,52)",
        "exits": {
            "n": 343,
            "e": 264
        }
    },
    "274": {
        "title": "A misty room",
        "coordinates": "(54,51)",
        "exits": {
            "n": 264,
            "w": 308
        }
    },
    "275": {
        "title": "A misty room",
        "coordinates": "(53,67)",
        "exits": {
            "e": 242,
            "w": 456
        }
    },
    "276": {
        "title": "A misty room",
        "coordinates": "(52,56)",
        "exits": {
            "e": 197,
            "w": 419
        }
    },
    "277": {
        "title": "A misty room",
        "coordinates": "(69,53)",
        "exits": {
            "n": 261,
            "e": 323
        }
    },
    "278": {
        "title": "A misty room",
        "coordinates": "(58,50)",
        "exits": {
            "n": 225
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
    "281": {
        "title": "A misty room",
        "coordinates": "(59,49)",
        "exits": {
            "n": 228,
            "s": 318,
            "e": 309,
            "w": 317
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
    "284": {
        "title": "A Dark Cave",
        "coordinates": "(55,69)",
        "exits": {
            "n": 302,
            "s": 252,
            "w": 303
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
    "287": {
        "title": "A Dark Cave",
        "coordinates": "(54,68)",
        "exits": {
            "s": 242,
            "w": 339
        }
    },
    "288": {
        "title": "A misty room",
        "coordinates": "(64,71)",
        "exits": {
            "s": 206
        }
    },
    "289": {
        "title": "A misty room",
        "coordinates": "(56,52)",
        "exits": {
            "w": 250
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
    "292": {
        "title": "A misty room",
        "coordinates": "(55,57)",
        "exits": {
            "n": 301,
            "e": 148
        }
    },
    "293": {
        "title": "A misty room",
        "coordinates": "(68,56)",
        "exits": {
            "n": 243
        }
    },
    "294": {
        "title": "A misty room",
        "coordinates": "(55,51)",
        "exits": {
            "n": 250,
            "s": 334
        }
    },
    "295": {
        "title": "A misty room",
        "coordinates": "(53,59)",
        "exits": {
            "s": 272
        }
    },
    "296": {
        "title": "A misty room",
        "coordinates": "(60,71)",
        "exits": {
            "s": 248
        }
    },
    "297": {
        "title": "A misty room",
        "coordinates": "(64,50)",
        "exits": {
            "w": 230
        }
    },
    "298": {
        "title": "A misty room",
        "coordinates": "(68,53)",
        "exits": {
            "s": 324,
            "w": 164
        }
    },
    "299": {
        "title": "A misty room",
        "coordinates": "(59,68)",
        "exits": {
            "e": 311,
            "w": 203
        }
    },
    "300": {
        "title": "A misty room",
        "coordinates": "(57,51)",
        "exits": {
            "n": 226,
            "s": 377,
            "w": 389
        }
    },
    "301": {
        "title": "A misty room",
        "coordinates": "(55,58)",
        "exits": {
            "n": 304,
            "s": 292
        }
    },
    "302": {
        "title": "A Dark Cave",
        "coordinates": "(55,70)",
        "exits": {
            "n": 422,
            "s": 284
        }
    },
    "303": {
        "title": "A Dark Cave",
        "coordinates": "(54,69)",
        "exits": {
            "n": 361,
            "e": 284,
            "w": 405
        }
    },
    "304": {
        "title": "A misty room",
        "coordinates": "(55,59)",
        "exits": {
            "s": 301
        }
    },
    "305": {
        "title": "A misty room",
        "coordinates": "(54,58)",
        "exits": {
            "n": 365,
            "s": 222
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
    "307": {
        "title": "A misty room",
        "coordinates": "(63,49)",
        "exits": {
            "n": 230,
            "s": 373,
            "e": 371,
            "w": 321
        }
    },
    "308": {
        "title": "A misty room",
        "coordinates": "(53,51)",
        "exits": {
            "e": 274
        }
    },
    "309": {
        "title": "A misty room",
        "coordinates": "(60,49)",
        "exits": {
            "s": 333,
            "e": 326,
            "w": 281
        }
    },
    "310": {
        "title": "A Dark Cave",
        "coordinates": "(53,66)",
        "exits": {
            "e": 259,
            "w": 412
        }
    },
    "311": {
        "title": "A misty room",
        "coordinates": "(60,68)",
        "exits": {
            "w": 299
        }
    },
    "312": {
        "title": "A misty room",
        "coordinates": "(57,69)",
        "exits": {
            "n": 328,
            "e": 268
        }
    },
    "313": {
        "title": "A misty room",
        "coordinates": "(68,67)",
        "exits": {
            "w": 283
        }
    },
    "314": {
        "title": "A misty room",
        "coordinates": "(55,65)",
        "exits": {
            "e": 254
        }
    },
    "315": {
        "title": "A misty room",
        "coordinates": "(69,55)",
        "exits": {
            "w": 251
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
    "317": {
        "title": "A misty room",
        "coordinates": "(58,49)",
        "exits": {
            "s": 387,
            "e": 281,
            "w": 409
        }
    },
    "318": {
        "title": "A misty room",
        "coordinates": "(59,48)",
        "exits": {
            "n": 281,
            "s": 487
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
    "320": {
        "title": "A misty room",
        "coordinates": "(53,64)",
        "exits": {
            "n": 348,
            "s": 257
        }
    },
    "321": {
        "title": "A misty room",
        "coordinates": "(62,49)",
        "exits": {
            "s": 413,
            "e": 307
        }
    },
    "322": {
        "title": "A misty room",
        "coordinates": "(70,54)",
        "exits": {
            "n": 382,
            "e": 435,
            "w": 261
        }
    },
    "323": {
        "title": "A misty room",
        "coordinates": "(70,53)",
        "exits": {
            "e": 433,
            "w": 277
        }
    },
    "324": {
        "title": "A misty room",
        "coordinates": "(68,52)",
        "exits": {
            "n": 298,
            "s": 349,
            "e": 354
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
    "326": {
        "title": "A misty room",
        "coordinates": "(61,49)",
        "exits": {
            "s": 342,
            "w": 309
        }
    },
    "327": {
        "title": "A misty room",
        "coordinates": "(70,57)",
        "exits": {
            "e": 427,
            "w": 256
        }
    },
    "328": {
        "title": "A misty room",
        "coordinates": "(57,70)",
        "exits": {
            "n": 332,
            "s": 312,
            "e": 357,
            "w": 363
        }
    },
    "329": {
        "title": "A misty room",
        "coordinates": "(65,69)",
        "exits": {
            "w": 153
        }
    },
    "330": {
        "title": "A misty room",
        "coordinates": "(52,58)",
        "exits": {
            "n": 369,
            "s": 235,
            "w": 383
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
    "332": {
        "title": "A misty room",
        "coordinates": "(57,71)",
        "exits": {
            "n": 350,
            "s": 328
        }
    },
    "333": {
        "title": "A misty room",
        "coordinates": "(60,48)",
        "exits": {
            "n": 309,
            "s": 378
        }
    },
    "334": {
        "title": "A misty room",
        "coordinates": "(55,50)",
        "exits": {
            "n": 294,
            "s": 393,
            "e": 341,
            "w": 391
        }
    },
    "335": {
        "title": "A misty room",
        "coordinates": "(54,60)",
        "exits": {
            "e": 188,
            "w": 366
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
    "339": {
        "title": "A Dark Cave",
        "coordinates": "(53,68)",
        "exits": {
            "e": 287,
            "w": 445
        }
    },
    "340": {
        "title": "A misty room",
        "coordinates": "(67,52)",
        "exits": {
            "w": 168
        }
    },
    "341": {
        "title": "A misty room",
        "coordinates": "(56,50)",
        "exits": {
            "s": 449,
            "w": 334
        }
    },
    "342": {
        "title": "A misty room",
        "coordinates": "(61,48)",
        "exits": {
            "n": 326,
            "s": 432
        }
    },
    "343": {
        "title": "A misty room",
        "coordinates": "(53,53)",
        "exits": {
            "s": 273,
            "w": 351
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
    "346": {
        "title": "A misty room",
        "coordinates": "(53,62)",
        "exits": {
            "e": 177
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
    "348": {
        "title": "A misty room",
        "coordinates": "(53,65)",
        "exits": {
            "s": 320
        }
    },
    "349": {
        "title": "A misty room",
        "coordinates": "(68,51)",
        "exits": {
            "n": 324,
            "s": 352,
            "e": 384,
            "w": 356
        }
    },
    "350": {
        "title": "A misty room",
        "coordinates": "(57,72)",
        "exits": {
            "n": 436,
            "s": 332,
            "e": 404
        }
    },
    "351": {
        "title": "A misty room",
        "coordinates": "(52,53)",
        "exits": {
            "s": 491,
            "e": 343,
            "w": 478
        }
    },
    "352": {
        "title": "A misty room",
        "coordinates": "(68,50)",
        "exits": {
            "n": 349,
            "s": 362,
            "e": 485
        }
    },
    "353": {
        "title": "A misty room",
        "coordinates": "(59,72)",
        "exits": {
            "s": 325
        }
    },
    "354": {
        "title": "A misty room",
        "coordinates": "(69,52)",
        "exits": {
            "w": 324
        }
    },
    "355": {
        "title": "A misty room",
        "coordinates": "(51,57)",
        "exits": {
            "e": 235
        }
    },
    "356": {
        "title": "A misty room",
        "coordinates": "(67,51)",
        "exits": {
            "e": 349
        }
    },
    "357": {
        "title": "A misty room",
        "coordinates": "(58,70)",
        "exits": {
            "w": 328
        }
    },
    "358": {
        "title": "A misty room",
        "coordinates": "(66,50)",
        "exits": {
            "e": 401,
            "w": 262
        }
    },
    "359": {
        "title": "A misty room",
        "coordinates": "(63,74)",
        "exits": {
            "s": 319
        }
    },
    "360": {
        "title": "A misty room",
        "coordinates": "(69,56)",
        "exits": {
            "n": 256,
            "e": 398
        }
    },
    "361": {
        "title": "A Dark Cave",
        "coordinates": "(54,70)",
        "exits": {
            "n": 408,
            "s": 303
        }
    },
    "362": {
        "title": "A misty room",
        "coordinates": "(68,49)",
        "exits": {
            "n": 352,
            "s": 399,
            "w": 463
        }
    },
    "363": {
        "title": "A misty room",
        "coordinates": "(56,70)",
        "exits": {
            "n": 372,
            "e": 328
        }
    },
    "364": {
        "title": "A misty room",
        "coordinates": "(52,63)",
        "exits": {
            "n": 429,
            "s": 381,
            "e": 257,
            "w": 448
        }
    },
    "365": {
        "title": "A misty room",
        "coordinates": "(54,59)",
        "exits": {
            "s": 305
        }
    },
    "366": {
        "title": "A misty room",
        "coordinates": "(53,60)",
        "exits": {
            "e": 335
        }
    },
    "367": {
        "title": "A misty room",
        "coordinates": "(64,51)",
        "exits": {
            "n": 111
        }
    },
    "368": {
        "title": "A Dark Cave",
        "coordinates": "(56,69)",
        "exits": {
            "s": 234
        }
    },
    "369": {
        "title": "A misty room",
        "coordinates": "(52,59)",
        "exits": {
            "n": 400,
            "s": 330,
            "w": 376
        }
    },
    "370": {
        "title": "A misty room",
        "coordinates": "(65,49)",
        "exits": {
            "n": 262,
            "s": 434,
            "e": 407
        }
    },
    "371": {
        "title": "A misty room",
        "coordinates": "(64,49)",
        "exits": {
            "s": 475,
            "w": 307
        }
    },
    "372": {
        "title": "A misty room",
        "coordinates": "(56,71)",
        "exits": {
            "n": 441,
            "s": 363
        }
    },
    "373": {
        "title": "A misty room",
        "coordinates": "(63,48)",
        "exits": {
            "n": 307,
            "s": 480
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
    "376": {
        "title": "A misty room",
        "coordinates": "(51,59)",
        "exits": {
            "e": 369
        }
    },
    "377": {
        "title": "A misty room",
        "coordinates": "(57,50)",
        "exits": {
            "n": 300
        }
    },
    "378": {
        "title": "A misty room",
        "coordinates": "(60,47)",
        "exits": {
            "n": 333
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
    "381": {
        "title": "A misty room",
        "coordinates": "(52,62)",
        "exits": {
            "n": 364,
            "w": 394
        }
    },
    "382": {
        "title": "A misty room",
        "coordinates": "(70,55)",
        "exits": {
            "s": 322,
            "e": 388
        }
    },
    "383": {
        "title": "A misty room",
        "coordinates": "(51,58)",
        "exits": {
            "e": 330,
            "w": 495
        }
    },
    "384": {
        "title": "A misty room",
        "coordinates": "(69,51)",
        "exits": {
            "w": 349
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
    "387": {
        "title": "A misty room",
        "coordinates": "(58,48)",
        "exits": {
            "n": 317,
            "s": 417,
            "w": 431
        }
    },
    "388": {
        "title": "A misty room",
        "coordinates": "(71,55)",
        "exits": {
            "e": 477,
            "w": 382
        }
    },
    "389": {
        "title": "A misty room",
        "coordinates": "(56,51)",
        "exits": {
            "e": 300
        }
    },
    "390": {
        "title": "A misty room",
        "coordinates": "(67,69)",
        "exits": {
            "w": 344
        }
    },
    "391": {
        "title": "A misty room",
        "coordinates": "(54,50)",
        "exits": {
            "s": 396,
            "e": 334,
            "w": 428
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
    "393": {
        "title": "A misty room",
        "coordinates": "(55,49)",
        "exits": {
            "n": 334,
            "s": 482
        }
    },
    "394": {
        "title": "A misty room",
        "coordinates": "(51,62)",
        "exits": {
            "e": 381
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
    "396": {
        "title": "A misty room",
        "coordinates": "(54,49)",
        "exits": {
            "n": 391
        }
    },
    "397": {
        "title": "A misty room",
        "coordinates": "(71,58)",
        "exits": {
            "w": 306
        }
    },
    "398": {
        "title": "A misty room",
        "coordinates": "(70,56)",
        "exits": {
            "e": 438,
            "w": 360
        }
    },
    "399": {
        "title": "A misty room",
        "coordinates": "(68,48)",
        "exits": {
            "n": 362,
            "s": 467
        }
    },
    "400": {
        "title": "A misty room",
        "coordinates": "(52,60)",
        "exits": {
            "s": 369
        }
    },
    "401": {
        "title": "A misty room",
        "coordinates": "(67,50)",
        "exits": {
            "w": 358
        }
    },
    "402": {
        "title": "A misty room",
        "coordinates": "(53,61)",
        "exits": {
            "e": 176,
            "w": 451
        }
    },
    "403": {
        "title": "A misty room",
        "coordinates": "(72,59)",
        "exits": {
            "n": 395
        }
    },
    "404": {
        "title": "A misty room",
        "coordinates": "(58,72)",
        "exits": {
            "n": 481,
            "w": 350
        }
    },
    "405": {
        "title": "A Dark Cave",
        "coordinates": "(53,69)",
        "exits": {
            "n": 406,
            "e": 303
        }
    },
    "406": {
        "title": "A Dark Cave",
        "coordinates": "(53,70)",
        "exits": {
            "s": 405,
            "w": 415
        }
    },
    "407": {
        "title": "A misty room",
        "coordinates": "(66,49)",
        "exits": {
            "s": 496,
            "w": 370
        }
    },
    "408": {
        "title": "A Dark Cave",
        "coordinates": "(54,71)",
        "exits": {
            "n": 458,
            "s": 361,
            "w": 423
        }
    },
    "409": {
        "title": "A misty room",
        "coordinates": "(57,49)",
        "exits": {
            "e": 317
        }
    },
    "410": {
        "title": "A misty room",
        "coordinates": "(61,74)",
        "exits": {
            "s": 291
        }
    },
    "411": {
        "title": "A misty room",
        "coordinates": "(59,69)",
        "exits": {
            "w": 268
        }
    },
    "412": {
        "title": "A Dark Cave",
        "coordinates": "(52,66)",
        "exits": {
            "s": 488,
            "e": 310
        }
    },
    "413": {
        "title": "A misty room",
        "coordinates": "(62,48)",
        "exits": {
            "n": 321
        }
    },
    "414": {
        "title": "A misty room",
        "coordinates": "(71,59)",
        "exits": {
            "w": 386
        }
    },
    "415": {
        "title": "A Dark Cave",
        "coordinates": "(52,70)",
        "exits": {
            "e": 406,
            "w": 418
        }
    },
    "416": {
        "title": "A misty room",
        "coordinates": "(70,62)",
        "exits": {
            "s": 270
        }
    },
    "417": {
        "title": "A misty room",
        "coordinates": "(58,47)",
        "exits": {
            "n": 387
        }
    },
    "418": {
        "title": "A Dark Cave",
        "coordinates": "(51,70)",
        "exits": {
            "n": 425,
            "s": 474,
            "e": 415
        }
    },
    "419": {
        "title": "A misty room",
        "coordinates": "(51,56)",
        "exits": {
            "e": 276
        }
    },
    "420": {
        "title": "A misty room",
        "coordinates": "(52,55)",
        "exits": {
            "s": 444,
            "e": 213,
            "w": 437
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
    "422": {
        "title": "A Dark Cave",
        "coordinates": "(55,71)",
        "exits": {
            "n": 426,
            "s": 302
        }
    },
    "423": {
        "title": "A Dark Cave",
        "coordinates": "(53,71)",
        "exits": {
            "e": 408,
            "w": 454
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
    "425": {
        "title": "A Dark Cave",
        "coordinates": "(51,71)",
        "exits": {
            "s": 418,
            "w": 469
        }
    },
    "426": {
        "title": "A Dark Cave",
        "coordinates": "(55,72)",
        "exits": {
            "n": 457,
            "s": 422
        }
    },
    "427": {
        "title": "A misty room",
        "coordinates": "(71,57)",
        "exits": {
            "e": 430,
            "w": 327
        }
    },
    "428": {
        "title": "A misty room",
        "coordinates": "(53,50)",
        "exits": {
            "e": 391
        }
    },
    "429": {
        "title": "A misty room",
        "coordinates": "(52,64)",
        "exits": {
            "s": 364
        }
    },
    "430": {
        "title": "A misty room",
        "coordinates": "(72,57)",
        "exits": {
            "n": 443,
            "e": 439,
            "w": 427
        }
    },
    "431": {
        "title": "A misty room",
        "coordinates": "(57,48)",
        "exits": {
            "e": 387,
            "w": 492
        }
    },
    "432": {
        "title": "A misty room",
        "coordinates": "(61,47)",
        "exits": {
            "n": 342
        }
    },
    "433": {
        "title": "A misty room",
        "coordinates": "(71,53)",
        "exits": {
            "s": 455,
            "e": 460,
            "w": 323
        }
    },
    "434": {
        "title": "A misty room",
        "coordinates": "(65,48)",
        "exits": {
            "n": 370
        }
    },
    "435": {
        "title": "A misty room",
        "coordinates": "(71,54)",
        "exits": {
            "w": 322
        }
    },
    "436": {
        "title": "A misty room",
        "coordinates": "(57,73)",
        "exits": {
            "s": 350
        }
    },
    "437": {
        "title": "A misty room",
        "coordinates": "(51,55)",
        "exits": {
            "e": 420,
            "w": 497
        }
    },
    "438": {
        "title": "A misty room",
        "coordinates": "(71,56)",
        "exits": {
            "e": 465,
            "w": 398
        }
    },
    "439": {
        "title": "A misty room",
        "coordinates": "(73,57)",
        "exits": {
            "w": 430
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
    "441": {
        "title": "A misty room",
        "coordinates": "(56,72)",
        "exits": {
            "s": 372
        }
    },
    "442": {
        "title": "A misty room",
        "coordinates": "(60,72)",
        "exits": {
            "n": 347
        }
    },
    "443": {
        "title": "A misty room",
        "coordinates": "(72,58)",
        "exits": {
            "s": 430,
            "e": 471
        }
    },
    "444": {
        "title": "A misty room",
        "coordinates": "(52,54)",
        "exits": {
            "n": 420,
            "w": 490
        }
    },
    "445": {
        "title": "A Dark Cave",
        "coordinates": "(52,68)",
        "exits": {
            "n": 447,
            "e": 339,
            "w": 450
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
    "447": {
        "title": "A Dark Cave",
        "coordinates": "(52,69)",
        "exits": {
            "s": 445
        }
    },
    "448": {
        "title": "A misty room",
        "coordinates": "(51,63)",
        "exits": {
            "e": 364
        }
    },
    "449": {
        "title": "A misty room",
        "coordinates": "(56,49)",
        "exits": {
            "n": 341
        }
    },
    "450": {
        "title": "A Dark Cave",
        "coordinates": "(51,68)",
        "exits": {
            "e": 445
        }
    },
    "451": {
        "title": "A misty room",
        "coordinates": "(52,61)",
        "exits": {
            "e": 402,
            "w": 453
        }
    },
    "452": {
        "title": "A misty room",
        "coordinates": "(60,74)",
        "exits": {
            "s": 347
        }
    },
    "453": {
        "title": "A misty room",
        "coordinates": "(51,61)",
        "exits": {
            "s": 464,
            "e": 451
        }
    },
    "454": {
        "title": "A Dark Cave",
        "coordinates": "(52,71)",
        "exits": {
            "n": 470,
            "e": 423
        }
    },
    "455": {
        "title": "A misty room",
        "coordinates": "(71,52)",
        "exits": {
            "n": 433
        }
    },
    "456": {
        "title": "A misty room",
        "coordinates": "(52,67)",
        "exits": {
            "e": 275,
            "w": 499
        }
    },
    "457": {
        "title": "A Dark Cave",
        "coordinates": "(55,73)",
        "exits": {
            "n": 461,
            "s": 426
        }
    },
    "458": {
        "title": "A Dark Cave",
        "coordinates": "(54,72)",
        "exits": {
            "s": 408,
            "w": 459
        }
    },
    "459": {
        "title": "A Dark Cave",
        "coordinates": "(53,72)",
        "exits": {
            "e": 458
        }
    },
    "460": {
        "title": "A misty room",
        "coordinates": "(72,53)",
        "exits": {
            "w": 433
        }
    },
    "461": {
        "title": "Linh's Shrine",
        "coordinates": "(55,74)",
        "exits": {
            "s": 457
        }
    },
    "462": {
        "title": "A misty room",
        "coordinates": "(67,70)",
        "exits": {
            "w": 392
        }
    },
    "463": {
        "title": "A misty room",
        "coordinates": "(67,49)",
        "exits": {
            "s": 468,
            "e": 362
        }
    },
    "464": {
        "title": "A misty room",
        "coordinates": "(51,60)",
        "exits": {
            "n": 453
        }
    },
    "465": {
        "title": "A misty room",
        "coordinates": "(72,56)",
        "exits": {
            "e": 498,
            "w": 438
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
    "467": {
        "title": "Pirate Ry's",
        "coordinates": "(68,47)",
        "exits": {
            "n": 399
        }
    },
    "468": {
        "title": "A misty room",
        "coordinates": "(67,48)",
        "exits": {
            "n": 463
        }
    },
    "469": {
        "title": "A Dark Cave",
        "coordinates": "(50,71)",
        "exits": {
            "e": 425
        }
    },
    "470": {
        "title": "A Dark Cave",
        "coordinates": "(52,72)",
        "exits": {
            "s": 454
        }
    },
    "471": {
        "title": "A misty room",
        "coordinates": "(73,58)",
        "exits": {
            "w": 443
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
    "474": {
        "title": "A Dark Cave",
        "coordinates": "(51,69)",
        "exits": {
            "n": 418
        }
    },
    "475": {
        "title": "A misty room",
        "coordinates": "(64,48)",
        "exits": {
            "n": 371,
            "s": 484
        }
    },
    "476": {
        "title": "A misty room",
        "coordinates": "(72,61)",
        "exits": {
            "e": 440
        }
    },
    "477": {
        "title": "A misty room",
        "coordinates": "(72,55)",
        "exits": {
            "e": 483,
            "w": 388
        }
    },
    "478": {
        "title": "A misty room",
        "coordinates": "(51,53)",
        "exits": {
            "e": 351
        }
    },
    "479": {
        "title": "A misty room",
        "coordinates": "(68,63)",
        "exits": {
            "w": 205
        }
    },
    "480": {
        "title": "A misty room",
        "coordinates": "(63,47)",
        "exits": {
            "n": 373
        }
    },
    "481": {
        "title": "A misty room",
        "coordinates": "(58,73)",
        "exits": {
            "s": 404
        }
    },
    "482": {
        "title": "A misty room",
        "coordinates": "(55,48)",
        "exits": {
            "n": 393
        }
    },
    "483": {
        "title": "A misty room",
        "coordinates": "(73,55)",
        "exits": {
            "w": 477
        }
    },
    "484": {
        "title": "A misty room",
        "coordinates": "(64,47)",
        "exits": {
            "n": 475
        }
    },
    "485": {
        "title": "A misty room",
        "coordinates": "(69,50)",
        "exits": {
            "w": 352
        }
    },
    "486": {
        "title": "A misty room",
        "coordinates": "(69,67)",
        "exits": {
            "n": 466
        }
    },
    "487": {
        "title": "A misty room",
        "coordinates": "(59,47)",
        "exits": {
            "n": 318,
            "s": 489
        }
    },
    "488": {
        "title": "A Dark Cave",
        "coordinates": "(52,65)",
        "exits": {
            "n": 412
        }
    },
    "489": {
        "title": "A misty room",
        "coordinates": "(59,46)",
        "exits": {
            "n": 487
        }
    },
    "490": {
        "title": "A misty room",
        "coordinates": "(51,54)",
        "exits": {
            "e": 444,
            "w": 493
        }
    },
    "491": {
        "title": "A misty room",
        "coordinates": "(52,52)",
        "exits": {
            "n": 351
        }
    },
    "492": {
        "title": "A misty room",
        "coordinates": "(56,48)",
        "exits": {
            "e": 431
        }
    },
    "493": {
        "title": "A misty room",
        "coordinates": "(50,54)",
        "exits": {
            "e": 490
        }
    },
    "494": {
        "title": "A misty room",
        "coordinates": "(67,71)",
        "exits": {
            "w": 473
        }
    },
    "495": {
        "title": "The Transmogriphier",
        "coordinates": "(50,58)",
        "exits": {
            "e": 383
        }
    },
    "496": {
        "title": "A misty room",
        "coordinates": "(66,48)",
        "exits": {
            "n": 407
        }
    },
    "497": {
        "title": "A misty room",
        "coordinates": "(50,55)",
        "exits": {
            "e": 437
        }
    },
    "498": {
        "title": "A misty room",
        "coordinates": "(73,56)",
        "exits": {
            "w": 465
        }
    },
    "499": {
        "title": "Glasowyn's Grave",
        "coordinates": "(51,67)",
        "exits": {
            "e": 456
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