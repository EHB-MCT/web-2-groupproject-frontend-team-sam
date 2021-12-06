'Use strict';

let challengesDataList;
let challengesListHTML = "";

window.onload = function () {

    fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            challengesDataList = data
            console.log("Fetch!", data)
        })


    document.getElementById('insertForm').addEventListener('submit', e => {
        e.preventDefault('submit');
        let challengeId = "61ab91eey70548ec7660b44c";
        let challengeName = document.getElementById('insertName').value;
        let challengePoints = document.getElementById('insertPoints').value;
        let challengeCourse = document.getElementById('insertCourse').value;
        let challengeSession = document.getElementById('insertSession').value;

        console.log(challengeName, challengePoints, challengeCourse, challengeSession)

        fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges/send`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: challengeId,
                    name: challengeName,
                    points: challengePoints,
                    course: challengeCourse,
                    session: challengeSession
                }),

            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('Success:', data);
            })
    })


    document.getElementById('deleteButton').addEventListener('click', e => {
        e.preventDefault('submit');
        let challengeId = e._id;
        console.log(challengeId, "test")

        fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges/deletechallenges/${challengeId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log('Challenge succesfully removed:', data);
            })
    })

    setTimeout(displayChallenges, 3000)

    function displayChallenges() {
        console.log('Loaded!');

        challengesDataList.forEach(e => {
            challengesListHTML += `<article id="${e._id}" class="listArticle">
            <h3>${e.name}</h3>
            <button id="${e._id}" >Delete</button>
            <button>Edit</button>
        </article>`
        })
        document.getElementById("challengesList").innerHTML = challengesListHTML;
    }
}