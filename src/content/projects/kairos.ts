import type { Project } from "@/lib/schema";

/**
 * Kairos — tech stack verified from Karan's own project notes
 * (Desktop\CSE Projects\AI Automation\README1.0.md + KAIROS_CONTINUE.md),
 * status "in development". Summary is the approved seed copy.
 */
const kairos = {
  slug: "kairos",
  title: "Kairos",
  summary:
    "An offline, local AI assistant that runs entirely on a Windows 11 machine.",
  status: "in-progress",
  tags: ["ML"],
  tech: [
    "Python 3.11",
    "Ollama (local LLMs)",
    "DeepSeek-R1 14B (planner/chat)",
    "Qwen 2.5-VL 7B (vision)",
    "Qwen 2.5-Coder 14B",
    "faster-whisper (STT)",
    "openWakeWord",
    "Kokoro TTS",
    "LangGraph",
  ],
  order: 5,
  featured: true,
  images: { status: "placeholder", figures: [] },
  detail: { status: "placeholder" },
  contentStatus: "verified",
} satisfies Project;

export default kairos;
