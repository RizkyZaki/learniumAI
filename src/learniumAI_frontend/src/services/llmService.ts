import { HfInference } from "@huggingface/inference";

const client = new HfInference("hf_xxxxxxxxxxxxxxx"); // isi dengan token "FINE GRAINED" huggingface anda!

// System prompts - pastikan ini sudah didefinisikan
const notes_prompt = "..." // wajib isi dengan prompt notes yang sudah ditentukan (notes_prompt.txt)
const flashcards_prompt = "..." // wajib isi dengan prompt flashcards yang sudah ditentukan (flashcards_prompt.txt)
const quiz_prompt = "..." // wajib isi dengan prompt quiz yang sudah ditentukan (quiz_prompt.txt)


const content = "..." // isi dengan dokumen yang sudah di ekstrak dari si parser (PDF, TXT, DOCX)

async function generateEducationalContent() {
  try {
    // 1. Generate Notes
    const notesResponse = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-70B-Instruct",
      messages: [
        { role: "system", content: notes_prompt },
        { role: "user", content: content }
      ],
      temperature: 0.3,
      max_tokens: 10_000
    });
    
    const notesMd = notesResponse.choices[0].message.content;
    console.log("=== CATATAN ===");
    console.log(notesMd);

    // 2. Generate Flashcards
    const flashcardsResponse = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-70B-Instruct",
      messages: [
        { role: "system", content: flashcards_prompt },
        { role: "user", content: notesMd }
      ],
      temperature: 0.3,
      max_tokens: 1024
    });
    
    const flashcardsMd = flashcardsResponse.choices[0].message.content;
    console.log("\n=== FLASHCARDS ===");
    console.log(flashcardsMd);

    // 3. Generate Quiz
    const quizResponse = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-70B-Instruct",
      messages: [
        { role: "system", content: quiz_prompt },
        { role: "user", content: notesMd }
      ],
      temperature: 0.3,
      max_tokens: 5048
    });
    
    const quizMd = quizResponse.choices[0].message.content;
    console.log("\n=== KUIS ===");
    console.log(quizMd);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Eksekusi fungsi utama
generateEducationalContent();
