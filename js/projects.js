import {load, save} from "./storage.js";
import {  daysLeft, parseSteps, projectProgress, todayString } from "../js/rules.js";
import { renderPlayer } from "./render.js";

const state = load();

const dialog = document.getElementById("project-dialog");
document.getElementById("new-project")
.addEventListener("click", () => dialog.showModal());
document.getElementById("cancel-project-creation")
.addEventListener("click", () => dialog.close());

const form_project = document.getElementById("project-form");
form_project.addEventListener("submit", () => {
    const data = new FormData(form_project);
    const project = {
        title : data.get("title"),
        steps : parseSteps(data.get("steps")),
        due : data.get("due"),
    };
    state.projects.push(project);
    save(state);
    form_project.reset();
    render();
})

function renderProjects(){
    const local_date = new Date();
    const projects_list = document.getElementById("projects-steps");
    projects_list.replaceChildren();
    for (const project of state.projects){
        const li_project_title = document.createElement("li");
        const li_project_steps = document.createElement("li");
        const ul_steps = document.createElement("ul");
        li_project_title.textContent = 
        `${project.title} --- ${projectProgress(project).done}/${projectProgress(project).total} --- 
        J-${daysLeft(project.due, todayString(local_date))}`;
        projects_list.appendChild(li_project_title);
        projects_list.appendChild(li_project_steps);
        li_project_steps.appendChild(ul_steps);
        for (const step of project.steps){
            const li_steps = document.createElement("li");
            const checkbox_list = document.createElement("input");
            const label_checkbox = document.createElement("label");
            checkbox_list.type = "checkbox";
            checkbox_list.checked = step.done;
            checkbox_list.addEventListener("change", () => {
                step.done = !step.done;
                save(state);
                render();
            });
            label_checkbox.append(checkbox_list, step.text);
            li_steps.appendChild(label_checkbox);
            ul_steps.appendChild(li_steps);
        }
    }
}

function render(){
    renderProjects();
    renderPlayer(state);
}

render();