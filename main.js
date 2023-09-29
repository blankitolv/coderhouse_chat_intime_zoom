const mysoft = () => {
  let running = true
  let myBox = document.querySelector('.transcript .single-wrapper');
  let container = document.createElement('div');
  container.style.flex = '1';
  container.style.minHeight = '25';
  container.innerHTML = `
  <a href="#" id="lucas_pause">❎</a>
  <a href="#" id="lucas_play">✅</a>
  <b>status: <span id="status_lucas"></span></b>
  `
  myBox.appendChild(container);
  document.getElementById('status_lucas').innerHTML ="running";
  let lucas_pause = document.getElementById('lucas_pause').addEventListener('click',(e)=>{
    e.preventDefault();
    running = false;
    document.getElementById('status_lucas').innerHTML ="pause";
  })
  let lucas_play = document.getElementById('lucas_play').addEventListener('click',(e)=>{
    e.preventDefault();
    running = true;
    document.getElementById('status_lucas').innerHTML ="running";
  })
  let toggle_buttons = document.querySelectorAll('span.toggle-btn');
  toggle_buttons.forEach(each_button_toggle =>{
    const eventoClic = new MouseEvent("click", {
      bubbles: true, 
      cancelable: true, 
      view: window  
    });
    each_button_toggle.dispatchEvent(eventoClic);
  })


  console.log("🟢 Se expandieron todas las contestaciones ",toggle_buttons.length)
  let all = document.querySelectorAll('.time');
  for (let i=0;i<=all.length-1;i++){
    let das = all[i].textContent.split(':');
    if (das.length != 3) {
      console.log(all[i].textContent);
      all[i].textContent = '00:'+all[i].textContent;
      console.log(all[i].textContent);
    }
    all[i].textContent = all[i].textContent.replace(/\s/g, '');
  }
  let limpio = all[0].textContent;
  let fechaFicticia = '1970-01-01T' + limpio;
  let hora1 = new Date(fechaFicticia);

  
  function formatTime(date) {
    const hh =  String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  
  all.forEach(each_hs => {
    let each_limpio = each_hs.textContent.trim(' ');
    let aux_fecha = '1970-01-01T' + each_limpio;
    let aux_hs = new Date(aux_fecha)
    let new_hs = new Date (aux_hs - hora1);
    let hora_formateada = formatTime(new_hs);
    each_hs.innerHTML = hora_formateada;
    each_hs.setAttribute('data-lucasTime',hora_formateada)
  });
  console.log("🟢 Se modificaron "+all.length+" mensajes del chat")
  console.log("🟢 Se asignaron datos propios al html")
  
  const moveChat = () => {
    if (running == false) return
    let rnow = document.querySelector('.vjs-time-range-current').textContent.trim(' ');
    all.forEach(each => {
      if (each.getAttribute('data-lucasTime')==rnow) {
        each.scrollIntoView({ behavior: "smooth"});
        each.parentNode.firstElementChild.style.color="red";
        return;
      } else {
        each.parentNode.firstElementChild.style.color="black";
      }
    })
  }
  console.log("🟢 Comienza a correr el script, que disfrutes la clase")

  setInterval(()=> moveChat() ,1000)
}

const checkBegin = () => {
  let rnow = document.querySelector('.vjs-time-range-current').textContent.trim(' ');
  if (rnow != '00:00:00') {
    clearInterval(interval_begin);
    mysoft();
  } else {
    console.log ("ESPERANDO comienzo del video... --- Script creado Blankitolv 🤓")
  }
}

let interval_begin = setInterval(()=> checkBegin() ,1000)

