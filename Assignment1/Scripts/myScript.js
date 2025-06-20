//Load drivers to table from local storage
function renderDrivers() {
    var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    var table = document.getElementById('myTable');
    // Remove all rows except the header
    while (table.rows.length > 1) table.deleteRow(1);

    drivers.forEach(function (driver) {
        var row = table.insertRow();
        row.id = "driver-" + driver.Id; // Set unique ID for the row
        //row.insertCell(0).innerHTML = `<img src="${driver.Image || driver.image || 'https://via.placeholder.com/40'}" alt="Driver" />`;
        // Determine the image source
        var imgValue = driver.Image || driver.image || '';
        var imgSrc = '';
        if (imgValue === 'Male.png' || imgValue === 'Female.png') {
            imgSrc = '/Images/' + imgValue; // Adjust path if needed
        } else if (imgValue) {
            imgSrc = imgValue;
        } else {
            imgSrc = 'https://via.placeholder.com/40';
        }
        row.insertCell(0).innerHTML = `<img src="${imgSrc}" alt="Driver" style="width:40px;height:40px;border-radius:50%;">`;
        row.insertCell(1).innerText = driver.FirstName || driver.firstName || '';
        row.insertCell(2).innerText = driver.LastName || driver.lastName || '';
        row.insertCell(3).innerText = driver.PhoneNumber || driver.phoneNumber || '';
        row.insertCell(4).innerText = driver.Service || driver.service || '';
        row.insertCell(5).innerHTML = `<button onclick="showUpdateDriverModal('${driver.PhoneNumber || driver.phoneNumber}')">Update</button>
        <button onclick="deleteDriverByPhone('${driver.PhoneNumber || driver.phoneNumber}')">Delete</button>`;
    });
}

// Call this function when the page loads
window.onload = renderDrivers;

// Function to delete a driver from the table and local storage
function deleteDriver(btn) {
    var row = btn.parentNode.parentNode;
    var rowIndex = row.rowIndex - 1; // Subtract 1 for the header
    var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    drivers.splice(rowIndex, 1);
    localStorage.setItem('drivers', JSON.stringify(drivers));
    renderDrivers();
}

function deleteDriverByPhone(phoneNumber) {
    var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    // Remove the driver with the matching phone number
    drivers = drivers.filter(function (driver) {
        return (driver.PhoneNumber || driver.phoneNumber) !== phoneNumber;
    });
    localStorage.setItem('drivers', JSON.stringify(drivers));
    renderDrivers();
}


function showUpdateDriverModal(phoneNumber) {
    var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    var driver = drivers.find(function (d) {
        return (d.PhoneNumber || d.phoneNumber) === phoneNumber;
    });
    if (!driver) return;

    // Fill modal fields
    document.getElementById('gender').value = driver.Gender || driver.gender || '';
    document.getElementById('firstName').value = driver.FirstName || driver.firstName || '';
    document.getElementById('lastName').value = driver.LastName || driver.lastName || '';
    document.getElementById('phoneNumber').value = driver.PhoneNumber || driver.phoneNumber || '';
    document.getElementById('service').value = driver.Service || driver.service || '';

    // Change modal title and button
    document.getElementById('addDriverModalLabel').innerText = 'Update Driver';
    var saveBtn = document.getElementById('saveDriverBtn');
    saveBtn.innerText = 'Update Driver';

    // Set a flag or data attribute to indicate update mode
    saveBtn.setAttribute('data-update-phone', phoneNumber);

    // Show modal (Bootstrap 5)
    var modal = new bootstrap.Modal(document.getElementById('addDriverModal'));
    modal.show();
}

