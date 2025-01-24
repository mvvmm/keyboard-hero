"use server";

import fs from "fs";
import { readdir } from "fs/promises";
import ini from "ini";
import path from "path";
import { SongFiles } from "../types/SongFiles";

export async function getSongFilesAction(songSlug: string): Promise<SongFiles> {
  const decodedSlug = decodeURIComponent(songSlug);
  const privateSongsDirectory = path.join(process.cwd(), "songs", decodedSlug);
  const ret = {} as SongFiles;

  try {
    const fileNames = await readdir(privateSongsDirectory);

    for (const fileName of fileNames) {
      // Album art
      if (fileName.toLowerCase().startsWith("album")) {
        const publicAlbumfilePath = path.join(
          "/",
          "songs",
          decodedSlug,
          fileName,
        );
        ret.album = publicAlbumfilePath;
      }

      // Background
      if (fileName.toLowerCase().startsWith("background")) {
        const publicBackgroundfilePath = path.join(
          "/",
          "songs",
          decodedSlug,
          fileName,
        );
        ret.background = publicBackgroundfilePath;
      }

      // Audio
      if (fileName.toLowerCase().endsWith(".opus")) {
        const publicAudiofilePath = path.join(
          "/",
          "songs",
          decodedSlug,
          fileName,
        );
        if (!ret.audio || ret.audio.length <= 0) {
          ret.audio = [];
        }
        ret.audio.push(publicAudiofilePath);
      }

      // ini
      if (fileName.toLowerCase().startsWith("song.ini")) {
        try {
          const privateIniPath = path.join(privateSongsDirectory, fileName);
          const iniFileContent = fs.readFileSync(privateIniPath, "utf-8");
          const iniData = ini.parse(iniFileContent);
          ret.ini = iniData;
        } catch (error) {
          ret.ini = undefined;
        }
      }
    }
    return ret;
  } catch (error) {
    console.error("Error reading songs directory:", error);
    return {} as SongFiles;
  }
}
