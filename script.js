async function Heroku(){
    let url = `https://web2-fullstack-teamwork.herokuapp.com/`;
    let resp = await fetch(url);
    return await resp.json()
}

window.onload = function(){
    console.log('Loaded!');

    async function run(){
        let data = await Heroku()
        console.log(data)
    }

    run();
}