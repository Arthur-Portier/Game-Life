import { kgToGo } from "../js/rules.js";

import { load, save } from "../js/storage.js";

const state = load();

const dialog = document.getElementById("project-dialog");
document.getElementById("new-project").addEventListener("click", () => dialog.showModal());
document.getElementById("cancel-project-creation").addEventListener("click", () => dialog.close());
document.getElementById("confirm-project-creation").addEventListener("click", () => dialog.close());

const form = document.getElementById("project-form");
form.addEventListener("submit", () => {
    const data = new FormData(form);
    const project = {
        title : data.get("title"),
        description : data.get("des"),
        due : data.get("due"),
    };
    state.projects.push(project);
    save(state);
    form.reset();
    render();
})

function renderProjects(){
    const list = document.getElementById("projects-list");
    list.replaceChildren();
    for (const project of state.projects){
        const li = document.createElement("li");
        li.textContent = project.title;
        list.appendChild(li);
    }
}

function render(){
    renderProjects();
}

render();