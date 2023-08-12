"use client"

import { useEffect } from 'react'
import { listen } from '@tauri-apps/api/event'
import Button from "https://framer.com/m/Button-8lyt.js@AYILo02jKZzU30gyM75p"

export default function Home() {

  // Maybe wiser to handle this event directly from Rust instead of calling it from JS.
  const fileDropListener = async () => {
    return await listen('tauri://file-drop', (event) => {
      const filePath = event.payload
      console.log(filePath)
    })
  };

  useEffect(() => {
    const unlisten = fileDropListener();

    return () => {
      if (unlisten) {
        // @ts-expect-error: unlisten is not a function until the await concludes
        unlisten();
      }
    }
  }, [])

  return (
    <main>
      <Button title={"Convert to GIF"} />
    </main>
  )
}
