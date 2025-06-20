using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assignment1.Models
{
	public class DriverRepository
	{
		public static List<Driver> Drivers = new List<Driver>
        {
            new Driver { Image = "Male.png", FirstName = "John", LastName = "Doe", PhoneNumber = "+27 82 136 4985" , Service = "ALS(Advanced Life Support)" },
            new Driver { Image = "Female.png", FirstName = "Jane", LastName = "Smith", PhoneNumber = "+27 83 795 3489",  Service = "BLS(Basic Life Support)" },
            new Driver { Image = "Male.png", FirstName = "Mike", LastName = "Johnson", PhoneNumber = "+27 83 279 4685",  Service = "Patient Transport" },
            new Driver { Image = "Female.png", FirstName = "Emily", LastName = "Davis", PhoneNumber = "+27 83 654 2633",  Service = "Event Medical Ambulance" },
            new Driver { Image = "Female.png", FirstName = "Sarah", LastName = "Brown", PhoneNumber = "+27 82 159 3574",  Service = "ALS(Advanced Life Support)" },
            new Driver { Image = "Male.png", FirstName = "David", LastName = "Wilson", PhoneNumber = "+27 82 746 3679",  Service = "Medical Utility Vehicle" },
            new Driver { Image = "Male.png", FirstName = "Chris", LastName = "Garcia", PhoneNumber = "+27 83 354 9813",  Service = "Air Ambulance" },
            new Driver { Image = "Male.png", FirstName = "James", LastName = "Martinez", PhoneNumber = "+27 75 349 7612",  Service = "BLS(Basic Life Support)" },
            new Driver { Image = "Female.png", FirstName = "Laura", LastName = "Lopez", PhoneNumber = "+27 75 309 2816",  Service = "Patient Transport" },
            new Driver { Image = "Male.png", FirstName = "Robert", LastName = "Hernandez", PhoneNumber = "+27 89 076 2577",  Service = "Event Medical Ambulance" },

            // new Driver { Image = "Male.png", FirstName = "John", LastName = "Doe", PhoneNumber = "+27 82 136 4985" , Service = "ALS" },
            //new Driver { Image = "Female.png", FirstName = "Jane", LastName = "Smith", PhoneNumber = "+27 83 795 3489",  Service = "ALS" },
            //new Driver { Image = "Male.png", FirstName = "Mike", LastName = "Johnson", PhoneNumber = "+27 83 279 4685",  Service = "BLS" },
            //new Driver { Image = "Female.png", FirstName = "Emily", LastName = "Davis", PhoneNumber = "+27 83 654 2633",  Service = "BLS" },
            //new Driver { Image = "Female.png", FirstName = "Sarah", LastName = "Brown", PhoneNumber = "+27 82 159 3574",  Service = "ALS" },
            //new Driver { Image = "Male.png", FirstName = "David", LastName = "Wilson", PhoneNumber = "+27 82 746 3679",  Service = "BLS" },
            //new Driver { Image = "Male.png", FirstName = "Chris", LastName = "Garcia", PhoneNumber = "+27 83 354 9813",  Service = "ALS" },
            //new Driver { Image = "Male.png", FirstName = "James", LastName = "Martinez", PhoneNumber = "+27 75 349 7612",  Service = "BLS" },
            //new Driver { Image = "Female.png", FirstName = "Laura", LastName = "Lopez", PhoneNumber = "+27 75 309 2816",  Service = "ALS" },
            //new Driver { Image = "Male.png", FirstName = "Robert", LastName = "Hernandez", PhoneNumber = "+27 89 076 2577",  Service = "BLS" },

        };

        public static List<Driver> GetAllDrivers()
        {
            return Drivers;
        }

    }
}