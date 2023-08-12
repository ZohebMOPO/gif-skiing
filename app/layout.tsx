import type { Metadata } from 'next'
import "./styles.css"

const Titlebar = ({ height }: { height?: Number }) => <div
  data-tauri-drag-region
  style={{
    height: height ? height.toString() + "px" : 24,
    width: "100%",
    zIndex: 10
  }}
/>

export const metadata: Metadata = {
  title: 'Gifskiing',
  description: 'Create high-quality GIFs from videos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Titlebar />
        {children}
      </body>
    </html>
  )
}
