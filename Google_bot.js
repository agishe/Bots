// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description
// @author       Kadyrova Maria
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/
// @match        https://motoreforma.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
"napli.ru": ["10 самых популярных шрифтов от Google", "VS Code", "как использовать DevTools браузера", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"],
"kiteuniverse.ru": ["Шоу воздушных змеев", "Kite Universe", "Красота. Грация. Интеллект"],
"motoreforma.com": ["мотореформа", "прошивки для CAN-AM", "тюнинг для квадроциклов Maverick X3"]
}
let searchIndex = Object.keys(sites);
let site = searchIndex[getRandom(0, searchIndex.length)];
let keywords = sites[site];

let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];

if (btnK != undefined) {
  document.cookie = `site=${site}`
} else if (location.hostname == "www.google.com"){
  site = getCookie("site");
} else {
  site = location.hostname;
}


if (btnK != undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    googleInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnK.click();
    }
  }, 500);
} else if (location.hostname == site) {
  console.log("Мы на целевом сайте");
  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.google.com/";
    }

    if (links.length == 0) {
      location.href == site;
    }

    if (links[index].href.indexOf(site) != -1) {
      links[index].click();
    }
  }, getRandom(2000, 5000));
} else {
  let nextGooglePage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) != -1) {
      let link = links[i];
      nextGooglePage = false;
      console.log("Нашел строку " + link);
      setTimeout(() => link.click(), getRandom(2500, 4000));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let element = document.querySelector(".YyVfkd");
    if (element != null) {
      if (element.innerText == "5") {
        nextGooglePage = false;
        location.href = "https://www.google.com/";
      }
      clearInterval(elementExist);
    }
  }, 100);
  if (nextGooglePage) {
    setTimeout(() => pnnext.click(), getRandom(2000, 4000));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
