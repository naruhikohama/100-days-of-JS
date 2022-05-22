// Load quotes
const btn = document.querySelector(".get-quotes");
const number = document.getElementById("number");
const URL = "https://type.fit/api/quotes"

btn.addEventListener("click", getQuotes);

function getQuotes(e) {
    e.preventDefault();

    if (number.value.length == 0) {
        return alert("Please enter a number");
    } else {
        fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            data  = shuffle(data);
            let output = "";
            for (let i = 0; i < data.length; i++) {
                if (i == number.value) {
                    break;
                }
                output += 
                `
                <q>${data[i].text}</q>
                <p>${data[i].author}</p>
                <hr>
                `;
            }

            document.querySelector(".quotes").innerHTML = output;

        })  
    }
}

// SHUFFLE QUOTES
function shuffle(quotes) {
    let currentIndex = quotes.length, tempValue, randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        // Decrease currentIndex by 1
        currentIndex--;
        // Swap the last element with currentIndex
        tempValue = quotes[currentIndex];
        quotes[currentIndex] = quotes[randomIndex];
        quotes[randomIndex] = tempValue;
    }
    return quotes;
}