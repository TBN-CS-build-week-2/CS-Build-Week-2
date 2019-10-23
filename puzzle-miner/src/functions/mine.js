const axios = require('axios');
const shajs = require('sha.js');
axios
    .create({
        headers: {
            Authorization: 'Token 0b9a2224eb1c80ca4b8c71939fbff34092052c20',
            'Content-Type': 'application/json'
        }
    })
    // You Will need to use the initialize endpoint before you can start moving around
    // .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/status/", {
    //     'Authorization': 'Token 0b9a2224eb1c80ca4b8c71939fbff34092052c20',
    //     "Content-Type": "application/json"
    //.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', {
    //.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {
    //.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/', {
    //.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/', {
    // direction: 'n',
    // name: 'so-coiny', // 1,000 gold needed to change name --- 1 tiny treasure = 100 gold -- 1 small treasure = 200 gold
    // confirm: 'aye'
    .get('https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof')
    .then(res => {
        console.log(res.data);
        last_proof = JSON.stringify(res.data.proof);
        let difficulty = res.data.difficulty;
        let proof = 4206942069;
        while (!valid_proof(last_proof, proof, difficulty)) {
            proof = Math.floor(Math.random() * 1000000000);
        }
        setTimeout(() => {
            console.log('success', proof);
            axios
                .create({
                    headers: {
                        Authorization: 'Token 0b9a2224eb1c80ca4b8c71939fbff34092052c20',
                        'Content-Type': 'application/json'
                    }
                })
                .post('https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/', {
                    proof: proof
                })
                .then(res => {
                    console.log('mined', res.data);
                })
                .catch(err => {
                    console.log(err.response);
                    lastProof();
                });
        }, 1000);
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
function hash(string) {
    return shajs('sha256')
        .update(string)
        .digest('hex');
}
function valid_proof(lastProof_string, proof, difficulty) {
    const guess = hash(`${lastProof_string}${proof}`);
    // console.log("this is the proof and hash", proof, guess)
    var leadZeros = '';
    for (let i = 0; i < difficulty; i++) {
        leadZeros += 0;
    }
    // console.log("zeros ", leadZeros);
    return guess.startsWith(leadZeros);
    // difficulty 6, start with 000000
}
