import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"

import upload from "../config/multer"
import roleMiddleware from "../middlewares/permission"
import vehiclesController from "../controllers/vehicles/export"
import driversController from "../controllers/drivers/export"
import tripsController from "../controllers/trips/export"
import maintenanceController from "../controllers/maintenance/export"
import reportsController from "../controllers/reports/export"

export enum Roles {
  Member = "member",
  Fleet_Manager = "fleet_manager",
  Admin = "admin",
}

const Router = express.Router()
// users
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
Router.post("/auth/verifyEmail", usersController.verifyEmail)
Router.get("/auth/aboutMe", authMiddleware, usersController.aboutMe)
// vehicles
Router.post(
  "/vehicles",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  upload.single("image_url"),
  vehiclesController.add_vehicle
)
Router.put(
  "/vehicles/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Fleet_Manager),
  upload.single("image_url"),
  vehiclesController.edit_vehicle
)
Router.get("/vehicles", authMiddleware, vehiclesController.get_vehicles)
Router.get("/vehicles/:id", authMiddleware, vehiclesController.get_single)
Router.delete(
  "/vehicles/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  vehiclesController.delete_vehicle
)
// drivers
Router.post(
  "/drivers",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  driversController.add_driver
)
Router.get("/drivers", authMiddleware, driversController.get_drivers)
Router.put(
  "/drivers/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Fleet_Manager),
  driversController.edit_driver
)
Router.delete(
  "/drivers/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  driversController.delete_driver
)
Router.get("/drivers/:id", authMiddleware, driversController.get_single_driver)
// trips
Router.post(
  "/trips",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Fleet_Manager),
  tripsController.add_trip
)
Router.get("/trips", authMiddleware, tripsController.get_trips)
Router.get("/trips/:id", authMiddleware, tripsController.get_user_trips)
Router.delete(
  "/trips/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  tripsController.delete_trip
)
Router.put(
  "/trips/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Fleet_Manager),
  tripsController.edit_trip
)
// maintenance
Router.post(
  "/maintenances",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Fleet_Manager),
  maintenanceController.add_maintenance
)
Router.delete(
  "/maintenances/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  maintenanceController.delete_maintenance
)
Router.put(
  "/maintenances/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin, Roles.Fleet_Manager),
  maintenanceController.edit_maintenance
)
Router.get(
  "/maintenances/:id",
  authMiddleware,
  maintenanceController.get_single_maintenance
)
// reports
Router.get(
  "/reports/trip-costs",
  authMiddleware,
  reportsController.get_trip_costs
)
Router.get(
  "/reports/maintenance-costs",
  authMiddleware,
  reportsController.get_maintenance_costs
)

export default Router
