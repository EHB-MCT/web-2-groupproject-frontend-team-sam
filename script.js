'Use strict';

let challengesDataList;
let challengesListHTML = "";

fetchChallenges();

function fetchChallenges (){
    console.log("Fetch!")

    fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log("dataList:", data)
            challengesDataList = data
        })
}

window.onload = function () {

    setTimeout(displayChallenges, 3000)

    function displayChallenges() {
        console.log('Loaded!');

        challengesDataList.forEach(e => {
            challengesListHTML += `<article id="${e._id}" class="listArticle">
            <h3>${e.name}</h3>
            <button>Delete</button>
            <button>Edit</button>
        </article>`
        })

        console.log(challengesListHTML)
        document.getElementById("challengesList").innerHTML = challengesListHTML;
    }
}