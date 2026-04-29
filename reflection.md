# Reflection — Scaler Persona Chat

## What Worked

The most impactful decision was investing time in **persona research before writing a single line of prompt**. By studying Anshuman Singh's competitive programming background and Facebook tenure, Abhimanyu Saxena's entrepreneurial journey from Daksh to Scaler, and Kshitij Mishra's pedagogical reputation, I was able to craft system prompts that don't just mimic surface-level traits — they capture how each person *thinks*.

**Few-shot examples** proved to be the single most effective technique. Without them, the LLM would default to a generic helpful-assistant voice regardless of persona description. With carefully crafted examples showing each persona's signature phrases, reasoning style, and response structure, the model consistently stayed in character. For instance, Anshuman's responses naturally include references to "being on both sides of the table" at Facebook, while Kshitij's responses lead with analogies before technical details.

**The persona switcher with conversation reset** was a clean UX decision. Rather than trying to maintain context across persona switches (which would create confusing mixed-persona conversations), resetting the chat on switch gives each persona a fresh context and prevents prompt leakage between characters.

## What the GIGO Principle Taught Me

GIGO (Garbage In, Garbage Out) was the defining lesson of this project. My first draft prompts were shallow — "You are Anshuman Singh, co-founder of Scaler. Be helpful and motivating." The output was predictably generic: the model sounded like any career advice chatbot with a name tag.

The transformation happened when I added **specificity**. Instead of "be practical," I wrote "you think in terms of problem patterns and optimal approaches — a mindset shaped by your years in competitive programming." Instead of "share your experience," I embedded concrete references: Facebook Messenger, the London engineering office, the ICPC finals.

This taught me that **the quality of the system prompt is the single largest lever** on output quality. A beautifully designed frontend with a lazy prompt will always produce a mediocre experience. The model can only be as good as the instructions it receives.

## What I Would Improve

Given more time, I would:

1. **Add memory/context persistence** — allow users to continue conversations across sessions using local storage or a database
2. **Implement streaming responses** — instead of waiting for the full response, stream tokens in real-time for a more natural chat feel
3. **Add voice input/output** — using Web Speech API to let users talk to the personas, making the experience more immersive
4. **Expand persona knowledge** — incorporate specific quotes, class examples, and teaching moments from each persona's actual Scaler content to make responses even more authentic
5. **A/B test prompts** — run the same questions against different prompt versions and measure response quality systematically to optimize each persona further
