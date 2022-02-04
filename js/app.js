'use strict';
const tbody = document.getElementById("tbody");



async function getData() {
    const url = `https://api.pray.zone/v2/times/today.json?city=amman`
    const response = await fetch(url);
    const allData = await response.json();
    // const todayDate = allData.results.datetime[0].date.gregorian
    const prayerTimeObject = allData.results.datetime[0].times;
    return prayerTimeObject
}
function formatTime(time) {
    const timeArr = time.split(":");
    let timeFormat;
    timeArr[0] < 12 ? timeFormat = `${time} AM` :
        Number(timeArr[0]) - 12 < 9 ? timeFormat = `0${Number(timeArr[0]) - 12}:${timeArr[1]} PM` :
            timeFormat = `${Number(timeArr[0]) - 12}:${timeArr[1]} PM`;
    return timeFormat;
}
async function renderTable() {
    const data = await getData();
    console.log(data);
    for (const key in data) {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        const td = document.createElement('td');
        const par = document.createElement('th');
        td.textContent = key;
        const image = document.createElement("img");
        tr.appendChild(td);
        tr.appendChild(par);

        par.appendChild(image);

        image.src = `../images/${key}.png`;
        image.style.width = "25px";
        image.style.height = "25px";

        const td2 = document.createElement('td');
        tr.appendChild(td2);
        td2.textContent = formatTime(data[key]);
        console.log(tbody);
    }
}

renderTable();
