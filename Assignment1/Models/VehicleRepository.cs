using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Assignment1.Models
{
	public class VehicleRepository
	{
        public static List<Vehicle> Vehicles = new List<Vehicle>
        {
            new Vehicle { Image = "Ambulance1.jpeg", Type = "Type1", Registration = "ABC123", Service = "ALS(Advanced Life Support)" },
            new Vehicle { Image = "Ambulance2.jpg", Type = "Type2", Registration = "LFD672", Service= "ALS(Advanced Life Support)"},
            new Vehicle { Image = "Ambulance1.jpeg", Type = "Type1", Registration = "XYZ456", Service = "BLS(Basic Life Support)" },
            new Vehicle { Image = "Ambulance2.jpg", Type = "Type2", Registration = "VED556", Service= "BLS(Basic Life Support)"},
            new Vehicle { Image = "Ambulance1.jpeg", Type = "Type1", Registration = "LMN789", Service = "Patient Transport" },
            new Vehicle { Image = "Ambulance2.jpg", Type = "Type2", Registration = "PBR291", Service= "Patient Transport"},
            new Vehicle { Image = "Ambulance1.jpeg", Type = "Type1", Registration = "QRS012", Service = "Event Medical Ambulance" },
            new Vehicle { Image = "Ambulance2.jpg", Type = "Type2", Registration = "XKD258", Service= "Event Medical Ambulance"},
            new Vehicle { Image = "Ambulance1.jpeg", Type = "Type1", Registration = "TUV345", Service = "Medical Utility Vehicle" },
            new Vehicle { Image = "Ambulance1.jpeg", Type = "Type1", Registration = "WXY678", Service = "Air Ambulance" }

        };
        public static List<Vehicle> GetAllVehicles()
        {
            return Vehicles;
        }
    }
}