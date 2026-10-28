import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MIME_TYPES: Record<string, string> = {
  // Images
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  // Videos
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.ogg': 'video/ogg',
  '.ogv': 'video/ogg',
  '.m4v': 'video/mp4',
  // Documents
  '.pdf': 'application/pdf',
};

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;

  // Sanitize filename to prevent directory traversal
  const safeFilename = path.basename(decodeURIComponent(filename));
  const filePath = path.join(process.cwd(), 'public', 'uploads', safeFilename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  try {
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle HTTP Range requests for video/audio streaming (safari, mobile, scrubbing)
    const range = request.headers.get('range');
    const isMedia = contentType.startsWith('video/') || contentType.startsWith('audio/');

    if (range && isMedia) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${fileSize}` },
        });
      }

      const chunkSize = end - start + 1;
      const buffer = Buffer.alloc(chunkSize);
      const fd = fs.openSync(filePath, 'r');
      fs.readSync(fd, buffer, 0, chunkSize, start);
      fs.closeSync(fd);

      return new NextResponse(buffer, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': String(chunkSize),
          'Content-Type': contentType,
        },
      });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(fileSize),
        'Accept-Ranges': isMedia ? 'bytes' : 'none',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error reading upload file:', error);
    return new NextResponse('Error reading file', { status: 500 });
  }
}
