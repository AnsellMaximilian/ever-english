export async function GET() {
  return Response.json({ geminiKey: process.env.GOOGLE_AI_API_KEY });
}
