import { Router } from 'express';
import type { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONTACT_SUBMISSIONS_FILE } from '../config.js';
import type { ContactSubmission } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// POST /api/contact - Submit contact form
router.post('/', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  // Validation
  const errors: Array<{ field: string; message: string }> = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required (min 2 characters)' });
  }

  if (!email || typeof email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    errors.push({ field: 'subject', message: 'Subject is required (min 3 characters)' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message is required (min 10 characters)' });
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: errors,
      },
    });
    return;
  }

  try {
    // Ensure directory exists
    const dir = path.dirname(CONTACT_SUBMISSIONS_FILE);
    await fs.mkdir(dir, { recursive: true });

    // Load existing submissions
    let submissions: ContactSubmission[] = [];
    try {
      const existing = await fs.readFile(CONTACT_SUBMISSIONS_FILE, 'utf-8');
      submissions = JSON.parse(existing);
    } catch {
      // File doesn't exist or is invalid, start fresh
    }

    // Create new submission
    const submission: ContactSubmission = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Save
    submissions.push(submission);
    await fs.writeFile(CONTACT_SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

    res.status(201).json({
      data: {
        id: submission.id,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (error) {
    console.error('[Contact] Error saving submission:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to save submission',
      },
    });
  }
});

export default router;