//Create new driver
document.addEventListener('DOMContentLoaded', function () {
    var saveBtn = document.getElementById('saveDriverBtn');
    if (!saveBtn) return;

    saveBtn.onclick = function () {
        var gender = document.getElementById('gender').value;
        var firstName = document.getElementById('firstName').value.trim();
        var lastName = document.getElementById('lastName').value.trim();
        var phoneNumber = document.getElementById('phoneNumber').value.trim();
        var service = document.getElementById('service').value;

        // Validate
        if (!gender || !firstName || !lastName || !phoneNumber || !service) {
            alert('Please fill in all fields.');
            return;
        }

        // Set image based on gender
        var image = gender === "Male" ? "Male.png" : gender === "Female" ? "Female.png" : "https://via.placeholder.com/40";

        // Get existing drivers
        var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
        var updatePhone = saveBtn.getAttribute('data-update-phone');

        if (updatePhone) {
            // Update existing driver
            var driver = drivers.find(function (d) {
                return (d.PhoneNumber || d.phoneNumber) === updatePhone;
            });
            if (driver) {
                driver.Gender = gender;
                driver.FirstName = firstName;
                driver.LastName = lastName;
                driver.PhoneNumber = phoneNumber;
                driver.Service = service;
                // Optionally update image if gender changed
                driver.Image = gender === "Male" ? "Male.png" : gender === "Female" ? "Female.png" : "https://via.placeholder.com/40";
            }
        } else {
            // Add new driver (existing logic)
            if (drivers.some(function (d) { return (d.phoneNumber || d.PhoneNumber) === phoneNumber; })) {
                alert('A driver with this phone number already exists.');
                return;
            }
            drivers.push({
                gender: gender,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                service: service,
                image: gender === "Male" ? "Male.png" : gender === "Female" ? "Female.png" : "https://via.placeholder.com/40"
            });
        }

        // Save and re-render
        localStorage.setItem('drivers', JSON.stringify(drivers));
        if (typeof renderDrivers === "function") renderDrivers();

        // Reset modal
        document.getElementById('addDriverModalLabel').innerText = 'Add Driver';
        saveBtn.innerText = 'Save Driver';
        saveBtn.removeAttribute('data-update-phone');
        document.getElementById('driverForm').reset();
        document.getElementById('phoneNumber').value = "+27 ";

        // Hide the modal (Bootstrap 5)
        var modal = bootstrap.Modal.getInstance(document.getElementById('addDriverModal'));
        if (modal) modal.hide();

        // Clear form
        document.getElementById('driverForm').reset();
        document.getElementById('phoneNumber').value = "+27 ";
    };


    // SEARCH TABLE
    var searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            var searchName = document.getElementById('searchName').value.trim().toLowerCase();
            var searchService = document.getElementById('searchService').value;
            var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
            var table = document.getElementById('myTable');

            // Remove all rows except the header
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }

            // Filter drivers by name and service
            var filteredDrivers = drivers.filter(function (driver) {
                var nameMatch = (driver.FirstName || driver.firstName || '').toLowerCase().includes(searchName) ||
                    (driver.LastName || driver.lastName || '').toLowerCase().includes(searchName);
                var serviceMatch = !searchService || (driver.Service || driver.service) === searchService;
                return nameMatch && serviceMatch;
            });

            // Add filtered rows to the table (with image and delete button)
            filteredDrivers.forEach(function (driver) {
                var row = table.insertRow();
                row.id = "driver-" + (driver.Id || driver.FirstName + driver.LastName);

                // Determine the image source
                var imgValue = driver.Image || driver.image || '';
                var imgSrc = '';
                if (imgValue === 'Male.png' || imgValue === 'Female.png') {
                    imgSrc = '/Images/' + imgValue;
                } else if (imgValue) {
                    imgSrc = imgValue;
                } else {
                    imgSrc = 'https://via.placeholder.com/40';
                }
                row.insertCell(0).innerHTML = `<img src="${imgSrc}" alt="Driver" style="width:40px;height:40px;border-radius:50%;">`;
                row.insertCell(1).innerText = driver.FirstName || driver.firstName || '';
                row.insertCell(2).innerText = driver.LastName || driver.lastName || '';
                row.insertCell(3).innerText = driver.PhoneNumber || driver.phoneNumber || '';
                row.insertCell(4).innerText = driver.Service || driver.service || '';
                row.insertCell(5).innerHTML = `<button onclick="showUpdateDriverModal('${driver.PhoneNumber || driver.phoneNumber}')">Update</button>
                <button onclick="deleteDriverByPhone('${driver.PhoneNumber || driver.phoneNumber}')">Delete</button>`;
            });

            document.getElementById('searchName').value = '';
            document.getElementById('searchService').value = '';

        });
    }

    


});

