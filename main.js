let numberOfItems;


init()

function init() {
  countItems();
  loadDoc();
  insertDoc();
}



function countItems() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "baza_pytan.json", false);
  xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
  xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.send(); 
  var myObj = JSON.parse(xmlhttp.responseText);
  console.log(Object.keys(myObj).length);
  numberOfItems = Object.keys(myObj).length;

}



let whatWasClicked = "";


document.addEventListener('click', function() {
 whatWasClicked = event.target.id;
 clickedAnswerHandler();}, true
);


function clickedAnswerHandler() {
  switch(whatWasClicked) {
    case "T":
      whatWasClicked = "Tak";
      break;
    case "N":
      whatWasClicked = "Nie";
      break;
    case "A":
      whatWasClicked = answerA;
      break;
    case "B":
      whatWasClicked = answerB;
      break;
    case "C":
      whatWasClicked = answerC;
      break;
  }
}


function rightAnswerHandler() {
  switch(rightAnswer) {
    case "T":
      rightAnswer = "Tak";
      break;
    case "N":
      rightAnswer = "Nie";
      break;
    case "A":
      rightAnswer = answerA;
      break;
    case "B":
      rightAnswer = answerB;
      break;
    case "C":
      rightAnswer = answerC;
      break;
  }
}


// Load json item values
function loadDoc() {
  // Load json
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "baza_pytan.json", false);
  xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
  xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
  xmlhttp.send(); 

  var myObj = JSON.parse(xmlhttp.responseText);
  
  // Draw an item from json
  var randomIndex = Math.floor(Math.random() * numberOfItems);
  var mylist = myObj[randomIndex];

  // Json item values
  question = mylist.Pytanie;    
  questionNumber = mylist.NumerPytania;
  fileName = mylist.Media;
  fileExtension = fileName.slice(fileName.length - 3);
  answerA = mylist.OdpowiedzA;
  answerB = mylist.OdpowiedzB;
  answerC = mylist.OdpowiedzC;
  rightAnswer = mylist.PoprawnaOdp;
  questionValue = parseInt(mylist.LiczbaPunktow);
  questionScope = mylist.ZakresStruktury;
};

// Fill page with json item values
function insertDoc() {
  document.getElementById("questionNumber").innerHTML = "Pytanie nr " + questionNumber;
  document.getElementsByClassName("question")[0].innerHTML = question;
  document.getElementsByClassName("points")[0].innerHTML = "Punktów do zdobycia: " + questionValue;
  document.getElementsByClassName("scope")[0].innerHTML = "Zakres struktury: " + questionScope;
  insertFile()
  insertAnswers()
  clearAnswer()
}

function insertFile() {
  // Image
  if (fileExtension == "jpg") {
    document.getElementById("media").innerHTML = '<img src="" id="mainJPG" alt="" ">';
    document.getElementById('mainJPG').src= "media/" + fileName;
  }
  // Video
  if (fileExtension == "mp4") {
    document.getElementById("media").innerHTML =`  <video controls autoplay id="mainMP4" width="768" height="432" controls>
    <source src="" type="video/mp4/"> <source src="" type="video/ogg">Your browser does not support the video tag.</video>`;
    document.getElementById('mainMP4').src= "media/" + fileName;     
  }
  // Empty
  if (fileExtension == "") {
    document.getElementById("media").innerHTML = "";
  }
};


let imgHeight = 432;
let imgWidth = 768;

function reduceJPG() {
  imgHeight -= 72;
  imgWidth -= 128;
};

function enlargeJPG() {
  imgHeight += 72;
  imgWidth += 128;
};

function resizeJPG() {
  document.getElementById("mainJPG").style.height = imgHeight + "px";
  document.getElementById("mainJPG").style.width = imgWidth + "px";
};




let pPoints = 0;

function possiblePoints() {
  pPoints += questionValue;
  document.getElementById("pointsPossible").innerHTML = "z " + pPoints + " możliwych do zdobycia";
}

function wrongAnswer() {
  possiblePoints();
  disableAnswers();
  colorAnswers();
  rightAnswerHandler()
  document.getElementById("answer").innerHTML = "Źle! " + "<br>" + "Zaznaczona odpowiedź: " + whatWasClicked + "<br>" + "Poprawna odpowiedź: " + rightAnswer;  
}

function correctAnswer() {
  addPoints();
  possiblePoints();
  disableAnswers();
  colorAnswers();
  rightAnswerHandler()
  document.getElementById("answer").innerHTML = "Dobrze! " + "<br>" + "Zaznaczona odpowiedź: " + whatWasClicked + "<br>" + "Poprawna odpowiedź: " + rightAnswer; 
}


function clearAnswer() {
  document.getElementById("answer").innerHTML = "";
}


let gatheredPoints = 0;

function addPoints() {
  gatheredPoints += questionValue;
  document.getElementById("pointsGathered").innerHTML = "Zdobyto punktów: " + gatheredPoints;
}


function disableAnswers() {
  let answerButtons = document.getElementsByClassName("myBtn")
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].disabled = true;
  }
};


function colorAnswers() {
  let answerButtons = document.getElementsByClassName("myBtn")
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].style.background = "red";
  }
  document.getElementById(rightAnswer).style.background = "green";
};


function valuesToAnswers () {
  document.getElementById("A").value = answerA;
  document.getElementById("B").value = answerB;
  document.getElementById("C").value = answerC;
}


function boldButton(btn){
    btn.style.fontWeight =  '700';
} 

function insertAnswers () {
  if (rightAnswer == "T") {
    document.getElementById("answers").innerHTML = `<input type="button" class="myBtn" id="T" value="Tak" onclick="correctAnswer();boldButton(this);">
                                                    <input type="button" class="myBtn" id="N" value="Nie" onclick="wrongAnswer();boldButton(this);">`;

  };
  if (rightAnswer == "N") {
    document.getElementById("answers").innerHTML = `<input type="button" class="myBtn" id="T" value="Tak" onclick="wrongAnswer();boldButton(this);">
                                                    <input type="button" class="myBtn" id="N" value="Nie" onclick="correctAnswer();boldButton(this);">`;
  };
  if (rightAnswer == "A") {
    document.getElementById("answers").innerHTML =`
    <input id="A" class="myBtn" type="button" value="" onclick="correctAnswer();boldButton(this);">
    <input id="B" class="myBtn" type="button" value="" onclick="wrongAnswer();boldButton(this);">
    <input id="C" class="myBtn" type="button" value="" onclick="wrongAnswer();boldButton(this);">`;
    valuesToAnswers ();
  };
  if (rightAnswer == "B") {
    document.getElementById("answers").innerHTML =`
    <input id="A" class="myBtn" type="button" value="" onclick="wrongAnswer();boldButton(this);">
    <input id="B" class="myBtn" type="button" value="" onclick="correctAnswer();boldButton(this);">
    <input id="C" class="myBtn" type="button" value="" onclick="wrongAnswer();boldButton(this);">`;
    valuesToAnswers ();
  };
  if (rightAnswer == "C") {
    document.getElementById("answers").innerHTML =`
    <input id="A" class="myBtn" type="button" value="" onclick="wrongAnswer();boldButton(this);">
    <input id="B" class="myBtn" type="button" value="" onclick="wrongAnswer();boldButton(this);">
    <input id="C" class="myBtn" type="button" value="" onclick="correctAnswer();boldButton(this);">`;
    valuesToAnswers ();
  };
};



