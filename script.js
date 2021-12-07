"Use strict";

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
        let challengeName = document.getElementById('insertName').value;
        let challengePoints = document.getElementById('insertPoints').value;
        let challengeCourse = document.getElementById('insertCourse').value;
        let challengeSession = document.getElementById('insertSession').value;

        const ch = {
            name: challengeName,
            points: challengePoints,
            course: challengeCourse,
            session: challengeSession
        }
        console.log(ch)
        fetch("https://web2-fullstack-teamwork.herokuapp.com/challenges/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ch)
            }).then(res => {
                res.json()
            })
            .then(data => {
                console.log(data);
            });
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


    document.getElementById('editForm').addEventListener('submit', e =>{
        e.preventDefault('submit');
        let challengeName = document.getElementById('cName').value;
        let challengePoints = document.getElementById('cPoints').value;
        let challengeCourse = document.getElementById('cCourse').value;
        let challengeSession = document.getElementById('cSession').value;

        const chUpdate = {
            name: challengeName,
            points: challengePoints,
            course: challengeCourse,
            session: challengeSession
        }
        console.log(chUpdate)
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