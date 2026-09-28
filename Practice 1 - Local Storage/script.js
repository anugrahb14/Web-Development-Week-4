function saveName() {
    const name = document.getElementById("nameInput").value;

    localStorage.setItem("userName", name);

    document.getElementById("result").textContent =
        "Name saved: " + name;
}

window.onload = function() {
    const savedName = localStorage.getItem("userName");

    if (savedName) {
        document.getElementById("result").textContent =
            "Welcome back, " + savedName + "!";
    }
};