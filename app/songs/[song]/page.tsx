import { getSongAction } from "@/app/actions/getSongAction";
import { SongFiles } from "@/app/types/SongFiles";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { song: string } }) {
  const _params = await params;
  const songName = _params.song;
  const songFiles: SongFiles = await getSongAction(songName);

  if (!songFiles) {
    notFound();
  }

  return (
    <>
      {songFiles?.audio && (
        <audio autoPlay preload="auto">
          <source src={songFiles.audio} type="audio/ogg; codecs=opus" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {songFiles?.background && (
          <Image
            src={songFiles.background}
            alt="song background"
            layout="fill"
            objectFit="cover"
            quality={50}
            priority
            style={{
              zIndex: -1,
              position: "absolute",
            }}
          />
        )}

        {songFiles?.album && (
          <Image
            src={songFiles.album}
            alt="album cover"
            width={200}
            height={200}
          />
        )}
        <div className="mx-auto max-w-2xl">
          {songFiles.ini && <pre>{JSON.stringify(songFiles.ini, null, 2)}</pre>}
        </div>
      </div>
    </>
  );
}
