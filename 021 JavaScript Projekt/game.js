//Punktzahl
let punkte = 0;
//SquareNumb wird nicht mehr Hardgecodet sondern über die num() Funktion erstellt -> Easy = 6, Normal = 9, Hard = 12
let squareNumb = 0;
// Jenachdem welches Schwierigkeitslevel ausgewählt wird gibt es unterschiedliche squareNumbs
function num(){
    if ($('#easyBTN').attr('class')==="selected"){
        squareNumb = 3;
    }

    if ($('#normalBTN').attr('class')==="selected"){
        squareNumb = 6;
    }

    if ($('#hardBTN').attr('class')==="selected"){
        squareNumb = 12;
    };

    return squareNumb;
}
num();
// Selected Klasse dem angeklickten Schwierigkeitsstufe übergeben
$('#easyBTN').on("click", function(){
    $(this).addClass("selected"); //Selected
    $('#normalBTN').removeClass("selected");
    $('#hardBTN').removeClass("selected");
    $(".square").remove();
    punkte=0;
    app();
})
$('#normalBTN').on("click", function(){
    $('#easyBTN').removeClass("selected");
    $(this).addClass("selected");//Selected
    $('#hardBTN').removeClass("selected");
    $(".square").remove();
    punkte=0;
    app();
})
$('#hardBTN').on("click", function(){
    $('#easyBTN').removeClass("selected");
    $('#normalBTN').removeClass("selected");
    $(this).addClass("selected");//Selected
    $(".square").remove();
    punkte=0;
    app();
})


function app(){
    let count = 0;
    while(count < num()){
        // In den Div mit der Klasse "items" werden die Square DIVs hinzugefügt
        $(".items").append('<div class="square"></div>');
        count++;
    }
    // Alle Elemente mit der Klasse .square
    let square = $(".square");
    // Farben für meine Squars
    let colors = colorArray(num());
    // HTML Text RGB ändern in die zu gesuchten RGB Farbe
    let searchingRgbCode = pickColor();
    $('#rgbCode').text(`${searchingRgbCode}`)
    // Erreichte Punkte
    
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
    function colorArray(){        
        let colors = [];
        for(let color = 0; color < num(); color++){
            colors.push(randomColors());
        }
        return colors;
    }

    // Durch die Funktion wird automatisch ein Squar RGB ausgewählt
    function pickColor(){
        let pickColor = Math.floor(Math.random() * colors.length)    // * colors.length um je nach Modus Easy,Normal,Hard die Länge zu erhalten
        return colors[pickColor];
    }

    function pruefeSpiel(searchingRgbCode, clickedColor, element){
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
        for (let element = 0; element < num(); element++){
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
                pruefeSpiel(searchingRgbCode, clickedColor, this);        
            })
        }
    }

    mainGame();
    
    function resetGame() {
    // Neue Farben generieren
    colors = colorArray();
    searchingRgbCode = pickColor(); // Neue Farbe auswählen
    $("#rgbCode").text(searchingRgbCode);
    $("#gameheader").css({
        backgroundColor: "#232323"
    });

    // Farben der bestehenden Quadrate ändern mit foreach index 0,1,2,3, array.length
    $(".square").each(function(index) {
        $(this).css("background-color", colors[index]);
    });

    // Alte Event-Handler entfernen
    $(".square").off("click");
    $(".square").remove();
    //mainGame();
    app();
    }
    
    // Event-Handler für Reset-Button ONCLICK
    $("#reset").on("click", function() {
        resetGame();
    });
    
}
app();