// ------------------ Carlist object ------------------ //
const Carlist = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class CarlistClass {
        constructor() {
            const cars = {
                cars: []
            };
            priv.set(this, cars);
        }

        registerCar(plate, brand, model, category, persons, suitcases, price, status) {
            const car = new Carobject(plate, brand, model, category, persons, suitcases, price, status);
            _(this).cars.push(car);
            return car; // for aggregation
        }

        showCarList() {
            const output = document.getElementById("htmlcarlist");
            output.innerHTML = ""; //Cleans output table
            for (const car of _(this).cars) {
                car.showCar();
            }

            if (_(this).cars.length === 0) { // If no cars on the list ...
                output.innerHTML = "<tr><td>No more cars to show</td></tr>";
            }
        }

        deleteCar(id, hasContract) {
            const doesNotExist = -1;
            const ok = confirm("Do you really want to delete this car ?");
            let index = 0; //Keep track of index in the car object list
            const snackbar = document.getElementById("snackbar");
            if (ok && !hasContract) {
                for (const car of _(this).cars) {
                    if (car.registrationPlate === id) {
                        _(this).cars.splice(index, 1); // Removes the car from car object list
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

        changeCarStatus(id, oldStatus) { // Skal overføres til Carobjekt
            const validStatus = ["Cleaning", "Dirty", "Ready"];
            const newStatus = document.getElementById(id).value;
            const snackbar = document.getElementById("snackbar");
            if (validStatus.indexOf(newStatus) !== -1) { // if new status is valid
                for (const car of _(this).cars) {
                    if (car.registrationPlate === id) {
                        car.status = newStatus;
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
            this.showCarList();
        }

        // Returns index position in carlist for a given car (by its plate)
        // If the car does not exist - return -1
        doesCarExist(plate) {
            const doesNotExist = -1;
            let index = 0;
            for (const car of _(this).cars) {
                if (car.registrationPlate === plate) {
                    return index;
                }
                index++;
            }
            return doesNotExist;
        }

    }

    return CarlistClass;

}());
// ---------------------------------------------- //


// --------------- Car object ---------------- //
const Carobject = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class CarobjectClass {
        constructor(plate, brand, model, category, persons, suitcases, price, status) {
            const attributes = {
                registration_plate: plate,
                car_brand: brand,
                car_model: model,
                category: category,
                persons: persons,
                suitcases: suitcases,
                category_price: price,
                status: status,
                activeContract: false // Will be born with no active contract
            }

            priv.set(this, attributes);
        }

        showCar() {
            const output = document.getElementById("htmlcarlist");
            const template = `
        <tr class="carrow">
        <td>${_(this).registration_plate}</td> 
        <td>${_(this).car_brand}</td> 
        <td>${_(this).car_model}</td> 
        <td>${_(this).category}</td> 
        <td>${_(this).persons}</td> 
        <td>${_(this).suitcases}</td> 
        <td>dkr. ${_(this).category_price},-</td> 
        <td>
        <select id="${_(this).registration_plate}" onchange="carlist.changeCarStatus('${_(this).registration_plate}', '${_(this).status}');">
            <option value="0" selected>Select an option:</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Dirty">Dirty</option>
            <option value="Ready">Ready</option>
        </select>
        </td>
        <td><button type="button" onclick="carlist.deleteCar('${_(this).registration_plate}', ${this.hasActiveContract})">Delete...</button></td>
        </tr>`;

            output.insertAdjacentHTML("beforeend", template);

            //Set current status
            const selectbox = document.getElementById(_(this).registration_plate);
            selectbox.value = _(this).status;

        }

        set hasActiveContract(status) {
            _(this).activeContract = status;
        }

        get hasActiveContract() {
            return _(this).activeContract;
        }

        get registrationPlate() {
            return _(this).registration_plate;
        }

        set status(value) {
            _(this).status = value;
        }

        get carBrand() {
            return _(this).car_brand;
        }

        get carModel() {
            return _(this).car_model;
        }
    }

    return CarobjectClass;

}());

// ---------------------------------------------- //

// ------------- Customerlist object ------------- //
const Customerlist = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class CustomerlistClass {
        constructor() {
            const customers = {
                customers: []
            };
            priv.set(this, customers);
        }

        registerCustomer(customerid, firstname, lastname, street, number, postalcode_city) {
            const customer = new Customerobject(customerid, firstname, lastname, street, number, postalcode_city);
            _(this).customers.push(customer);
            return customer; // for aggregation
        }

        showCustomerList() {
            const output = document.getElementById("htmlcustomerlist");
            output.innerHTML = ""; //Cleans output table
            for (const customer of _(this).customers) {
                customer.showCustomer();
            }

            if (_(this).customers.length === 0) { // If no customers on the list ...
                output.innerHTML = "<tr><td>No more customers to show</td></tr>";
            }
        }

        deleteCustomer(id, hasContract) {
            const ok = confirm("Do you really want to delete this customer ?");
            let index = 0; //Keep track of index in the customer object list
            const snackbar = document.getElementById("snackbar");
            if (ok && !hasContract) {
                for (const customer of _(this).customers) {
                    if (customer.customerId === id) {
                        _(this).customers.splice(index, 1); // Removes the customer from customer object list
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

    return CustomerlistClass;

}());
// ---------------------------------------------- //

// ---------- Customer object ----------- //
const Customerobject = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class CustomerobjectClass {
        constructor(customerid, firstname, lastname, street, number, postalcode_city) {
            const customer = {
                customer_id: customerid,
                first_name: firstname,
                last_name: lastname,
                street: street,
                number: number,
                postal_code_city: postalcode_city,
                activeContract: false // Will be born with no active contract
            };
            priv.set(this, customer);
        }

        showCustomer() {
            const output = document.getElementById("htmlcustomerlist");
            const template = `
            <tr class="customerrow">
            <td>${_(this).customer_id}</td> 
            <td>${_(this).first_name}</td> 
            <td>${_(this).last_name}</td> 
            <td>${_(this).street}</td> 
            <td>${_(this).number}</td> 
            <td>${_(this).postal_code_city}</td> 
            <td><button type="button" onclick="customerlist.deleteCustomer(${_(this).customer_id}, ${this.hasActiveContract})">Delete...</button></td>
            </tr>`;

            output.insertAdjacentHTML("beforeend", template);

        }

        set hasActiveContract(status) {
            _(this).activeContract = status;
        }

        get hasActiveContract() {
            return _(this).activeContract;
        }

        get customerId() {
            return _(this).customer_id;
        }

        get firstName() {
            return _(this).first_name;
        }

        get lastName() {
            return _(this).last_name;
        }

    }

    return CustomerobjectClass;

}());
// --------------------------------- //

// -------------- Contract list object -------------- //
const Contractlist = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class ContractlistClass {
        constructor() {
            const contracts = {
                contracts: []
            }

            priv.set(this, contracts);
        }

        registerContract(contractid, pickupdate, returndate, cost, customer, car, accessories) {
            const contract = new Contractobject(contractid, pickupdate, returndate, cost, customer, car, accessories);
            _(this).contracts.push(contract);
        }

        showContractList() {
            const output = document.getElementById("htmlcontractlist");
            output.innerHTML = ""; //Cleans output table
            for (const contract of _(this).contracts) {
                contract.showContract();
            }

            if (_(this).contracts.length === 0) { // If no contracts in the list ...
                output.innerHTML = "<tr><td>No more contracts to show</td></tr>";
            }

        }

        deleteContract(id) {
            const ok = confirm("Do you really want to delete this rental contract ?");
            let index = 0; //Keep track of index in the contract object list
            const snackbar = document.getElementById("snackbar");
            if (ok) {

                for (const contract of _(this).contracts) {
                    if (contract.contractId === id) {
                        contract.car.hasActiveContract = false;
                        contract.customer.hasActiveContract = false;
                        _(this).contracts.splice(index, 1); // Removes the contract from contract object list
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

    return ContractlistClass;

}());
// -------------------------------------------------- //

// -------------- Contract object -------------- //

const Contractobject = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class ContractobjectClass {
        constructor(contractid, pickupdate, returndate, cost, customer, car, accessories) {
            const attributes = {
                contract_id: contractid,
                accessory_list: accessories, // Aggregation
                pickup_date: pickupdate,
                return_date: returndate,
                rental_cost: cost
            }

            priv.set(this, attributes);
            
            // P U B L I C attributes
            this.customer = customer; // Aggregation
            this.car = car; // Aggregation
        }

        get contractId() {
            return _(this).contract_id;
        }

        showContract() {
            const output = document.getElementById("htmlcontractlist");
            let template = `
            <tr class="contractrow">
            <td>${_(this).contract_id}</td>
            <td class="tooltip">${this.customer.customerId}<span class="tooltiptext">${this.customer.firstName}<br>${this.customer.lastName}</span></td>
            <td class="tooltip">${this.car.registrationPlate}<span class="tooltiptext">${this.car.carBrand}<br>${this.car.carModel}</span></td><td>`

            for (const accessory of _(this).accessory_list) {
                template += `${accessory.item}, `
            }

            template += `</td><td>${_(this).pickup_date}</td> 
            <td>${_(this).return_date}</td>
            <td>dkr. ${_(this).rental_cost},-</td>  
            <td><button type="button" onclick="contractlist.deleteContract(${_(this).contract_id})">Delete...</button></td>
            </tr>`;

            output.insertAdjacentHTML("beforeend", template);

        }
    }
    return ContractobjectClass;

}());
// ------------------------------------------- //

// --------------- Accessory list object ------------ //
const Accessorylist = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class AccessorylistClass {
        constructor() {
            const accessories = {
                accessories: []
            };
            priv.set(this, accessories);
        }

        registerAccessory(accessory_id, item) {
            const accessory = new Accessoryobject(accessory_id, item);
            _(this).accessories.push(accessory);
        }

        showAccessoryList() {
            const output = document.getElementById("htmlaccessorylist");
            output.innerHTML = ""; //Cleans output table
            for (const accessory of _(this).accessories) {
                accessory.showAccessory();
            }

            if (_(this).accessories.length === 0) { // If no accessories on the list ...
                output.innerHTML = "<tr><td>No more accessories to show</td></tr>";
            }

        }
    }
    return AccessorylistClass;

}());

// ---------------------------------------- //

// --------------- Accessory object ------------ //

const Accessoryobject = (function () {
    "use strict";
    const priv = new WeakMap();
    const _ = function (instance) {
        return priv.get(instance);
    };

    class AccessoryobjectClass {
        constructor(accessoryid, item) {
            const accessory = {
                accessory_id: accessoryid,
                item: item
            };
            priv.set(this, accessory);
        }

        // ------------------------ //

        showAccessory() {
            const output = document.getElementById("htmlaccessorylist");
            const template = `
            <tr>
            <td>${_(this).accessory_id}</td> 
            <td>${_(this).item}</td> 
            </tr>`;

            output.insertAdjacentHTML("beforeend", template);

        }
    }

    return AccessoryobjectClass;

}());
// ---------------------------------------- //