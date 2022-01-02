const delBtn = document.getElementById("del-btn");
const saveBtn = document.getElementById("save-btn");
const newBtn = document.getElementById("new-btn");
const titleElm = document.getElementById("title");
const noteElm = document.getElementById("note");
const notesList = document.getElementById("all-notes-table")

let actualTitle = ""

window.onload = () => {
    refreshNotesList();
};

function selectItem(title) {
    title = title.replace(/%%/g, " ");
    titleElm.value = title;
    noteElm.value = localStorage.getItem(title);
    actualTitle = title;
    refreshNotesList();
}

delBtn.addEventListener("click", () => {
    localStorage.removeItem(actualTitle);
    titleElm.value = "";
    noteElm.value = "";
    refreshNotesList();
});

saveBtn.addEventListener("click", () => {
    if (noteElm.value == "") return;
    _title = titleElm.value;
    if (_title != actualTitle && localStorage.hasOwnProperty(_title)) {
        counter = 0;
        do {
            counter += 1
            _title = titleElm.value + "(" + counter + ")";
        } while (_title != actualTitle && localStorage.hasOwnProperty(_title));
    }
    localStorage.removeItem(actualTitle);
    localStorage.setItem(_title, noteElm.value);
    titleElm.value = _title;
    actualTitle = _title;
    refreshNotesList();
})

newBtn.addEventListener("click", () => {
    titleElm.value = "";
    noteElm.value = "";
    actualTitle = "";
})

function refreshNotesList() {
    let notesListNew = "";
    Object.keys(localStorage).forEach(_key => {
        notesListNew += "<tr><td onclick=selectItem(\"" + _key.replace(/\s/g, "%%") + "\")>" + _key + "<td/><tr/>";
    });
    notesList.innerHTML = notesListNew;
}