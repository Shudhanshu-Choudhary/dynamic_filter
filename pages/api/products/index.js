import axios from "axios";

export default function handler(req,res) {
    axios.get("../../data.json")
}