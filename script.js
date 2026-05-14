const solarText =
document.getElementById("solar");

const windText =
document.getElementById("wind");

const batteryText =
document.getElementById("battery");

const demandText =
document.getElementById("demand");

const weatherText =
document.getElementById("weather");

const aiMessage =
document.getElementById("aiMessage");

const alerts =
document.getElementById("alerts");

const moneyText =
document.getElementById("money");

const populationText =
document.getElementById("population");

const stabilityText =
document.getElementById("stability");



const solarBtn =
document.getElementById("solarBtn");

const batteryBtn =
document.getElementById("batteryBtn");

const emergencyBtn =
document.getElementById("emergencyBtn");



/* ========================= */
/* GAME VARIABLES */
/* ========================= */

let money = 5000;

let population = 120;

let solar = 120;

let wind = 80;

let battery = 85;

let demand = 180;

let stability = 95;

let solarLevel = 1;

let batteryLevel = 1;

let weather = "Sunny";



/* ========================= */
/* WEATHER SYSTEM */
/* ========================= */

const weatherStates = [

    "Sunny",
    "Cloudy",
    "Storm",
    "Windy"

];



function updateWeather(){

    weather =
    weatherStates[
        Math.floor(
            Math.random()
            *
            weatherStates.length
        )
    ];

    weatherText.innerText =
    weather;



    if(weather === "Sunny"){

        solar =
        random(180,300)
        *
        solarLevel;

        wind =
        random(40,90);
    }



    else if(weather === "Cloudy"){

        solar =
        random(100,180)
        *
        solarLevel;

        wind =
        random(60,120);
    }



    else if(weather === "Storm"){

        solar =
        random(40,90)
        *
        solarLevel;

        wind =
        random(150,260);

        stability -= 10;

        addAlert(
            "⚠ Severe storm affecting power grid."
        );
    }



    else if(weather === "Windy"){

        solar =
        random(80,150)
        *
        solarLevel;

        wind =
        random(180,300);
    }

}



/* ========================= */
/* CITY DEMAND */
/* ========================= */

function updateDemand(){

    demand =

    random(150,350)

    +

    Math.floor(population / 2);

}



/* ========================= */
/* BATTERY SYSTEM */
/* ========================= */

function batterySystem(){

    const generation =
    solar + wind;



    if(generation > demand){

        battery += 3;
    }

    else{

        battery -= 4;
    }



    if(battery > 100){

        battery = 100;
    }



    if(battery < 0){

        battery = 0;
    }

}



/* ========================= */
/* STABILITY SYSTEM */
/* ========================= */

function updateStability(){

    const generation =
    solar + wind;

    const diff =
    generation - demand;



    stability =
    80 + diff / 6;



    if(battery < 20){

        stability -= 20;
    }



    if(stability > 100){

        stability = 100;
    }



    if(stability < 0){

        stability = 0;
    }



    stabilityText.innerText =

    Math.floor(stability)
    + "%";



    if(stability > 75){

        aiMessage.innerText =

        "Grid stable. Renewable output healthy.";
    }



    else if(stability > 45){

        aiMessage.innerText =

        "⚠ Demand rising. Monitor battery levels.";
    }



    else{

        aiMessage.innerText =

        "🚨 BLACKOUT RISK DETECTED.";

        addAlert(
            "🚨 CRITICAL GRID FAILURE POSSIBLE."
        );

        blackoutMode();
    }

}



/* ========================= */
/* MONEY SYSTEM */
/* ========================= */

function updateEconomy(){

    if(stability > 70){

        money += 200;
    }

    else{

        money -= 150;
    }



    if(money < 0){

        money = 0;
    }

}



/* ========================= */
/* POPULATION GROWTH */
/* ========================= */

function updatePopulation(){

    if(stability > 75){

        population += 2;
    }

    else{

        population -= 1;
    }



    if(population < 50){

        population = 50;
    }

}



/* ========================= */
/* RANDOM EVENTS */
/* ========================= */

function randomEvents(){

    const eventChance =
    Math.random();



    if(eventChance < 0.15){

        demand += 80;

        addAlert(
            "🏭 Industrial overload increased demand."
        );
    }



    if(eventChance > 0.9){

        stability -= 15;

        addAlert(
            "⚡ Transformer malfunction detected."
        );
    }

}



/* ========================= */
/* BLACKOUT MODE */
/* ========================= */

function blackoutMode(){

    document.querySelectorAll(".building")

    .forEach(

        building =>{

            building.style.opacity =
            "0.4";
        }

    );

}



/* ========================= */
/* NORMAL MODE */
/* ========================= */

function restoreCity(){

    document.querySelectorAll(".building")

    .forEach(

        building =>{

            building.style.opacity =
            "1";
        }

    );

}



/* ========================= */
/* UI UPDATE */
/* ========================= */

function updateUI(){

    solarText.innerText =
    Math.floor(solar)
    + " MW";



    windText.innerText =
    Math.floor(wind)
    + " MW";



    batteryText.innerText =
    Math.floor(battery)
    + "%";



    demandText.innerText =
    Math.floor(demand)
    + " MW";



    moneyText.innerText =
    money;



    populationText.innerText =
    population + "K";



    weatherText.innerText =
    weather;

}



/* ========================= */
/* ALERTS */
/* ========================= */

function addAlert(message){

    alerts.innerHTML =

    `
    <div>

        ${message}

    </div>
    `;

}



/* ========================= */
/* BUTTONS */
/* ========================= */

solarBtn.addEventListener(

"click",

()=>{

    if(money >= 1000){

        solarLevel++;

        money -= 1000;

        addAlert(
            "☀ Solar farm upgraded."
        );
    }

    else{

        addAlert(
            "❌ Not enough credits."
        );
    }

}

);



batteryBtn.addEventListener(

"click",

()=>{

    if(money >= 1200){

        batteryLevel++;

        battery += 20;

        money -= 1200;

        addAlert(
            "🔋 Battery capacity upgraded."
        );
    }

    else{

        addAlert(
            "❌ Not enough credits."
        );
    }

}

);



emergencyBtn.addEventListener(

"click",

()=>{

    stability += 20;

    battery -= 15;

    money -= 500;



    if(stability > 100){

        stability = 100;
    }



    if(battery < 0){

        battery = 0;
    }



    addAlert(
        "🚨 Emergency grid boost activated."
    );

}

);



/* ========================= */
/* MAIN LOOP */
/* ========================= */

function gameLoop(){

    updateWeather();

    updateDemand();

    batterySystem();

    updateStability();

    updateEconomy();

    updatePopulation();

    randomEvents();

    updateUI();



    if(stability > 45){

        restoreCity();
    }

}



/* ========================= */
/* RANDOM HELPER */
/* ========================= */

function random(min,max){

    return Math.floor(

        Math.random()
        *
        (max - min + 1)

    ) + min;
}



/* ========================= */
/* START GAME */
/* ========================= */

gameLoop();



setInterval(

    gameLoop,

    3500

);