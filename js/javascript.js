// Register new car form eventlistener and eventhandler
const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const doesNotAlreadyExist = -1;
    const reg_plate = document.getElementById("plate").value;

    if (carlist.doesCarExist(reg_plate) === doesNotAlreadyExist) {
        const brand = document.getElementById("brand").value;
        const model = document.getElementById("model").value;
        const category = document.getElementById("category").value;
        const persons = document.getElementById("persons").value;
        const suitcases = document.getElementById("suitcases").value;
        const supplement = getSupplementByCategory(category);
        const status = document.getElementById("status").value;
        carlist.registerCar(reg_plate, brand, model, category, persons, suitcases, supplement, status);
        carlist.showCarList();
        modal.style.display = "none"; // Close modal dialog
        snackbar.innerHTML = "The new car was saved";
    } else {
        snackbar.innerHTML = "Nothing was saved. Car already exists";
    }
    showSnackbar();
})


// Finds supplement (car category price) for at given car category
function getSupplementByCategory(category) {
    const budgetSupplement = 0.00;
    const standardSupplement = 60.00
    const minivanSupplement = 105.00
    if (category === "Budget") {
        return budgetSupplement;
    } else if (category === "Standard") {
        return standardSupplement;
    } else if (category === "Minivan") {
        return minivanSupplement;
    }
}


// --- New car dialog category event listener and handler ---- //
const category = document.getElementById("category");
category.addEventListener("change", function () {
    const supplementfield = document.getElementById("supplement");
    supplementfield.value = getSupplementByCategory(category.value).toFixed(2); 
})
// ----------------------------------------------------------- //

// --------- Search eventlisteners and eventhandlers --------- //
const carsearch = document.getElementById("carsearch");
carsearch.addEventListener("keyup", function () {
    const aTags = document.querySelectorAll(".carrow");
    const searchText = carsearch.value.toLowerCase();

    for (let i = 0; i < aTags.length; i++) {
        if (!aTags[i].textContent.toLowerCase().includes(searchText)) {
            aTags[i].style.display = "none";
        }  else {
            aTags[i].style.display = "table-row";
        } 
    }
})

const customersearch = document.getElementById("customersearch");
customersearch.addEventListener("keyup", function () {
    const aTags = document.querySelectorAll(".customerrow");
    const searchText = customersearch.value.toLowerCase();

    for (let i = 0; i < aTags.length; i++) {
        if (!aTags[i].textContent.toLowerCase().includes(searchText)) {
            aTags[i].style.display = "none";
        }  else {
            aTags[i].style.display = "table-row";
        } 
    }
})

const contractsearch = document.getElementById("contractsearch");
contractsearch.addEventListener("keyup", function () {
    const aTags = document.querySelectorAll(".contractrow");
    const searchText = contractsearch.value.toLowerCase();

    for (let i = 0; i < aTags.length; i++) {
        if (!aTags[i].textContent.toLowerCase().includes(searchText)) {
            aTags[i].style.display = "none";
        }  else {
            aTags[i].style.display = "table-row";
        } 
    }
})
// -------------------------------------------------------- //