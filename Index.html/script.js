const DOM = {
    mission: null,
    time: null,
};

let missionlist = JSON.parse(localStorage.getItem("noteList")) || [];

function init() {
    DOM.mission = document.querySelector(`#textMission`)
    DOM.time = document.querySelector(`#time`)

    document.querySelector(`#form`).addEventListener(`submit`, saveMission)
    drawNotes(missionlist)
}

init()

function clearNote(noteIndex) {
    const filterList = missionlist.filter((mission, index) => {
        return noteIndex != index
    })
    drawNotes(filterList);
    setLocalStorage(filterList)
}

function saveMission(event) {
    event.preventDefault()
    const mission = new Mission(DOM.mission.value, DOM.time.value);
    const newList = missionlist.concat(mission);
    drawNotes(newList)
    resetFormData()
    setLocalStorage(newList)
}

function setLocalStorage(list) {
    localStorage.setItem(`noteList`, JSON.stringify(list))
}


function drawNotes(list) {
    document.querySelector(`#noteContainer`).innerHTML = null
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        const [date, time] = element.date.split("T")
        const note =
            `<div class="noteItem">
                <div class="removeNoteButton">
                <button 
                onClick="clearNote(${index})" id="removeSingalNote" type="button" 
                class="btn btn-outline-dark btn-sm glyphicon glyphicon-remove" 
                <span></span></button>
                </div>
            <div
             class="noteText">${element.mission}</div>
            <div>
            ${date}
            </div>
            <div>
            ${time}
            </div>
        </div>`
        document.querySelector(`#noteContainer`).innerHTML += note

    }
    missionlist = list;
}



function resetFormData() {
    document.querySelector("#textMission").value = ""
    document.querySelector("#time").value = ""
}


