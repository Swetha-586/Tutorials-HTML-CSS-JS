let number;
let prize;
let attempts;

function init() {
    number = Math.floor(Math.random() * 100) + 1;
    prize = 1000;
    attempts = 0;

    document.getElementById("range").innerHTML = "Guess a number between 1 and 100";
    document.getElementById("prize").innerHTML = "💰 Prize: ₹" + prize;
    document.getElementById("msg").innerHTML = "";

    // Enter key trigger
    document.getElementById("guess").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            check();
        }
    });
}
function check() {
    let input = document.getElementById("guess");
    let userGuess = parseInt(input.value);

    if (isNaN(userGuess)) return;

    attempts++;

    if (prize <= 0) {
        document.getElementById("msg").innerHTML =
            "❌ Game Over! Number was " + number;
        return;
    }

    if (userGuess === number) {
        document.getElementById("msg").innerHTML =
            "🎉 Correct! You won ₹" + prize + " in " + attempts + " attempts!";
    } 
    else if (userGuess > number) {
        prize -= 100;
        document.getElementById("msg").innerHTML = "📉 Too big! Try smaller.";
    } 
    else {
        prize -= 100;
        document.getElementById("msg").innerHTML = "📈 Too small! Try bigger.";
    }

    document.getElementById("prize").innerHTML = "💰 Prize: ₹" + prize;

    input.value = "";

    if (prize <= 0) {
        document.getElementById("msg").innerHTML =
            "❌ Game Over! Prize is ₹0. Number was " + number;
    }
}

// 🔄 Reset Function
function resetGame() {
    number = Math.floor(Math.random() * 100) + 1;
    prize = 1000;
    attempts = 0;

    document.getElementById("prize").innerHTML = "💰 Prize: ₹" + prize;
    document.getElementById("msg").innerHTML = "";
    document.getElementById("guess").value = "";
}