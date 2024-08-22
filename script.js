// Array von Fragen und Antworten
const questions = [
    // Jede Frage ist ein Objekt mit dem Fragetext und den Antwortoptionen
    {
        question:"Welches ist das größte Säugetier der Welt?",
        answers:[
            // Jede Antwortoption ist ein Objekt mit dem Antworttext und einem Flag, das angibt, ob sie korrekt ist oder nicht
            { text: "Elefant", correct:false},
            { text: "Wal", correct:true},
            { text: "Nashorn", correct:false},
            { text: "Giraffe", correct:false},
        ]
    },
    {
        question:"Welches ist der längste Fluss der Welt?",
        answers:[
            { text: "Nil", correct:true},
            { text: "Mississippi", correct:false},
            { text: "Amazonas", correct:false},
            { text: "Jangtsekiang", correct:false},
        ]
    },
    {
        question:"Wer malte die Mona Lisa?",
        answers:[
            { text: "Leonardo da Vinci", correct:true},
            { text: "Vincent van Gogh", correct:false},
            { text: "Pablo Picasso", correct:false},
            { text: "Michelangelo", correct:false},
        ]
    },
    {
        question:"Wer war der erste Mensch im Weltraum?",
        answers:[
            { text: "Yuri Gagarin", correct:false},
            { text: "Buzz Aldrin", correct:false},
            { text: "Alan Shepard", correct:false},
            { text: "Neil Armstrong", correct:true},
        ]
    },
    {
        question:"Was ist die Hauptstadt von Australien?",
        answers:[
            { text: "Melbourne", correct:false},
            { text: "Sydney", correct:true},
            { text: "Canberra", correct:false},
            { text: "Brisbane", correct:false},
        ]
    },
    {
        question:"Wer hat die Relativitätstheorie entwickelt?",
        answers:[
            { text: "Isaac Newton", correct:false},
            { text: "Galileo Galilei", correct:false},
            { text: "Albert Einstein", correct:true},
            { text: "Nikola Tesla", correct:false},
        ]
    },
    {
        question:"Welches Element ist das häufigste in der Erdkruste?",
        answers:[
            { text: "Eisen", correct:false},
            { text: "Sauerstoff", correct:true},
            { text: "Silizium", correct:false},
            { text: "Aluminium", correct:false},
        ]
    },
    {
        question:"Was ist die Hauptzutat in Guacamole?",
        answers:[
            { text: "Avocado", correct:true},
            { text: "Tomaten", correct:false},
            { text: "Kartoffeln", correct:false},
            { text: "Zwiebeln", correct:false},
        ]
    },
    {
        question:"Welches Land hat die meisten Einwohner?",
        answers:[
        { text: "Indien", correct:false},
        { text: "Vereinigte Staaten", correct:false},
        { text: "Russland", correct:false},
        { text: "China", correct:true},
        ]
    },
    {
        question:"Wer war der erste Präsident der Vereinigten Staaten?",
        answers:[
        { text: "Thomas Jefferson", correct:false},
        { text: "Abraham Lincoln", correct:false},
        { text: "George Washington", correct:true},
        { text: "John Adams", correct:false},
        ]
    },
];

// Elemente im HTML-Dokument abrufen
const questionElement = document.getElementById("question"); // HTML-Element, um die Frage anzuzeigen
const answerButtons = document.getElementById("answer-buttons"); // HTML-Element, um die Antwortoptionen anzuzeigen
const nextButton = document.getElementById("next-btn"); // HTML-Element für den "Next" Button

// Variablen für den aktuellen Fragenindex und den Punktestand initialisieren
let currentQuestionIndex = 0; 
let score = 0; 

// Funktion, um das Quiz zu starten
function startQuiz(){
    currentQuestionIndex= 0; 
    score = 0; 
    nextButton.innerHTML = "Nächste"; 
    showQuestion();
}

// Funktion, um eine Frage anzuzeigen
function showQuestion(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex]; // Die aktuelle Frage aus dem questions-Array abrufen
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    // Für jede Antwortoption einen Button erstellen und hinzufügen
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Ein HTML-Button-Element erstellen
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); // Den Button zum HTML-Element für die Antwortoptionen hinzufügen
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer); // Dem Button einen Event-Listener hinzufügen, um die Antwortauswahl zu behandeln
    });
}

// Funktion, um den Zustand zurückzusetzen (z. B. wenn eine neue Frage angezeigt wird)
function resetState(){
    nextButton.style.display = "none"; 
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild); // Alle vorhandenen Antwortoptionen entfernen
    }
}

// Funktion, die ausgeführt wird, wenn eine Antwort ausgewählt wird -  direkte Reaktion auf die Auswahl einer Antwort, 
// indem der ausgewählte Button entsprechend markiert wird und der Punktestand erhöht wird (falls die Antwort korrekt ist).
function selectAnswer(e){
    const selectedBtn= e.target; // Das ausgewählte Antwort-Button-Element abrufen
    const isCorrect = selectedBtn.dataset.correct === "true"; // Überprüfen, ob die ausgewählte Antwort korrekt ist
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++; 
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Alle Antwortbuttons durchgehen - visuelle Darstellung der korrekten Antworten
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct"); 
        }
        button.disabled = true; // Deaktiviere alle Antwortbuttons, um mehrfache Auswahl zu verhindern
    });
    nextButton.style.display ="block"; 
}

// Funktion, um den Punktestand anzuzeigen
function showScore(){
    resetState(); 
    questionElement.innerHTML = "Du hast " + score + " von " + questions.length +" Fragen richtig!"; // Den Punktestand anzeigen
    nextButton.innerHTML = "Erneut spielen"; 
    nextButton.style.display = "block"; 
}

// Funktion, um mit dem nächsten Button zur nächsten Frage zu gelangen oder das Quiz zu beenden
function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion(); 
    } else {
        showScore(); // Wenn alle Fragen beantwortet wurden, zeige den Punktestand an
    }
}

// Event-Listener für den "Next" Button
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton(); // Wenn es weitere Fragen gibt, behandle den Klick auf den "Next" Button
    }else{
        startQuiz(); 
    }
})

// Quiz starten (wird beim Laden der Seite aufgerufen)
startQuiz();