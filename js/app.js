'use strict';
const tbody = document.getElementById("tbody");



async function getData() {
    const url = `https://api.pray.zone/v2/times/today.json?city=amman`
    const response = await fetch(url);
    const allData = await response.json();
    const todayDate = allData.results.datetime[0].date.gregorian
    const prayerTimeObject = allData.results.datetime[0].times;
    return todayDate, prayerTimeObject
}

function formatTime(time){
 const timeArr = time.split(":");
 console.log( `${Number(timeArr[0]) - 12} PM`);
 let timeFormat;
 timeArr[0] < 12 ? timeFormat = `${time} AM` : timeFormat = `${Number(timeArr[0]) - 12}:${timeArr[1]}  PM`;
 return timeFormat;
}
async function renderTable() {
    const data = await getData();
    console.log(data);
    for (const key in data) {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        const td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = key;
        const td2 = document.createElement('td');
        tr.appendChild(td2);
        // console.log(formatTime(data[key]));
        td2.textContent = formatTime(data[key]);
        // console.log(key, data[key]);
    }

}

renderTable()

// async function fetchData() {
//     const res=await fetch ("https://api.coronavirus.data.gov.uk/v1/data");
//     const record=await res.json();
//     document.getElementById("date").innerHTML=record.data[0].date;
//     document.getElementById("areaName").innerHTML=record.data[0].areaName;
//     document.getElementById("latestBy").innerHTML=record.data[0].latestBy;
//     document.getElementById("deathNew").innerHTML=record.data[0].deathNew;
// }
// fetchData();
