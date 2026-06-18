import { copyFile, readdir } from "node:fs/promises"
import path from "node:path"

const publicDir = path.join(process.cwd(), "public")
const entries = await readdir(publicDir, { withFileTypes: true })

for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith(".html")) continue
  if (entry.name === "index.html" || entry.name === "404.html") continue

  const source = path.join(publicDir, entry.name)
  const destination = path.join(publicDir, entry.name.slice(0, -".html".length))
  await copyFile(source, destination)
}
