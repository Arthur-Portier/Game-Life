import {load } from "../js/storage.js"
import { renderPlayer } from "./render.js";

const state = load();

renderPlayer(state);