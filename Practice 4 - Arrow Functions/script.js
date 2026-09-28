function filterNumbers() {
    const numbers = [25, 40, 55, 70, 85, 30, 100];

    const greaterThan50 = numbers.filter(number => number > 50);

    document.getElementById("result").textContent =
        "Numbers greater than 50: " + greaterThan50.join(", ");
}