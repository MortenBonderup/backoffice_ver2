// ------------------ Carlist object ------------------ //
const Carlist = function () {
    this.cars = [];

    this.registerCar = function (plate, brand, model, category, persons, suitcases, price, status) {
        const car = new Carobject(plate, brand, model, category, persons, suitcases, price, status);
        this.cars.push(car);
    }

    this.showCarList = function () {
        const output = document.getElementById("htmlcarlist");
        output.innerHTML = ""; //Cleans output table
        for (const car of this.cars) {
            car.showCar();
        }

        if (this.cars.length === 0) { // If no cars on the list ...
            output.innerHTML = "<tr><td>No more cars to show</td></tr>";
        }
    }

    this.deleteCar = function (id, hasContract) {
        const doesNotExist = -1;
        const ok = confirm("Do you really want to delete this car ?");
        let index = 0; //Keep track of index in the car object list
        const snackbar = document.getElementById("snackbar");
        if (ok && !hasContract) {
            for (const car of this.cars) {
                if (car.registration_plate === id) {
                    this.cars.splice(index, 1); // Removes the car from car object list
                }
                index++; //Add 1 to index
            }
            this.showCarList();
            snackbar.innerHTML = "Car with plate: " + id + " was deleted";
        } else {
            snackbar.innerHTML = "No car was deleted. Either you canceled<br>or car has active rental contract.";
        }

        showSnackbar();
    }

    this.changeCarStatus = function (id, oldStatus) {
        const validStatus = ["Cleaning", "Dirty", "Ready"];
        const newStatus = document.getElementById(id).value;
        const snackbar = document.getElementById("snackbar");
        if (validStatus.indexOf(newStatus) !== -1) { // if new status is valid
            for (const car of this.cars) {
                if (car.registration_plate === id) {
                    this.status = newStatus;
                }
            }
            snackbar.innerHTML = "Status changed to " + newStatus + " for car with plate: " + id;
        } else {
            //Change back to old status
            const selectbox = document.getElementById(id);
            selectbox.value = oldStatus;
            snackbar.innerHTML = "Nothing was changed";
        }
        showSnackbar();

    }

    // Returns index position in carlist for a given car (by its plate)
    // If the car does not exist - return -1
    this.doesCarExist = function (plate) {
        const doesNotExist = -1;
        let index = 0;
        for (const car of this.cars) {
            if (car.registration_plate === plate) {
                return index;
            }
            index++;
        }
        return doesNotExist;
    }

}
// ---------------------------------------------- //


// --------------- Car object ---------------- //

const Carobject = function (plate, brand, model, category, persons, suitcases, price, status) {
    // ------CONSTRUCTOR ------ //
    // ------ Attributes ------ //
    this.registration_plate = plate;
    this.car_brand = brand;
    this.car_model = model;
    this.category = category;
    this.persons = persons;
    this.suitcases = suitcases;
    this.category_price = price;
    this.status = status;
    this.hasActiveContract = false; // Will be born with no active contract

    // ------------------------ //

    this.showCar = function () {
        const output = document.getElementById("htmlcarlist");
        const template = `
        <tr class="carrow">
        <td>${this.registration_plate}</td> 
        <td>${this.car_brand}</td> 
        <td>${this.car_model}</td> 
        <td>${this.category}</td> 
        <td>${this.persons}</td> 
        <td>${this.suitcases}</td> 
        <td>dkr. ${this.category_price},-</td> 
        <td>
        <select id="${this.registration_plate}" onchange="carlist.changeCarStatus('${this.registration_plate}', '${this.status}');">
            <option value="0" selected>Select an option:</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Dirty">Dirty</option>
            <option value="Ready">Ready</option>
        </select>
        </td>
        <td><button type="button" onclick="carlist.deleteCar('${this.registration_plate}', ${this.getHasActiveContract()})">Delete...</button></td>
        </tr>`;

        output.insertAdjacentHTML("beforeend", template);

        //Set current status
        const selectbox = document.getElementById(this.registration_plate);
        selectbox.value = this.status;

    }


    this.setHasActiveContract = function (status) {
        this.hasActiveContract = status;
    }

    this.getHasActiveContract = function () {
        return this.hasActiveContract;
    }

} // ------ End of car object constructor--------- //

// ------------- Customerlist object ------------- //

const Customerlist = function () {
    this.customers = [];

    this.registerCustomer = function (customerid, firstname, lastname, street, number, postalcode_city) {
        const customer = new Customerobject(customerid, firstname, lastname, street, number, postalcode_city);
        this.customers.push(customer);
    }

    this.showCustomerList = function () {
        const output = document.getElementById("htmlcustomerlist");
        output.innerHTML = ""; //Cleans output table
        for (const customer of this.customers) {
            customer.showCustomer();
        }

        if (this.customers.length === 0) { // If no customers on the list ...
            output.innerHTML = "<tr><td>No more customers to show</td></tr>";
        }

    }

    this.deleteCustomer = function (id, hasContract) {
        const ok = confirm("Do you really want to delete this customer ?");
        let index = 0; //Keep track of index in the customer object list
        const snackbar = document.getElementById("snackbar");
        if (ok && !hasContract) {
            for (const customer of this.customers) {
                if (customer.customer_id === id) {
                    this.customers.splice(index, 1); // Removes the customer from customer object list
                }
                index++; //Add 1 to index
            }
            this.showCustomerList();
            snackbar.innerHTML = "Customer id #" + id + " was deleted";
        } else {
            snackbar.innerHTML = "No customer was deleted. Either you canceled<br>or customer has an active rental contract.";
        }

        showSnackbar();
    }
}
// ---------------------------------------------- //

