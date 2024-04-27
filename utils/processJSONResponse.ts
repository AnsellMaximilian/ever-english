export function removeJsonWrapper(text: string): string {
  // Remove "```json" from the text
  text = text.replace(/```json/g, "");

  // Remove "```" from the text
  text = text.replace(/```/g, "");

  return text;
}
