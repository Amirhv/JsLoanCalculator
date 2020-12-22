const UiForm = document.querySelector("#loan-claculator-form");

UiForm.addEventListener("submit", function (e) {
    // Loading gif
    document.querySelector("#loading").style.display = "block";
    // Results section
    document.querySelector("#results").style.display = "none";

    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

function calculateResults(e) {
    // UI Vars
    const UiAmount = document.querySelector("#loan-amount");
    const UiInterest = document.querySelector("#interest");
    const UiYears = document.querySelector("#years");
    const UiMonthlyPayment = document.querySelector("#monthly-payment");
    const UiTotalPayment = document.querySelector("#total-payment");
    const UiTotalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(UiAmount.value);
    const calculatedInterest = parseFloat(UiInterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UiYears.value) * 12;

    // Compute Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        UiMonthlyPayment.value = monthly.toFixed(2);
        UiTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UiTotalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

        // Loading gif
        document.querySelector("#loading").style.display = "none";
        // Results section
        document.querySelector("#results").style.display = "block";
    } else {
        showError("Please check your numbers again");
    }
}

function showError(errorMessage) {
    // Creating Error Div
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(errorMessage));

    // Getting Card and Heading Elements
    const UiCard = document.querySelector(".card");
    const UiHeading = document.querySelector("#heading");

    // Insert Error Div Above Heading(h1)
    UiCard.insertBefore(errorDiv, UiHeading);

    // Clearing Error Div after 3sec
    setTimeout(clearError, 3000);

    // Loading gif
    document.querySelector("#loading").style.display = "none";
    // Results section
    document.querySelector("#results").style.display = "none";
}

function clearError() {
    const errorDiv = document.querySelector(".alert");
    errorDiv.remove();
}
