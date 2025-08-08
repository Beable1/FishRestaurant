// lib/sendEmail.ts
export async function sendVerifyEmail(to: string, verifyPath: string) {
    await fetch("https://script.google.com/macros/s/AKfycbxFl9k61CHXm7pvXNXHPthA6NAvjx-8qOP6x__xPYEcS8vdRQcNVCcG0SnuxvLJuiNw/exec", {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ to, verifyPath })
    });
  }
  