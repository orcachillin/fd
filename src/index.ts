import "dotenv/config"
import Web from "./web.js"
import FoodManager from "./foodManager.js"

FoodManager.load()

export const web = new Web()
web.start()
