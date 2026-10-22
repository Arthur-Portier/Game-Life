import {load } from "./storage.js"
import { renderPlayer } from "./render.js";

const state = load();

renderPlayer(state);