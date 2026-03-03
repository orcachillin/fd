import express, { Application } from "express"
import { createServer, Server } from "http"
import { Logger } from "./logger.js"
import IndexPage from "./client/components/indexPage.js"
import { resolve } from "path"
import FoodManager from "./foodManager.js"

export default class Web {
    public server: Server
    public app: Application
    public logger: Logger
    public port: number


    constructor() {
        this.app = express();
        this.server = new Server(this.app);
        this.logger = new Logger("web")
        this.port = parseInt(process.env.PORT || "3000")
    }

    public async start() {
        this._attemptStart(this.port)

        this.app.get("/", async (req, res) => {
            res.send(IndexPage({}))
        })

        this.app.get("/foodsearch", (req, res) => {
            const query = (req.query.query as string).trim().toLowerCase()
            if (!query || !FoodManager.pages[query]) {
                res.sendStatus(404)
            }

            res.send(FoodManager.pages[query]?.render())
        })



        this.app.use("/", express.static(resolve("./dist/client/generated")))
    }

    private _attemptStart(port: number, iter: number = 0) {
        return new Promise<number>((resolve, reject) => {
            if (iter > 9) {
                this.logger.error("Error starting service: failed after", iter, "attempts");
                reject()
            }

            const attempt = new Promise<void>((ars, arj) => {
                this.server.listen(port, () => {
                    this.logger.log(`Started on port ${port}`);
                    ars();
                }).on("error", (err) => {
                    this.logger.warn(`Error starting on ${port}, making another attempt...`);
                    arj(err);
                });
            });

            attempt
                .catch(() => this._attemptStart(++port, ++iter))
                .finally(() => resolve(port))
        })

    }
}