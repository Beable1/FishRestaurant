// lib/sendEmail.ts
export async function sendVerifyEmail(to: string, verifyPath: string) {
    await fetch(process.env.APPS_SCRIPT_URL!, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ to, verifyPath })
    });
  }
  