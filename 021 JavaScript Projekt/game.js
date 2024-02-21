// Alle Elemente mit der Klasse .square
let square = $(".square");
//Anzahl der Squars -> Easy = 6, Normal = 9, Hard = 12
let squareNumb = 6;
// Farben für meine Squars
let colors = colorArray(squareNumb);
// HTML Text RGB ändern in die zu gesuchten RGB Farbe
let searchingRgbCode = pickColor();
$('#rgbCode').text(`${searchingRgbCode}`)
// Erreichte Punkte
let punkte = 0;
$("#punkte").text(punkte);

// Um nicht vordefinierte Farben zu nutzen werden mit diese Funktion zufällige Farben generiert
function randomColors(){
    // Math.floor -> Rundet AB! -> 255,89 = 255
    let r = Math.floor(Math.random() * 256);    // Math.random() * 256 nimmt eine Zahl zwischen 0(Inklusiv) - 255(Exklusiv)
    let g = Math.floor(Math.random() * 256);    // Um zwischen z.B. 100 bis 255 zu suchen würde die Funktion wie folgt ausschauen
    let b = Math.floor(Math.random() * 256);    // Math.floor(Math.random() * 156 + 100); -> 100(Inklusiv) - (100+156=256)(Exklusiv)

    return `rgb(${r},${g},${b})`;
}

// Erstellt ein Array mit der Anzahl = numSquares
function colorArray(squareNumb){
    let colors = [];
    for(let color = 0; color < squareNumb; color++){
        colors.push(randomColors());
    }
    return colors;
}

// Durch die Funktion wird automatisch ein Squar RGB ausgewählt
function pickColor(){
    let pickColor = Math.floor(Math.random() * colors.length)    // * colors.length um je nach Modus Easy,Normal,Hard die Länge zu erhalten
    return colors[pickColor];
}

function pruefeSpiel(clickedColor, element){
    // Überprüfen, ob die ausgewählte Farbe korrekt ist (ersetze dies durch deine Logik)
    if (searchingRgbCode === clickedColor) {
        $("#gameheader").css({
            backgroundColor: searchingRgbCode,
            fontSize: "30px"
        })
        //Chaining / Verkettete Methodenaufrufe
        $("#rgbCode").fadeOut("slow").fadeIn("fast").fadeOut("slow").fadeIn("fast").html(`RICHTIG ERRATEN!<br>${searchingRgbCode}`);
        // Nicht mehr weiter klickbar machen -> Click Event entfernen
        $(".square").off("click");
        punkte++;
        $("#punkte").text(punkte);
    } 
    else {
        //alert(`Leider Falsch, versuch es noch einmal!\nGesuchte Zahl: ${searchingRgbCode}\nDeine Zahl: ${clickedColor}`);
        //$(this).remove(); // Löscht das Square
        // Ändert den Background in die Body Background
        $(element).css({   //This bezieht sich auf das geklickte element
            backgroundColor: "#232323"
        })
    }        
}

function mainGame(){    
    for (let element = 0; element < square.length; element++){
        square[element].style.backgroundColor = colors[element];
        /*
         ACHTUNG: Bevor man ein Event mit .on öffnet sollte man mit .off sicher gehen das keine weiteren EVENTS offen sind
         PROBLEM WAS DARAUS RESULTIERT IST: Das man mehrere Events offen hat mit Punkte++ sodass wenn man dann einmal richtig
         liegt man mehrere Punkte gut geschrieben bekommt.
        BEISPIEL: wenn man .off weg lässt und mehr mals das mainGame über den #reset Button startet werden mehrere Events gestartet
                    und alle warten ob man den Richtigen Wert anklickt denn dann wird über pruefeSpiel() der True zweig abgelaufen
                    und hier wird ja punkte um 1 erhöht, da man aber jetzt durch mehrmals klicken auf #reset mehrere EVENT-HANDLER
                    gestaret hat z.B. 5 Stück durch 5 mal klicken erhält man nun für jedes Event 1 Punkt d.h. 5 Punkte was am ende
                    die Punkte vergabe verfälscht.
         Aus diesem Grund ist es wichtig den Eventhandler zu schließen bevor man den erneut öffnet
        */
        $(square[element]).off("click"); 
        // Squars Klickbar machen
        $(square[element]).on("click", function(){
            let clickedColor = colors[element];
            pruefeSpiel(clickedColor, this);        
        })
    }
}

mainGame();


// NEW GAME Button CLicked
$("#reset").on("click", function(){
    colors = colorArray(squareNumb);
    searchingRgbCode = pickColor();
    $("#rgbCode").text(searchingRgbCode);
    $("#gameheader").css({
        backgroundColor:"#232323"
    })    
    mainGame();
})