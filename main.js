// ==UserScript==
// @name         coderchatzoom
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  try to take over the world!
// @author       @blankitolv
// @match        https://coderhouse.zoom.us/rec/play/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  /**
   * Author: Lucas Vega
   * repository proyect: www.github.com/blankitolv/coderhouse_chat_intime_zoom
   * my repository: www.github.com/blankitolv
   */

  // programa principal
  const mysoft = () => {
    sweetMessage();
    // bandera para saber si el script debe correr o no
    let running = true;
    let myBox = document.querySelector(".transcript .single-wrapper");
    let container = document.createElement("div");
    container.style.flex = "1";
    container.style.minHeight = "25";
    container.innerHTML = `
  <a href="#" id="lucas_pause">❎</a>
  <a href="#" id="lucas_play">✅</a>
  <b>status: <span id="status_lucas"></span></b>
  `;
    myBox.appendChild(container);

    // botones de play y pause
    document.getElementById("status_lucas").innerHTML = "running";
    let lucas_pause = document
      .getElementById("lucas_pause")
      .addEventListener("click", (e) => {
        e.preventDefault();
        running = false;
        document.getElementById("status_lucas").innerHTML = "pause";
      });
    let lucas_play = document
      .getElementById("lucas_play")
      .addEventListener("click", (e) => {
        e.preventDefault();
        running = true;
        document.getElementById("status_lucas").innerHTML = "running";
      });

    // se aplian las contestaciones de los chats
    let toggle_buttons = document.querySelectorAll("span.toggle-btn");
    toggle_buttons.forEach((each_button_toggle) => {
      const eventoClic = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      each_button_toggle.dispatchEvent(eventoClic);
    });
    console.log(
      "🟢 Se expandieron todas las contestaciones ",
      toggle_buttons.length
    );

    // se toman todos los "time" de los mensajes
    let all = document.querySelectorAll(".time");

    // si el time tiene el formato xx:xx se le antepone 00:XX:XX
    for (let i = 0; i <= all.length - 1; i++) {
      let das = all[i].textContent.split(":");
      if (das.length != 3) {
        all[i].textContent = "00:" + all[i].textContent;
      }
      all[i].textContent = all[i].textContent.replace(/\s/g, "");
    }

    let limpio = all[0].textContent;
    let fechaFicticia = "1970-01-01T" + limpio;
    let hora1 = new Date(fechaFicticia);

    // retorna tiempo con formato HH:MM:SS
    function formatTime(date) {
      const hh = String(date.getUTCHours()).padStart(2, "0");
      const mm = String(date.getUTCMinutes()).padStart(2, "0");
      const ss = String(date.getUTCSeconds()).padStart(2, "0");
      return `${hh}:${mm}:${ss}`;
    }

    // recorre todos los mensajes y resta el valor del primer elemento
    // HORA2 - HORA1
    all.forEach((each_hs) => {
      let each_limpio = each_hs.textContent.trim(" ");
      let aux_fecha = "1970-01-01T" + each_limpio;
      let aux_hs = new Date(aux_fecha);
      let new_hs = new Date(aux_hs - hora1);
      let hora_formateada = formatTime(new_hs);
      each_hs.innerHTML = hora_formateada;
      each_hs.setAttribute("data-lucasTime", hora_formateada);
    });
    console.log("🟢 Se modificaron " + all.length + " mensajes del chat");
    console.log("🟢 Se asignaron datos propios al html");

    // loop - mueve mensaje del chat hacia arriba
    const moveChat = () => {
      if (running == false) return;
      let rnow = document
        .querySelector(".vjs-time-range-current")
        .textContent.trim(" ");
      all.forEach((each) => {
        if (each.getAttribute("data-lucasTime") == rnow) {
          each.scrollIntoView({ behavior: "smooth" });
          each.parentNode.firstElementChild.style.color = "red";
          return;
        } else {
          each.parentNode.firstElementChild.style.color = "black";
        }
      });
    };
    console.log("🟢 Comienza a correr el script, que disfrutes la clase");

    setInterval(() => moveChat(), 1000);
  };

  // verifica si el reproductor comenzó, y comienza el programa
  const checkBegin = () => {
    let rnow = document
      .querySelector(".vjs-time-range-current")
      .textContent.trim(" ");
    if (rnow != "00:00:00") {
      clearInterval(interval_begin);
      mysoft();
    } else {
      console.log(
        "ESPERANDO comienzo del video... --- Script creado Blankitolv 🤓"
      );
    }
  };
  const sweetMessage = () => {
    setTimeout(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "CoderMessage charge, enjoy you class",
        showConfirmButton: false,
        timer: 1900,
      });
    }, 1000);
  };
  
  const scriptElement = document.createElement("script");
  scriptElement.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  document.body.appendChild(scriptElement);
    
  let interval_begin = setInterval(() => checkBegin(), 1000);
})();
