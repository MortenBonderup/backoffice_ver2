const carlist = new Carlist(); // Defining carlist as a global object array
const customerlist = new Customerlist(); // Defining cutomerlist as a global object array
const accessorylist = new Accessorylist(); // Defining accessorylist as a global object array
const contractlist = new Contractlist(); // Defining rental contracts list as a global object array
let carobj = []; // for aggregation
let custobj = []; // for aggregation

fetch("json/cars.json") // -------- Fetching cars from cars.json -------- //
    .then(function (data) {
        return data.json();
    })
    .then(function (post) {
        let index = 0;
        for (const car of post.carlist) {
            carobj[index] = carlist.registerCar(car.reg_plate, car.brand, car.model, car.category, car.persons, car.suitcases, car.supplement, car.status);
             // for aggregation
            if (index < 3) {
                carobj[index].hasActiveContract = true; // Simulate that car has contract
                index++;
            }
        }
        carlist.showCarList();

        fetch("json/customers.json") // -------- Fetching customers from customer.json -------- //
            .then(function (data) {
                return data.json();
            })
            .then(function (post) {
                let index = 0;
                for (const customer of post.customerlist) {
                    custobj[index] = customerlist.registerCustomer(customer.Customer_id, customer.Firstname, customer.Lastname, customer.Street, customer.Number, customer.Postalcode_city);
                    if (index < 3) {
                        custobj[index].hasActiveContract = true;
                        index++;
                    }
                }
                customerlist.showCustomerList();

                fetch("json/accessories.json") // -------- Fetching accessories from accessories.json -------- //
                    .then(function (data) {
                        return data.json();
                    })
                    .then(function (post) {
                        for (const accessory of post.accessorylist) {
                            accessorylist.registerAccessory(accessory.accessory_id, accessory.item);
                        }
                        accessorylist.showAccessoryList();
                        fetch("json/contracts.json") // -------- Fetching rental contract from contracts.json -------- //
                            .then(function (data) {
                                return data.json();
                            })
                            .then(function (post) {
                                let index = 0;
                                for (const contract of post.contractlist) {
                                    contractlist.registerContract(contract.contract_id, contract.pickup_date, contract.return_date, contract.rental_cost, custobj[index], carobj[index], contract.accessorylist);
                                    index++;
                                }
                                contractlist.showContractList();
                            })
                    })
            })

    })
    .catch(function (error) {
        alert("Service is not available");
    })