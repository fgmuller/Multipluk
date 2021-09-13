







totalBestScoresToShow = 5,

 function getTotalScore() {
  return score * 5;
 }



/******************************* MEJORES PUNTUACIONES (LOCALSTORAGE) *******************************/
function saveFinalScore() {
 localStorage.setItem(getFinalScoreDate(), getTotalScore());
 showBestScores();
 removeNoBestScores();
}

function getFinalScoreDate() {
 var date = new Date();
 return fillZero(date.getDay() + 1) + '/' +
  fillZero(date.getMonth() + 1) + '/' +
  date.getFullYear() + ' ' +
  fillZero(date.getHours()) + ':' +
  fillZero(date.getMinutes()) + ':' +
  fillZero(date.getSeconds());
}

function fillZero(number) {
 if (number < 10) {
  return '0' + number;
 }
 return number;
}

function getBestScoreKeys() {
 var bestScores = getAllScores();
 bestScores.sort(function(a, b) {
  return b - a;
 });
 bestScores = bestScores.slice(0, totalBestScoresToShow);
 var bestScoreKeys = [];
 for (var j = 0; j < bestScores.length; j++) {
  var score = bestScores[j];
  for (var i = 0; i < localStorage.length; i++) {
   var key = localStorage.key(i);
   if (parseInt(localStorage.getItem(key)) == score) {
    bestScoreKeys.push(key);
   }
  }
 }
 return bestScoreKeys.slice(0, totalBestScoresToShow);
}

function getAllScores() {
 var all = [];
 for (var i = 0; i < localStorage.length; i++) {
  all[i] = (localStorage.getItem(localStorage.key(i)));
 }
 return all;
}

function showBestScores() {
 var bestScores = getBestScoreKeys();
 var bestScoresList = document.getElementById('puntuaciones');
 if (bestScoresList) {
  clearList(bestScoresList);
  for (var i = 0; i < bestScores.length; i++) {
   addListElement(bestScoresList, bestScores[i], i == 0 ? 'negrita' : null);
   addListElement(bestScoresList, localStorage.getItem(bestScores[i]), i == 0 ? 'negrita' : null);
  }
 }
}

function clearList(list) {
 list.innerHTML = '';
 addListElement(list, "Fecha");
 addListElement(list, "Puntos");
}

function addListElement(list, content, className) {
 var element = document.createElement('li');
 if (className) {
  element.setAttribute("class", className);
 }
 element.innerHTML = content;
 list.appendChild(element);
}

// extendemos el objeto array con un metodo "containsElement"
Array.prototype.containsElement = function(element) {
 for (var i = 0; i < this.length; i++) {
  if (this[i] == element) {
   return true;
  }
 }
 return false;
};

function removeNoBestScores() {
 var scoresToRemove = [];
 var bestScoreKeys = getBestScoreKeys();
 for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if (!bestScoreKeys.containsElement(key)) {
   scoresToRemove.push(key);
  }
 }
 for (var j = 0; j < scoresToRemove.length; j++) {
  var scoreToRemoveKey = scoresToRemove[j];
  localStorage.removeItem(scoreToRemoveKey);
 }
}
/******************************* FIN MEJORES PUNTUACIONES *******************************/








console.log(score)


var nombreUser = localStorage.getItem("nombre_u");


function captura() {



 var nombreU = document.getElementById("nUser").value;


 localStorage.setItem("nombre_u", nombreU);


}




function mostrarPuntos() {



 var uPuntos =


  localStorage.setItem("scorevalue", uPuntos);


}




























function accionPlay() {
 var reproducir = new Audio();
 reproducir.src =
  "https://static.wixstatic.com/mp3/e7e65a_18fcdec90dc74c5ea6e1051ae8c2da32.mp3";
 reproducir.play();
 reproducir.controls = true;
}


var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// si hacemos clic en inicio / reinicio
document.getElementById("startreset").onclick = function() {
 accionPlay();

 // si estamos jugando

 if (playing == true) { //Recargar página

  location.reload();

 } else { // si no estamos jugando


  // cambia el modo a jugar

  playing = true;

  // establece la puntuación en 0

  score = 0;
  document.getElementById("scorevalue").innerHTML = score;

  // muestra el cuadro de cuenta regresiva

  show("timeremaining");
  timeremaining = 60;
  document.getElementById("timeremainingvalue").innerHTML = timeremaining;

  // esconde la caja de la cuenta regresiva

  hide("gameOver");

  // botón de cambio para restablecer
  document.getElementById("startreset").innerHTML = "Reiniciar el juego";

  // iniciar cuenta regresiva

  startCountdown();

  //genera una nueva pregunta

  generateQA();
 }

}

// Al hacer clic en un cuadro de respuesta

for (i = 1; i < 5; i++) {
 document.getElementById("box" + i).onclick = function() {

  // verifica si estamos jugando
  if (playing == true) { //si
   if (this.innerHTML == correctAnswer) {
    //respuesta correcta

    // aumenta la puntuación en 1
    score++;
    document.getElementById("scorevalue").innerHTML = score;
    // oculta el cuadro incorrecto y muestra el cuadro correcto
    hide("wrong");
    show("correct");
    setTimeout(function() {
     hide("correct");
    }, 1000);

    //Genera nueva pregunta

    generateQA();
   } else {
    //respuesta incorrecta
    hide("correct");
    show("wrong");
    setTimeout(function() {
     hide("wrong");
    }, 1000);
   }
  }
 }
}


//funciones

// iniciar contador

function startCountdown() {
 action = setInterval(function() {
  timeremaining -= 1;
  document.getElementById("timeremainingvalue").innerHTML = timeremaining;
  if (timeremaining == 0) { // juego terminado
   stopCountdown();
   show("gameOver");
   document.getElementById("gameOver").innerHTML = "<p>🤩Juego Finalizado!</p><p>Tu puntaje es 🥇: " + score +
    ".</p>";
   setTimeout(function A() {
    hide("gameOver") = "2 seconds"
   }, 3500);
   hide("timeremaining");
   hide("correct");
   hide("wrong");

   playing = false;
   document.getElementById("startreset").innerHTML = "😃Iniciar Juego";
  }
 }, 1000);


}

// detener contador

function stopCountdown() {
 clearInterval(action);
}

// ocultar un elemento

function hide(Id) {
 document.getElementById(Id).style.display = "none";
}

// muestra un elemento

function show(Id) {
 document.getElementById(Id).style.display = "block";
}

// genera preguntas y respuestas múltiples

function generateQA() {
 var x = 1 + Math.round(9 * Math.random());
 var y = 1 + Math.round(9 * Math.random());
 correctAnswer = x * y;
 document.getElementById("question").innerHTML = x + "x" + y;
 var correctPosition = 1 + Math.round(3 * Math.random());
 document.getElementById("box" + correctPosition).innerHTML =
  correctAnswer; // llena una casilla con la respuesta correcta

 // llena otras casillas con respuestas incorrectas

 var answers = [correctAnswer];

 for (i = 1; i < 5; i++) {
  if (i != correctPosition) {
   var wrongAnswer;
   do {
    wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math
     .random())); // una respuesta incorrecta
   } while (answers.indexOf(wrongAnswer) > -1)
   document.getElementById("box" + i).innerHTML = wrongAnswer;
   answers.push(wrongAnswer);
  }
 }
}
