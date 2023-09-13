require("express-router-group");
const express = require("express");
const {
  getHealth,
  createTask,
  getTasks,
  getTaskByID,
  updateTask,
  deleteTask,
  register,
  login,
  logout,
} = require("../contoller");
const { authorizeJWT } = require("../middleware/middleware");

const router = express.Router();

// health router
router.group("/api/v1/health", (r) => {
  r.get("/", getHealth);
});

// task router
router.group("/api/v1/tasks", (r) => {
  r.post("/", createTask);
  r.get("/", getTasks);
  r.get("/:id", getTaskByID);
  r.patch("/:id", updateTask);
  r.delete("/:id", deleteTask);
});

router.group("/api/v2/tasks", authorizeJWT, (r) => {
  r.post("/", createTask);
  r.get("/", getTasks);
  r.get("/:id", getTaskByID);
  r.patch("/:id", updateTask);
  r.delete("/:id", deleteTask);
});

// auth router
router.group("/api/v1/auth", (r) => {
  r.post("/register", register);
  r.post("/login", login);
  r.post("/logout", authorizeJWT, logout);
});

module.exports = router;
