export const BASEURL = "http://localhost:5000/";

import React from 'react'

export function callApi(reqMethod,url,data,responseHandler) {
  let options;
  if(reqMethod === 'GET' || reqMethod === 'DELETE'){
    options = {method:reqMethod , headers:{"Content-Type":"application/json"}};
  }
  else{
    options = {method:reqMethod , headers:{"Content-Type":"application/json"}, body:data};
  }
  fetch(url,options)
  .then(res => {
    if(!res.ok) throw new Error(res.status + " :" + res.statusText);
    return res.text();
  })
  .then((res) => responseHandler(res))
  .catch((err) => alert(err));
}
//Save Data in Cookie
export function setSession(sesName, sesValue, expInDays){
    let D = new Date();
    D.setTime(D.getTime() + expInDays * 86400000);
    document.cookie = `${sesName}=${sesValue};expires=${D.toUTCString()};path=/;secure`;
}

//Read Data from Cookie
export function getSession(sesName){
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieData = decodedCookie.split(";");
    for( let x in cookieData)
        if(cookieData[x].includes(sesName))
            return cookieData[x].substring(cookieData[x].indexOf(sesName) + sesName.length + 1);
    return "";
}