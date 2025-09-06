import { Task } from "../models/task.model.js";

export const createTask = async (ownerId, data) => {
  const task = new Task({ ...data, owner: ownerId });
  return await task.save();
};

export const getTasks = async (ownerId, { page = 1, limit = 10, q = "", status = "all" }) => {
  const skip = (page - 1) * limit;
  const filter = { };


  if (status !== "all") filter.status = status;
  if (q) filter.$or = [
    { title: { $regex: q, $options: "i" } },
    { description: { $regex: q, $options: "i" } },
  ];

  console.log("Filter applied:", filter);
  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  return { tasks, total, page: Number(page), pages: Math.ceil(total / limit) };
};

export const getTaskById = async (id, ownerId) => {
  const task = await Task.findById(id);
  if (!task) return { notFound: true };
  return task ;
};

export const getTaskBy = async (id, ownerId) => {
  const task = await Task.findById(id);
  if (!task) return { notFound: true };
  if (task.owner.toString() !== ownerId.toString()) return { notAuthorized: true };
  return {task} ;
};

export const updateTask = async (id, ownerId, updates) => {
  const { task, notFound, notAuthorized } = await getTaskBy(id, ownerId);
  if (notFound) return { notFound: true };
  if (notAuthorized) return { notAuthorized: true };

  Object.assign(task, updates);
  await task.save();
  return { task };
};

export const deleteTask = async (id, ownerId) => {
  const { task, notFound, notAuthorized } = await getTaskBy(id, ownerId);
  if (notFound) return { notFound: true };
  if (notAuthorized) return { notAuthorized: true };

  await task.deleteOne();
  return { success: true };
};
