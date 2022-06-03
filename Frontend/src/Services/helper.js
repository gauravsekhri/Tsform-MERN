import React from 'react';
import axios from 'axios';

var baseurl = "https://tstool-backend.herokuapp.com";

export function NewSubmit(data) {
    return new Promise((res,rej) => {
        try {
            axios.post(baseurl+"/formData/new", data)
            .then(response => {
                res(response.data);
            });
        } 
        catch (err) {
            console.log(err)
        }
    })
}

export function GetAllEntries() {
    return new Promise((res,rej) => {
        try {
            axios.get(baseurl+"/formData")
            .then(response => {
                res(response.data);
            });
        } 
        catch (err) {
            console.log(err)
        }
    })
}