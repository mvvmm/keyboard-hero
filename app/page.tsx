import Link from "next/link";
import { getSongsAction } from "./actions/getSongsAction";

export default async function Home() {
  const songs = await getSongsAction();

  return (
    <>
      {songs.map((song) => (
        <p key={song}>{<Link href={`/songs/${song}`}>{song}</Link>}</p>
      ))}
    </>
  );
}