//Render Vehicles from local storage
function renderVehicles() {
    var vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    var table = document.getElementById('myVehicle');
    // Remove all rows except the header
    while (table.rows.length > 1) table.deleteRow(1);

    vehicles.forEach(function (vehicle) {
        var row = table.insertRow();
        // Image
        var imgValue = vehicle.Image;
        var imgSrc = '';

        imgSrc = "/Images/"+imgValue;
       // if (imgValue === 'Ambulance1.jpeg' || imgValue === 'Ambulance2.jpg') {
       //     imgSrc = '/Images/' + imgValue;
       // }//} else if (imgValue) {
       // //    imgSrc = imgValue;
       // //} else {
       // //    imgSrc = 
       //// }
        row.insertCell(0).innerHTML = `<img src="${imgSrc}" alt="Vehicle" style="width:40px;height:40px;border-radius:50%;">`;
        // Type
        row.insertCell(1).innerText = vehicle.Type || vehicle.type || '';
        // Registration
        row.insertCell(2).innerText = vehicle.Registration || vehicle.registration || '';
        // Service
        row.insertCell(3).innerText = vehicle.Service || vehicle.service || '';
        // Controls (add buttons as needed)
        row.insertCell(4).innerHTML = `  <button onclick="showUpdateVehicleModal('${vehicle.Registration || vehicle.registration}')">Update</button>
        <button onclick="deleteVehicle('${vehicle.Registration || vehicle.registration}')">Delete</button>`;
    });
}
window.onload = function () {
    renderDrivers();
    renderVehicles();
};

//Delete vehicles

function deleteVehicle(registration) {
    var vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    vehicles = vehicles.filter(function (v) {
        return (v.Registration || v.registration) !== registration;
    });
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    renderVehicles();
}

// Create new vehicle

document.addEventListener('DOMContentLoaded', function () {
    var saveVehicleBtn = document.getElementById('saveVehicleBtn');
    if (!saveVehicleBtn) return;

    saveVehicleBtn.onclick = function () {
        var type = document.getElementById('vehicleType').value.trim();
        var registration = document.getElementById('vehicleRegistration').value.trim().toUpperCase();
        var registrationPattern = /^[A-Za-z]{3}[0-9]{3}$/;
        var service = document.getElementById('vehicleService').value;
        var image = "Ambulance1.jpeg"; // Or use a field if you have one

        if (!type || !registration || !service) {
            alert('Please fill in all fields.');
            return;
        }

        if (!registrationPattern.test(registration)) {
            alert('Registration must be exactly 6 characters: 3 letters followed by 3 numbers (e.g., ABC123).');
            return;
        }

        document.getElementById('vehicleRegistration').addEventListener('input', function (e) {
            this.value = this.value.toUpperCase();
        });

        var vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
        var updateRegistration = saveVehicleBtn.getAttribute('data-update-registration');

        if (updateRegistration) {
            // Update existing vehicle
            var vehicle = vehicles.find(function (v) {
                return (v.Registration || v.registration) === updateRegistration;
            });
            if (vehicle) {
                vehicle.Type = type;
                vehicle.Registration = registration;
                vehicle.Service = service;
                vehicle.Image = image;
            }
        } else {
            // Add new vehicle
            if (vehicles.some(function (v) { return (v.Registration || v.registration) === registration; })) {
                alert('A vehicle with this registration already exists.');
                return;
            }
            vehicles.push({
                Type: type,
                Registration: registration,
                Service: service,
                Image: image
            });
        }

        localStorage.setItem('vehicles', JSON.stringify(vehicles));
        renderVehicles();

        // Reset modal
        document.getElementById('addVehicleModalLabel').innerText = 'Add Vehicle';
        saveVehicleBtn.innerText = 'Save Vehicle';
        saveVehicleBtn.removeAttribute('data-update-registration');
        document.getElementById('vehicleForm').reset();

        // Hide modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('addVehicleModal'));
        if (modal) modal.hide();

        // Clear form
        document.getElementById('vehicleForm').reset();
    };


});

// updating a vehicle

function showUpdateVehicleModal(registration) {
    var vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    var vehicle = vehicles.find(function (v) {
        return (v.Registration || v.registration) === registration;
    });
    if (!vehicle) return;

    // Fill modal fields
    document.getElementById('vehicleType').value = vehicle.Type || vehicle.type || '';
    document.getElementById('vehicleRegistration').value = vehicle.Registration || vehicle.registration || '';
    document.getElementById('vehicleService').value = vehicle.Service || vehicle.service || '';

    // Change modal title and button
    document.getElementById('addVehicleModalLabel').innerText = 'Update Vehicle';
    var saveBtn = document.getElementById('saveVehicleBtn');
    saveBtn.innerText = 'Update Vehicle';

    // Set a flag or data attribute to indicate update mode
    saveBtn.setAttribute('data-update-registration', registration);

    // Show modal (Bootstrap 5)
    var modal = new bootstrap.Modal(document.getElementById('addVehicleModal'));
    modal.show();
}

