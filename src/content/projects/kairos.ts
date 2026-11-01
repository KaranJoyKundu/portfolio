import type { Project } from "@/lib/schema";

/**
 * Kairos — tech stack + case-study narrative verified from Karan's own
 * project notes (Desktop\CSE Projects\AI Automation\README1.0.md +
 * KAIROS_CONTINUE.md). Status "in development". Summary is the approved
 * seed copy. PC-hardware BOM deliberately omitted (user decision: skip for
 * now); feature list, memory system, and safety tiers ship as verified.
 */

const kairos = {
  slug: "kairos",
  title: "Kairos",
  summary:
    "A fully offline, voice-activated AI assistant that runs entirely on local GPU hardware for Windows 11, with three specialized AI brains and a four-layer memory system.",
  status: "in-progress",
  tags: ["ML"],
  tech: [
    "Python 3.11",
    "Ollama (local LLMs)",
    "DeepSeek-R1 14B (planner/chat)",
    "Qwen 2.5-VL 7B (vision)",
    "Qwen 2.5-Coder 14B",
    "Faster-Whisper large-v3-turbo (STT)",
    "OpenWakeWord (wake word)",
    "Kokoro-82M TTS (speech)",
    "LangGraph (state machine)",
    "PyAutoGUI + OpenCV + MSS (GUI control)",
    "Playwright (browser automation)",
    "PyWin32 + PowerShell (OS control)",
    "EasyOCR (screen text)",
    "SQLite (memory)",
  ],
  year: "2026",
  links: {
    github: "https://github.com/KaranJoyKundu/kairos",
  },
  order: 5,
  featured: true,
  images: {
    status: "placeholder",
    figures: [],
  },
  detail: {
    status: "verified",
    problem:
      "Traditional cloud assistants require internet connectivity, expose user data to servers, and lock users into subscription models. Kairos is designed as a completely offline, self-hosted AI that never leaves the user’s machine, maintaining full privacy and control over local workflows.",
    constraints:
      "Hardware constraints: runs on a local GPU workstation (RTX 5070 class); software stack limited to open-source Python libraries; safety requirements: three-tier safety system with HARD_BLOCKED restrictions (no payments/crypto) and REQUIRES_CONFIRMATION prompts for sensitive actions.",
    decisions: [
      {
        title: "Three specialized AI brains for task categorization and efficiency",
        body: "Instead of a single monolithic model, Kairos uses separate models: deepseek-r1:14b for complex reasoning/planning, qwen2.5-vl:7b for visual analysis, and qwen2.5-coder:14b for code tasks. This allows optimal performance while maintaining offline operation and reducing memory requirements.",
      },
      {
        title: "4-layer memory system for persistent contextual awareness",
        body: "Kairos uses Working Memory (current session), Episodic Memory (full history), Semantic Memory (permanent facts), and Procedural Memory (habits/workflows). This enables natural conversation flow, habit learning, and long-term personalization without requiring internet-synced cloud storage.",
      },
      {
        title: "Hard safety boundaries with zero-override escalation",
        body: "Three-tier system: HARD BLOCKED (payments/banks/crypto), REQUIRES CONFIRMATION (destructive actions), and SAFE AUTONOMOUS (routine actions). This prevents accidental misuse while enabling useful automation like email management and focus mode.",
      },
    ],
    challenges: [
      {
        problem:
          "Limited GPU memory and CPU resources required optimization of multiple large models (14B parameter models) while maintaining real-time response times under 200ms.",
        fix: "Implemented model switching (\"switch to coder/vision mode\") and used smaller router models (qwen2.5:1.5b) for quick classification before loading specialized models.",
      },
      {
        problem:
          "Voice activation needed to work reliably in noisy environments while maintaining low power consumption and always-listening capability.",
        fix: "Used Silero VAD (Voice Activity Detection) for noise-resistant voice trigger combined with openWakeWord's trained 'hey Kairos' model for user-specific activation.",
      },
    ],
    results:
      "Kairos successfully handles voice/text commands, manages emails, blocks games, automates focus mode, maintains persistent memory across sessions, and provides natural conversation. The system operates completely offline with a privacy-first design and maintains real-time performance on local hardware.",
    improvements:
      "Planning: Auto Daily Briefing (6AM), Bengali language support, local knowledge base RAG, proactive alerts, context-aware reminders, voice notes to memory, enhanced habit learning with visual triggers, and improved model quantization for reduced memory footprint.",
  },
  contentStatus: "verified",
} satisfies Project;

export default kairos;
