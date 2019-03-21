'use strict'

const font = new FontFaceObserver('MTG');
const html = document.documentElement;
const selects = document.querySelectorAll("select");
const buttons = document.querySelectorAll("button");

font.load().then(function () {
    html.className += " fonts-loaded";
});

font.load().then(function(){
    selects.forEach(select =>{
        select.className += " fonts-loaded";
    })
})

font.load().then(function(){
    buttons.forEach(button =>{
        button.className += " fonts-loaded";
    })
})
