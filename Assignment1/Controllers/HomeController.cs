using Assignment1.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Assignment1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Service()
        {
            return View();
        }

        public ActionResult Booking(string service, bool sos)
        {
            ViewBag.ServiceName = service;
            ViewBag.Sos = sos;
            var vehicles = VehicleRepository.GetAllVehicles();
            ViewBag.Vehicles = vehicles;
            var drivers = DriverRepository.GetAllDrivers();
            ViewBag.Drivers = drivers;
            return View();
        }

        public ActionResult Confirmed()
        {
            return View();
        }

        public ActionResult History()
        {
            return View();
        }

        public ActionResult Manage()
        {
            var drivers = DriverRepository.GetAllDrivers();
            var vehicles = VehicleRepository.GetAllVehicles();
            ViewBag.Vehicles = JsonConvert.SerializeObject(vehicles);
            return View(drivers);
        }



        //[HttpPost]
        //public JsonResult AddDriver(Driver driver)
        //{
        //    DriverRepository.Drivers.Add(driver);
        //    return Json(new { success = true });
        //}
    }
}