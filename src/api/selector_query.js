import axios from "axios";

export default axios.create({
    baseURL: 'https://script.google.com/macros/s/AKfycbxYFq51WSg6Xu5fawxyL2VnpM-idVzxCnK5PTIql9qnSqxPvinJuGqP-nB8lbCrj0gkUw/exec',
    headers: {
        'Content-Type': 'text/plain'
    }
})