const { default: Moralis } = require("moralis/types");

/** Connect to Moralis server */
const serverUrl = "https://xxxxx.yourserver.com:2053/server";
const appId = "YOUR_APP_ID";
const CONTRACT_ADDRESS = ""; // either from local testnet or eth 
//Moralis.start({ serverUrl, appId });

async function init() {
    try {
        let user = Moralis.User.current();
        if (!user) {
            $("#login_button").click(async () => {
                user = await Moralis.Web3.authenticate();
            })
        }
        renderGame();
    } catch (error) {
        console.log(error);
    }
}

async function renderGame() {
    $("#login_button").hide();
    $("#planet_row").html(""); // Empty the list of nfts in the frontend before re-rendering (this is to prevent duplicating front-end components upon frontend-action)

    // Render properties from the smart contract
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    let contract = new Web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let array = await contract.methods.getAllTokensForUser(ethereum.selectedAddress).call({from: ethereum.selectedAddress}); // Determine what nfts from this collection/contract the logged-in user holds
    console.log(array);
    if (array.length == 0) return; // the end user owns 0 nfts in this collection
    array.forEach (planetId => {
        let details = await contract.methods.getTokenDetails(planetId).call({from: ethereum.selectedAddress});
        renderPlanet(planetId, details);
    });
    $("#game").show();
}

function renderPlanet(id, data) {
    // Calculate planet starvation time
    let now = new Date();
    let maxTime = data.endurance;
    let currentUnix = Math.floor(now.getTime() / 1000); // time in seconds rounded to nearest second (current unix time)
    let secondsLeft = (parseInt(data.lastMeal) + parseInt(data.endurance)) - currentUnix;
    let percentageLeft = secondsLeft / maxTime;
    let percentageString = (percentageLeft * 100) + '%'; 
    let deathTime = new Date((parseInt(data.lastMeal) + parseInt(data.endurance)) * 1000);

    let interval = setInterval(() => {
        let now = new Date();
        let maxTime = data.endurance;
        let currentUnix = Math.floor(now.getTime() / 1000); // time in seconds rounded to nearest second (current unix time)
        let secondsLeft = (parseInt(data.lastMeal) + parseInt(data.endurance)) - currentUnix;
        let percentageLeft = secondsLeft / maxTime;
        let percentageString = (percentageLeft * 100) + '%';
        $(`#planet_${id}.progress-bar`).css("width", percentageString);

        if (percentageLeft < 0) {
            clearInterval(interval);
        }
    }, 50000)

    let htmlString = `<div class="col-md-4 card mx-1" id="pet_${id}">
        <img class="card-img-top" src="" class="pet_img">
            <div class="card-body">
                <div>Id: <span class="planet_id">${id}</span></div>
                <div>Damage: <span class="planet_damage">${data.damage}</span></div>
                <div>Magic: <span class="planet_magic">${data.magic}</span></div>
                <div>Endurance: <span class="planet_endurance">${data.endurance}</span></div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${percentageString}%;">

                    </div>
                </div>
                <button data-pet-id="${id}" class="feed_button btn btn-primary btn-block">Feed</button>
            </div>
        </div>`;

    let element = $.parseHTML(htmlString)
    $("#planet_row").append(element);

    // Feed button listener action
    $(`#planet_${id} .feed_button`).click(() => { // now this function is linked to the button component
        feed(id); // clicking on the button executes the feed smart contract action
    });
}

function getAbi() {
    return new Promise((res) => {
        $.getJSON("Token.json", ((json) => {
            res(json.abi);
        }))
    })
}

async function feed(planetId) {
    let abi = await getAbi();
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    contract.methods.feed(planetId).send({from: ethereum.selectedAddress}).on("receipt", (() => {
        console.log("fed planet");
        renderGame();
    }));
}

init();

/*
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}*/

//document.getElementById("btn-login").onclick = login;
//document.getElementById("btn-logout").onclick = logOut;