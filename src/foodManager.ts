import { readdirSync } from "fs"
import { resolve } from "path"

export default class FoodManager {

    public static readonly PATH = resolve("./dist/client/foods")

    public static pages: Record<string, {
        name: string,
        render: () => string
    }> = {}

    public static async load() {
        const foodFiles = readdirSync(this.PATH).filter((p) => p.endsWith(".js"));

        (await Promise.all(foodFiles.map(async (f) => [
            f.replace(".js", ""),
            await import(resolve(this.PATH, f)).then((f) => f)
        ]))).forEach(([id, exp]) => this.pages[id] = exp)
    }
}
