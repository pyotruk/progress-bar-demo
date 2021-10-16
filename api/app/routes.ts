import {Express} from "express";
import log4js, {Logger} from "log4js";

const log: Logger = log4js.getLogger("routes");

interface Task {
    id: string;
    progress: number;
}

const TASKS: Task[] = [];

export default {
    configure: async (app: Express): Promise<void> => {

        app.post("/task", async (req, res) => {
            try {
                const task: Task = {id: Date.now().toString(), progress: 0};
                TASKS.push(task);
                return res.json(task);
            } catch (err) {
                log.error("Failed to post a task.", err);
                return res.status(500).json(err);
            }
        });

        app.get("/tasks", async (req, res) => {
            try {
                return res.json(TASKS);
            } catch (err) {
                return res.status(500).json(err);
            }
        });

        app.get("/taskStatus/:id", async (req, res) => {
            try {
                const task: undefined | Task = TASKS.find((task: Task) => {
                    return task.id === req.params.id;
                });
                if (!task) {
                    return res.status(404).json({});
                }
                task.progress += 1;
                return res.json(task);
            } catch (err) {
                return res.status(500).json(err);
            }
        });
    },
};
