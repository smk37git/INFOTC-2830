// GAME DATA
let gameRunning = true;

window.onload = async () => {
    gameData = await fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data);
        console.log("debugs");
        return data
    })
    .catch(error => {
        console.error('Failed to fetch data:', error);
    });


    let gameText = document.getElementsByClassName("game-text")[0];
    gameText.innerHTML = gameData.locations[0].name;

    document.getElementById("option-four").onclick = () => {
        gameText.innerHTML = gameData.locations[2].name;
    }
}


// DATA JSON
