// app/api/addEmail/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  const filePath = path.resolve(process.cwd(), 'emails.json');
  let emails = [];

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    emails = JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading email file:', error);
  }

  emails.push({email});

  try {
    fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));
    return NextResponse.json({ message: 'Email added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error writing email file:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
