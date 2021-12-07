"Use strict";

let challengesDataList;
let challengesListHTML = "";

window.onload = async function () {

    await first();

    async function first() {
        await fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                challengesDataList = data;
                console.log("Fetch!", data);
                console.log(challengesDataList.length);
            })

        console.log('Loaded!');

        for (let e = 0; e < challengesDataList.length; e++) {
            challengesListHTML += `<article id="${challengesDataList[e]._id}" class="listArticle">
            <div class="dataDelete">
            <h3>${challengesDataList[e].name} id = ${challengesDataList[e]._id}</h3>
            <button id="${challengesDataList[e]._id}" class="dataDelete" >Delete</button>
            <button>Edit</button>
            </div>
        </article>`
        }
        document.getElementById("challengesList").innerHTML = challengesListHTML;
    }


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
                if (data == undefined) {
                    location.reload();
                }
            });
    });

    document.getElementById('editForm').addEventListener('submit', e => {
        e.preventDefault('submit');
        let challengeId = document.getElementById("cId").value;
        let challengeName = document.getElementById('cName').value;
        let challengePoints = document.getElementById('cPoints').value;
        let challengeCourse = document.getElementById('cCourse').value;
        let challengeSession = document.getElementById('cSession').value;

        const chUpdate = {
            "_id": challengeId,
            "name": challengeName,
            "points": challengePoints,
            "course": challengeCourse,
            "session": challengeSession
        }
        fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges/${challengeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(chUpdate)
            }).then(res => {
                res.json()
            })
            .then(data => {
                console.log(data);
                if (data == undefined) {
                    location.reload();
                }
            });
    })

    second();

    function second() {
        let deleteData = document.getElementsByClassName("dataDelete");
        for (let i = 0; i < deleteData.length; i++) {
            deleteData[i].addEventListener("click", e => {
                e.preventDefault();
                let challengeId = e.path[0].id;
                console.log(challengeId);

                fetch(`https://web2-fullstack-teamwork.herokuapp.com/challenges/${challengeId}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        console.log('Challenge succesfully removed:', data);
                        if (data) {
                            location.reload();
                        }
                    })
            })
        }
    }
}