"use server";

import { readdir } from "fs/promises";
import path from "path";

export async function getSongsAction() {
  const songsDirectory = path.join(process.cwd(), "songs");

  try {
    const files = await readdir(songsDirectory);
    return files;
  } catch (error) {
    console.error("Error reading songs directory:", error);
    return [];
  }
}
