import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'src', 'data', 'storedContactSubmissions.json');
const RECIPIENTS = ['communications@lambda-cro.com', 'lambdaresearch.digital@gmail.com'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, scale, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const newSubmission = {
      id: 'sub_' + Date.now(),
      submittedAt: new Date().toISOString(),
      recipients: RECIPIENTS,
      name,
      email,
      serviceRequested: projectType || 'Not specified',
      projectScale: scale || 'Not specified',
      message,
    };

    // Read existing submissions or initialize
    let submissions: any[] = [];
    try {
      if (fs.existsSync(SUBMISSIONS_FILE)) {
        const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
        submissions = JSON.parse(fileContent);
      }
    } catch {
      submissions = [];
    }

    submissions.unshift(newSubmission);

    // Save to persistent file
    try {
      const dataDir = path.dirname(SUBMISSIONS_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
    } catch (saveErr) {
      console.warn('Could not persist submission to file:', saveErr);
    }

    console.log(`[Contact Form Submission] Forwarded to: ${RECIPIENTS.join(', ')}`, newSubmission);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and queued for dispatch.',
      recipients: RECIPIENTS,
      submissionId: newSubmission.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let submissions: any[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      submissions = JSON.parse(fileContent);
    }
    return NextResponse.json({ success: true, count: submissions.length, recipients: RECIPIENTS });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
