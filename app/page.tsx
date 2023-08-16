"use client";

import { Command } from "@tauri-apps/api/shell";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import Button from "https://framer.com/m/Button-8lyt.js@AYILo02jKZzU30gyM75p";

export default function Home() {
  const Trigger = async () => {
    const command = Command.sidecar("bin/gifski-1.11.0/win/gifski");
    const output = await command.execute();
    console.log({ output });
  };
  Trigger();
  // Maybe wiser to handle this event directly from Rust instead of calling it from JS.
  const fileDropListener = async () => {
    return await listen("tauri://file-drop", (event) => {
      const filePath = event.payload;
      console.log(filePath);
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
