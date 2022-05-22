// Load users
const btn = document.querySelector(".get-quotes");
const number = document.getElementById("number");

btn.addEventListener("click", getQuotes);

// Create function getUsers
function getQuotes(e) {
    e.preventDefault();

    if (number.value.length == 0) {
        return alert("Please enter a number");
    } else {
        const https = new XMLHttpRequest();
    
        https.open("GET", "https://type.fit/api/quotes", true);
    
        https.onload = function() {
            if (this.status === 200) {
                console.log(this.responseText);
                const response = shuffle(JSON.parse(this.responseText));
    
                let output = "";
                // response.forEach(function(quote) {
                //     output += `
                //         <li>Quote: ${quote.text}</li>
                //         <li>Author: ${quote.author}</li>
                //         <hr>
                //     `;
                // })

                for (let i = 0; i < response.length; i++) {
                    if (i == number.value) {
                        break;
                    }
                    output += 
                    `
                    <q>${response[i].text}</q>
                    <p>${response[i].author}</p>
                    <hr>
                    `;
                }
    
                document.querySelector(".quotes").innerHTML = output;
            }
        };
        https.send();
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
