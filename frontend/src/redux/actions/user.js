 import * as TYPES from "../types/user";
import axios from "axios";

export const add_user = (name) => ({
  type: TYPES.ADD_USER,
  payload: name,
});

export const delete_user = () => ({
  type: TYPES.DELETE_USER,
  payload: null,
});

