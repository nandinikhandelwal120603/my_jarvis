// netlify/functions/hello.js
export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Netlify Functions are working 🎉",
      hasKey: !!process.env.OPENROUTER_API_KEY, // true if your key is loaded
    }),
  };
}