//Export vehicle
document.addEventListener('DOMContentLoaded', function () {
    var exportBtn = document.getElementById('exportVehicleBtn');
    if (!exportBtn) return;

    exportBtn.onclick = function () {
        var vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
        if (!vehicles.length) {
            alert('No vehicles to export.');
            return;
        }

        // Prepare plain text: header + each vehicle on a new line, tab-separated
        var lines = ['Type\tRegistration\tService'];
        vehicles.forEach(function (v) {
            var type = (v.Type || v.type || '').replace(/\t/g, ' ');
            var reg = (v.Registration || v.registration || '').replace(/\t/g, ' ');
            var service = (v.Service || v.service || '').replace(/\t/g, ' ');
            lines.push(`${type}\t${reg}\t${service}`);
        });
        var text = lines.join('\n');

        // Create a Blob and trigger download
        var blob = new Blob([text], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = 'vehicles.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
});






////Add to repository
//$('#saveDriverBtn').on('click', function () {
//    var driver = {
//        Image: $('#gender').val() === "Male" ? "Male.png" : "Female.png",
//        FirstName: $('#firstName').val(),
//        LastName: $('#lastName').val(),
//        PhoneNumber: $('#phoneNumber').val(),
//        Service: $('#service').val()
//    };

//    $.ajax({
//        url: '/Home/AddDriver',
//        type: 'POST',
//        data: JSON.stringify(driver),
//        contentType: 'application/json',
//        success: function (response) {
//            if (response.success) {
//                // Optionally update the table or reload the page
//                location.reload();
//            }
//        }
//    });
//});





































//function service() {

//    /*document.getElementsByClassName("serviceName").innerHTML = "This is a service function.";*/

//    var serviceName = new serviceName();
//    var serviceId = document.getElementById("serviceId").value;

//    switch (serviceName) {
//        case 0: serviceId = "Advanced Life Support"; break;
//        case 1: serviceId = "Basic Life Support"; break;
//        case 2: serviceId = "Patient Transport"; break;
//        case 3: serviceId = "Medical Utility Vehicle"; break;
//        case 4: serviceId = "Event Medical Ambulance"; break;
//        case 5: serviceId = "Air Ambulance"; break;
//    }


//   /* var serviceName = document.getElementById("serviceName").value;

//    /*return "This is a service function.";*/
//}

//// Hardcoded driver data to add each run
//var newDrivers = [
//    {
//        image: "https://via.placeholder.com/40",
//        firstName: "John",
//        lastName: "Doe",
//        phoneNumber: "023-456-7890",
//        service: "ALS"
//    },
//    {
//        image: "https://via.placeholder.com/40",
//        firstName: "Jane",
//        lastName: "Smith",
//        phoneNumber: "987-654-3210",
//        service: "BLS"
//    }
//];

//// Get existing drivers or start with an empty array
//var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');

//// Add only drivers that do not already exist (by phoneNumber)
//newDrivers.forEach(function (newDriver) {
//    var exists = drivers.some(function (driver) {
//        return driver.phoneNumber === newDriver.phoneNumber;
//    });
//    if (!exists) {
//        drivers.push(newDriver);
//    }
//});

//// Save back to local storage
//localStorage.setItem('drivers', JSON.stringify(drivers));

//// Only set if not already present
//if (!localStorage.getItem('drivers')) {
//    localStorage.setItem('drivers', JSON.stringify(initialDrivers));
//}

//function renderDrivers() {
//    var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
//    var table = document.getElementById('myTable');
//    // Remove all rows except the header
//    while (table.rows.length > 1) table.deleteRow(1);

//    drivers.forEach(function (driver) {
//        var row = table.insertRow();
//        row.insertCell(0).innerHTML = `<img src="${driver.image}" alt="Driver" />`;
//        row.insertCell(1).innerText = driver.firstName;
//        row.insertCell(2).innerText = driver.lastName;
//        row.insertCell(3).innerText = driver.phoneNumber;
//        row.insertCell(4).innerText = driver.service;
//        //row.incertCell(5).innerHTML = `<button onclick="updateDriver(this)">Update</button>`;
//        row.insertCell(5).innerHTML = `<button onclick="deleteDriver(this)">Delete</button>`;
//    });
//}

//window.onload = renderDrivers;

//function deleteDriver(btn) {
//    // Get the row index of the button's parent row
//    var row = btn.parentNode.parentNode;
//    var rowIndex = row.rowIndex - 1; // Subtract 1 to account for the header row

//    // Get current drivers from local storage
//    var drivers = JSON.parse(localStorage.getItem('drivers') || '[]');

//    // Remove the driver at the row index
//    drivers.splice(rowIndex, 1);

//    // Save the updated array back to local storage
//    localStorage.setItem('drivers', JSON.stringify(drivers));

//    // Re-render the table
//    renderDrivers();
//}