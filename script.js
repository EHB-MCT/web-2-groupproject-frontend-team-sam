'Use strict';

let challengesDataList;
let challengesListHTML = "";

fetchChallenges();

function fetchChallenges() {
    console.log("Fetch!")

    fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            challengesDataList = data
        })
}

window.onload = function () {

    document.getElementById('insertForm').addEventListener('submit', e => {
        e.preventDefault('submit');
        let challengeName = document.getElementById('insertName').value;
        let challengePoints = document.getElementById('insertPoints').value;
        let challengeCourse = document.getElementById('insertCourse').value;
        let challengeSession = document.getElementById('insertSession').value;

        console.log(challengeName, challengePoints, challengeCourse, challengeSession)

        fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges/send`, {
                method: "POST",
                body: {
                    "_id": "61ab91eey70548ec7660b44c",
                    "name": challengeName,
                    "points": challengePoints,
                    "course": challengeCourse,
                    "session": challengeSession
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('Success:', data);
            })
    })

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