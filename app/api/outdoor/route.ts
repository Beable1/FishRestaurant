import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const outdoorDir = path.join(process.cwd(), 'public', 'outdoor')
    const entries = await fs.promises.readdir(outdoorDir, { withFileTypes: true })

    const images = entries
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const fileName = entry.name
        return {
          id: fileName,
          imageUrl: `/outdoor/${fileName}`,
          alt: 'Dış Mekan',
          category: 'outdoor',
          title: fileName.replace(/\.[^/.]+$/, ''),
        }
      })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error listing outdoor images:', error)
    return NextResponse.json({ images: [] }, { status: 200 })
  }
}


