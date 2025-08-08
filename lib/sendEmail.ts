// lib/sendEmail.ts
export async function sendVerifyEmail(to: string, verifyPath: string) {
    await fetch("https://script.google.com/macros/s/AKfycbwiQRSvR77to33taIykI6BQD3x1q02mPwvvntSKhScer3Lun_mxuXbir8NzrmDAYQ1r3g/exec", {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ to, verifyPath })
    });
  }
  