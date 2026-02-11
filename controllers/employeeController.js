import Employee from "../models/employeeModel.js";

/* Get All Employees */
export const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

/* Get Employee by ID */
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
};

/* Create Employee */
export const createEmployee = async (req, res) => {
  const { name, course, roll_no } = req.body;

  if (!name || !course || !roll_no) {
    return res.status(400).json({ message: "All fields required" });
  }

  const employee = await Employee.create({ name, course, roll_no });
  res.status(201).json(employee);
};

/* Update Employee (PUT) */
export const updateEmployee = async (req, res) => {
  const { name, course, roll_no } = req.body;

  if (!name || !course || !roll_no) {
    return res.status(400).json({ message: "All fields required" });
  }

  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    { name, course, roll_no },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(updated);
};

/* Partial Update (PATCH) */
export const patchEmployee = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(updated);
};

/* Delete Employee */
export const deleteEmployee = async (req, res) => {
  const deleted = await Employee.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee deleted successfully" });
};
