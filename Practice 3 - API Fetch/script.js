async function getQuote() {
    const result = document.getElementById("quote");

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        result.textContent =
            '"' + data.quote + '" — ' + data.author;

    } catch (error) {
        result.textContent = "Unable to fetch quote.";
    }
}