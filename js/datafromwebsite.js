const carlist = []; // Defining carlist as a global array
const customerlist = []; // Defining cutomerlist as a global array
const accessorylist = []; // Defining accessorylist as a global array
const contractlist = []; // Defining rental contracts list as a global array

fetch("json/cars.json") // -------- Fetching cars from cars.json -------- //
    .then(function (data) {
        return data.json();
    })
    .then(function (post) {
        let index=0;
        for (const car of post.carlist) {
            carlist.push(new Carobject(car.reg_plate, car.brand, car.model, car.category, car.persons, car.suitcases, car.supplement, car.status));
            carlist[index].setHasActiveContract(true);
            index++;
        }
        Carobject.showCarList();

        fetch("json/customers.json") // -------- Fetching customers from customer.json -------- //
            .then(function (data) {
                return data.json();
            })
            .then(function (post) {
                let index=0;
                for (const customer of post.customerlist) {
                    customerlist.push(new Customerobject(customer.Customer_id, customer.Firstname, customer.Lastname, customer.Street, customer.Number, customer.Postalcode_city));
                    customerlist[index].setHasActiveContract(true);
                    index++;
                }
                Customerobject.showCustomerList();

                fetch("json/accessories.json") // -------- Fetching accessories from accessories.json -------- //
                    .then(function (data) {
                        return data.json();
                    })
                    .then(function (post) {
                        for (const accessory of post.accessorylist) {
                            accessorylist.push(new Accessoryobject(accessory.accessory_id, accessory.item));
                        }
                        Accessoryobject.showAccessoryList();
                        fetch("json/contracts.json") // -------- Fetching rental contract from contracts.json -------- //
                            .then(function (data) {
                                return data.json();
                            })
                            .then(function (post) {
                                let index = 0;
                                for (const contract of post.contractlist) {
                                    contractlist.push(new Contractobject(contract.contract_id, contract.pickup_date, contract.return_date, contract.rental_cost));

                                    // Aggregation examples
                                    contractlist[index].customer = customerlist[index];
                                    contractlist[index].car = carlist[index];
                                    contractlist[index].accessory_list.push(accessorylist[index]);
                                    contractlist[index].accessory_list.push(accessorylist[index + 1]);
                                    index++;
                                }
                                Contractobject.showContractList();
                            })
                    })
            })

    })
    .catch(function (error) {
        alert("Service is not available");
    })

