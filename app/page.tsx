"use client";

import { Command } from "@tauri-apps/api/shell";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import Button from "https://framer.com/m/Button-8lyt.js@AYILo02jKZzU30gyM75p";

export default function Home() {
  const convertVideoToGif = async (sourceVideo: String) => {
    const commandArguments = `--fps 10 --width 320 -o anim.gif ${sourceVideo}`;
    const command = Command.sidecar(
      "bin/gifski",
      commandArguments.split(" ")
    );
    const output = await command.execute();
    console.log({ output });
  };

  // Maybe wiser to handle this event directly from Rust instead of calling it from JS.
  const fileDropListener = async () => {
    return await listen("tauri://file-drop", (event) => {
      const filePaths = event.payload;

      let source

      if (filePaths.length > 1) {
        source = filePaths.join(" ")
        console.log(source);
      } else {
        source = filePaths
      }

      convertVideoToGif(source);
    });
  };

  useEffect(() => {
    const unlisten = fileDropListener();

    return () => {
      if (unlisten) {
        // @ts-expect-error: unlisten is not a function until the await concludes
        unlisten();
      }
    };
  }, []);

  return (
    <main>
      <p>Drag and drop a video (or a sequence of images) to turn into a GIF</p>
      <p></p>
      <Button title={"Convert to GIF"} />
    </main>
  );
}




// signal: null

// stderr: "[swscaler @ 0x1301d0000] [swscaler @ 0x1301e0000] No accelerated colorspace conversion found from yuv420p to rgba.↵[swscaler @ 0x1301d0000…"

// stdout: "\r↵Frame 1 / 137  _..........................................................  14s \r↵798KB GIF; Frame 31 / 137…"
