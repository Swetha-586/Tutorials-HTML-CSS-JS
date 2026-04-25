let nice = [
    "You're amazing! ✨",
    "You bring positivity everywhere 😊",
    "You're a kind-hearted person 💖",
    "People love being around you 😄"
];

let tease = [
    "You are a bit lazy today 😜",
    "Stop overthinking everything 😆",
    "You need more sleep 😂",
    "Too much scrolling, huh? 📱"
];

// Track used indices
let usedNice = [];
let usedTease = [];

function getUnique(arr, usedArr) {
    if (usedArr.length === arr.length) {
        usedArr.length = 0; // reset when all used
    }

    let index;
    do {
        index = Math.floor(Math.random() * arr.length);
    } while (usedArr.includes(index));

    usedArr.push(index);
    return arr[index];
}

function showMessage() {
    let dob = document.getElementById("dob").value;

    if (!dob) {
        document.getElementById("msg").innerHTML = "⚠️ Please enter DOB";
        return;
    }

    // Randomly choose array
    let choose = Math.random() < 0.5;

    let message;
    if (choose) {
        message = getUnique(nice, usedNice);
    } else {
        message = getUnique(tease, usedTease);
    }

    document.getElementById("msg").innerHTML = message;
}