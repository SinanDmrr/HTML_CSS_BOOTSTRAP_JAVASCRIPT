// Alle Elemente mit der Klasse .square
let square = $(".square");
//Anzahl der Squars -> Easy = 6, Normal = 9, Hard = 12
let squareNumb = 6;
// Farben für meine Squars
let colors = colorArray(squareNumb);
// HTML Text RGB ändern in die zu gesuchten RGB Farbe
let searchingRgbCode = pickColor();
$('#rgbCode').text(`${searchingRgbCode}`)

// Um nicht vordefinierte Farben zu nutzen werden mit diese Funktion zufällige Farben generiert
function randomColors(){
    // Math.floor -> Rundet AB! -> 255,89 = 255
    let r = Math.floor(Math.random() * 256);    // Math.random() * 256 nimmt eine Zahl zwischen 0(Inklusiv) - 255(Exklusiv)
    let g = Math.floor(Math.random() * 256);    // Um zwischen z.B. 100 bis 255 zu suchen würde die Funktion wie folgt ausschauen
    let b = Math.floor(Math.random() * 256);    // Math.floor(Math.random() * 156 + 100); -> 100(Inklusiv) - (100+156=256)(Exklusiv)

    return `rgb(${r},${g},${b})`;
}

// Erstellt ein Array mit der Anzahl = numSquares
function colorArray(numSquares){
    let colors = [];
    for(let color = 0; color < numSquares; color++){
        colors.push(randomColors());
    }
    return colors;
}

// Durch die Funktion wird automatisch ein Squar RGB ausgewählt
function pickColor(){
    let pickColor = Math.floor(Math.random() * colors.length)    // * colors.length um je nach Modus Easy,Normal,Hard die Länge zu erhalten
    return colors[pickColor];
}


// Durch die Schleife den Squars die Farben geben aus dem Colors-Array
for (let element = 0; element < square.length; element++){
    square[element].style.backgroundColor = colors[element];
    // Squars Klickbar machen
    $(square[element]).on("click", function(){
        let clickedColor = colors[element];
        // Überprüfen, ob die ausgewählte Farbe korrekt ist (ersetze dies durch deine Logik)
        if (searchingRgbCode === clickedColor) {
            alert(`RICHTIG!`);
        } else {
            alert(`Leider Falsch, versuch es noch einmal!\nGesuchte Zahl: ${searchingRgbCode}\nDeine Zahl: ${clickedColor}`);
            //$(this).remove(); // Löscht das Square
            // Ändert den Background in die Body Background
            $(this).css({   //This bezieht sich auf das geklickte element
                backgroundColor: "#232323"
            })
        }        
    })
}

