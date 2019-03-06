var currdata = {};

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var s = "";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
          if(rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            s = allText;
          }
        }
    }
    rawFile.send(null);
    return s;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function createable() {
  data = JSON.parse(readTextFile("database.json"))["data"][Math.floor(getRandomArbitrary(0, JSON.parse(readTextFile("database.json"))["data"].length))];

  document.getElementById("question").innerHTML = data["text"];

  var vars = shuffle(data["variants"]);
  data["variants"] = vars;

  document.getElementById("variants").innerHTML = "";

  for (var i = 0; i < vars.length; i++) {
    add("input" + String(i), vars[i]);
  }

  document.getElementById("description").innerHTML = "";
  currdata = data;
}

function check(j) {
  if (document.getElementById(j).innerHTML === currdata["anwser"]) {
    document.getElementById("anwser").innerHTML = "Правильно";
  } else {
    document.getElementById("anwser").innerHTML = "Неправильно";
  }
  document.getElementById("description").innerHTML = currdata["description"];
  document.getElementById("variants").innerHTML = "";
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function add(name, value) {
  var element = document.createElement("button");
  //Assign different attributes to the element. 
  element.id = name;
  element.innerHTML = value;
  element.onclick = function() {
    check(name);
  }
  var foo = document.getElementById("variants");
  //Append the element in page (in span).  
  foo.appendChild(element);
}
