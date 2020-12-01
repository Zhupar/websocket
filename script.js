const wsUri = "wss://echo.websocket.org/";
const output = document.querySelector('.output')
const btnSend =document.querySelector('.btnSend')
const btnGeoLoc =document.querySelector('.btnGeolocation')
const mapLink = document.querySelector('#map-link');
const message = document.querySelector('#input')
const websocket = new WebSocket(wsUri);
websocket.onopen

function writeResponse(message, tag, cls) {
    let pre = document.createElement(tag);
    pre.classList.add(cls)
    pre.innerHTML = message+'\n';
    output.appendChild(pre);
  }

  btnSend.addEventListener('click', () => {  
    writeResponse(message.value, "p", "send-message");

    websocket.onmessage = function(evt) {
        writeResponse(evt.data, "p", "message");
      };
    websocket.onerror = function(evt) {
        writeResponse(evt.data, "p", "message");
      };
    websocket.send(message.value);
    message.value=""    
  });


      // Функция, выводящая текст об ошибке
const error = () => {
  writeResponse('Невозможно получить ваше местоположение', "p");
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  writeResponse(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`, "a", "message");
  const a = document.querySelector('a')
  a.href =`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
}

  btnGeoLoc.addEventListener('click', () => {
    if (!navigator.geolocation) {
      websocket.onerror = function(evt) {
        writeResponse('Geolocation не поддерживается вашим браузером', "p", "message");
      };
    } else websocket.onmessage = function(evt) {
      writeResponse('Гео-локация', "p", "send-message");
      };
      websocket.send(navigator.geolocation.getCurrentPosition(success, error));
    });

     




  

