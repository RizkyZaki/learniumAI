import { HfInference } from "@huggingface/inference";

// Import prompts langsung dari file tanpa fs
import notesPrompt from "../prompts/notes_prompt.txt?raw";
import flashcardsPrompt from "../prompts/flashcards_prompt.txt?raw";
import quizPrompt from "../prompts/quiz_prompt.txt?raw";

// Initialize Hugging Face client
const client = new HfInference("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"); // Ganti dengan token Anda

// Function to generate educational content
export async function generateEducationalContent(content: string): Promise<{
  notes: string;
  flashcards: string;
  quiz: string;
}> {
  try {
    if (!content) throw new Error("Content kosong! Tidak bisa mengirim ke AI.");

    // 1. Generate Notes
    const notesResponse = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-70B-Instruct",
      messages: [
        { role: "system", content: notesPrompt },
        { role: "user", content: content },
      ],
      temperature: 0.3,
      max_tokens: 10_000,
    });

    const notesMd: string = notesResponse.choices[0]?.message?.content ?? "";
    if (!notesMd) throw new Error("Gagal mendapatkan catatan dari LLM.");

    // 2. Generate Flashcards
    const flashcardsResponse = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-70B-Instruct",
      messages: [
        { role: "system", content: flashcardsPrompt },
        { role: "user", content: notesMd },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const flashcardsMd: string =
      flashcardsResponse.choices[0]?.message?.content ?? "";
    if (!flashcardsMd)
      throw new Error("Gagal mendapatkan flashcards dari LLM.");

    // 3. Generate Quiz
    const quizResponse = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-70B-Instruct",
      messages: [
        { role: "system", content: quizPrompt },
        { role: "user", content: notesMd },
      ],
      temperature: 0.3,
      max_tokens: 5048,
    });

    const quizMd: string = quizResponse.choices[0]?.message?.content ?? "";
    if (!quizMd) throw new Error("Gagal mendapatkan kuis dari LLM.");

    return { notes: notesMd, flashcards: flashcardsMd, quiz: quizMd };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
