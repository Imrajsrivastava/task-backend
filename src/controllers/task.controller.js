import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";

export const createTaskCtrl = async (req, res) => {
  try {
    const task = await createTask(req.user._id, req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasksCtrl = async (req, res) => {
  try {
    const data = await getTasks(req.user._id, req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskCtrl = async (req, res) => {
  const task = await getTaskById(req.params.id, req.user._id);
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
};


export const updateTaskCtrl = async (req, res) => {
  const result = await updateTask(req.params.id, req.user._id, req.body);

  if (result.notFound) return res.status(404).json({ message: "Task not found" });
  if (result.notAuthorized) return res.status(403).json({ message: "Not authorized" });

  res.json(result.task);
};

export const deleteTaskCtrl = async (req, res) => {
  const result = await deleteTask(req.params.id, req.user._id);

  if (result.notFound) return res.status(404).json({ message: "Task not found" });
  if (result.notAuthorized) return res.status(403).json({ message: "Not authorized" });

  res.json({ message: "Deleted" });
};