// ---------- Customer object ----------- //

const Customerobject = function (customerid, firstname, lastname, street, number, postalcode_city) {
    // ------CONSTRUCTOR ------ //
    // ------ Attributes ------ //
    this.customer_id = customerid;
    this.first_name = firstname;
    this.last_name = lastname;
    this.street = street;
    this.number = number;
    this.postal_code_city = postalcode_city;
    this.hasActiveContract = false; // Will be born with no active contract
    // ------------------------ //

    this.showCustomer = function () {
        const output = document.getElementById("htmlcustomerlist");
        const template = `
            <tr class="customerrow">
            <td>${this.customer_id}</td> 
            <td>${this.first_name}</td> 
            <td>${this.last_name}</td> 
            <td>${this.street}</td> 
            <td>${this.number}</td> 
            <td>${this.postal_code_city}</td> 
            <td><button type="button" onclick="customerlist.deleteCustomer(${this.customer_id}, ${this.getHasActiveContract()})">Delete...</button></td>
            </tr>`;

        output.insertAdjacentHTML("beforeend", template);

    }

    this.setHasActiveContract = function (status) {
        this.hasActiveContract = status;
    }

    this.getHasActiveContract = function () {
        return this.hasActiveContract;
    }

} // --------- End of customer object constructor ---------- //

// -------------- Contract list object -------------- //
const Contractlist = function () {
    this.contracts = [];

    this.registerContract = function (contractid, pickupdate, returndate, cost) {
        const contract = new Contractobject(contractid, pickupdate, returndate, cost);
        this.contracts.push(contract);
    }

    this.showContractList = function () {
        const output = document.getElementById("htmlcontractlist");
        output.innerHTML = ""; //Cleans output table
        for (const contract of this.contracts) {
            contract.showContract();
        }

        if (this.contracts.length === 0) { // If no contracts in the list ...
            output.innerHTML = "<tr><td>No more contracts to show</td></tr>";
        }

    }

    this.deleteContract = function (id) {
        const ok = confirm("Do you really want to delete this rental contract ?");
        let index = 0; //Keep track of index in the contract object list
        const snackbar = document.getElementById("snackbar");
        if (ok) {
            for (const contract of this.contracts) {
                if (contract.contract_id === id) {
                    contract.car.setHasActiveContract(false);
                    contract.customer.setHasActiveContract(false);
                    this.contracts.splice(index, 1); // Removes the contract from contract object list
                }
                index++; //Add 1 to index
            }
            this.showContractList();
            carlist.showCarList();
            customerlist.showCustomerList();
            snackbar.innerHTML = "Rental contract #" + id + " was deleted";
        } else {
            snackbar.innerHTML = "No rental contract was deleted";
        }

        showSnackbar();
    }


}
// -------------------------------------------------- //

// -------------- Contract object -------------- //
const Contractobject = function (contractid, pickupdate, returndate, cost) {
    // ------CONSTRUCTOR ------ //
    // ------ Attributes ------ //
    this.contract_id = contractid;
    this.customer = null; // Aggregation
    this.car = null; // Aggregation
    this.accessory_list = []; // Aggregation
    this.pickup_date = pickupdate;
    this.return_date = returndate;
    this.rental_cost = cost;
    // ------------------------ //

    this.showContract = function () {
        const output = document.getElementById("htmlcontractlist");
        let template = `
            <tr class="contractrow">
            <td>${this.contract_id}</td>
            <td class="tooltip">${this.customer.customer_id}<span class="tooltiptext">${this.customer.first_name}<br>${this.customer.last_name}</span></td>
            <td class="tooltip">${this.car.registration_plate}<span class="tooltiptext">${this.car.car_brand}<br>${this.car.car_model}</span></td><td>`
        
        for (const accessory of this.accessory_list) {
            template += `${accessory.item}, `
        }

        template += `</td><td>${this.pickup_date}</td> 
            <td>${this.return_date}</td>
            <td>dkr. ${this.rental_cost},-</td>  
            <td><button type="button" onclick="contractlist.deleteContract(${this.contract_id})">Delete...</button></td>
            </tr>`;

        output.insertAdjacentHTML("beforeend", template);

    }

} // --------- End of contract object constructor ---------- //

// --------------- Accessory object ------------ //
const Accessorylist = function () {
    this.accessories = [];

    this.registerAccessory = function (accessory_id, item) {
        const accessory = new Accessoryobject(accessory_id, item);
        this.accessories.push(accessory);
    }

    this.showAccessoryList = function () {
        const output = document.getElementById("htmlaccessorylist");
        output.innerHTML = ""; //Cleans output table
        for (const accessory of this.accessories) {
            accessory.showAccessory();
        }

        if (this.accessories.length === 0) { // If no accessories on the list ...
            output.innerHTML = "<tr><td>No more accessories to show</td></tr>";
        }

    }
}


// --------------- Accessory object ------------ //
const Accessoryobject = function (accessoryid, item) {
    // ------CONSTRUCTOR ------ //
    // ------ Attributes ------ //
    this.accessory_id = accessoryid;
    this.item = item;
    // ------------------------ //

    this.showAccessory = function () {
        const output = document.getElementById("htmlaccessorylist");
        const template = `
            <tr>
            <td>${this.accessory_id}</td> 
            <td>${this.item}</td> 
            </tr>`;

        output.insertAdjacentHTML("beforeend", template);

    }

} // --------- End of accessory object constructor ---------- //