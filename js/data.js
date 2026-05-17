// ---- album tracks ----
const ALBUM_DIR = "songs/Hard To Imagine The Neighbourhood Ever Changing";

export const tracks = [
  { n: 1,  title: "Dust",                    file: "1. Dust.mp3" },
  { n: 2,  title: "Kill Us All (feat. Denzel Curry)", file: "2. Kill Us All (feat. Denzel Curry).mp3" },
  { n: 3,  title: "24/7",                    file: "3. 24_7.mp3" },
  { n: 4,  title: "Scary Love",              file: "4. Scary Love.mp3" },
  { n: 5,  title: "Softcore",                file: "5. Softcore.mp3" },
  { n: 6,  title: "Void",                    file: "6. Void.mp3" },
  { n: 7,  title: "Roll Call",               file: "7. Roll Call.mp3" },
  { n: 8,  title: "Livin' In a Dream (feat. Nipsey Hussle)", file: "8. Livin' In a Dream (feat. Nipsey Hussle).mp3" },
  { n: 9,  title: "You Get Me So High",      file: "9. You Get Me So High.mp3" },
  { n: 10, title: "Reflections",             file: "10. Reflections.mp3" },
  { n: 11, title: "Blue",                    file: "11. Blue.mp3" },
  { n: 12, title: "Paradise",                file: "12. Paradise.mp3" },
  { n: 13, title: "Beat Take 1 (feat. Ghostface Killah)", file: "13. Beat Take 1 (feat. Ghostface Killah).mp3" },
  { n: 14, title: "Stuck with Me",           file: "14. Stuck with Me.mp3" },
  { n: 15, title: "Flowers",                 file: "15. Flowers.mp3" },
  { n: 16, title: "Compass",                 file: "16. Compass.mp3" },
  { n: 17, title: "Noise",                   file: "17. Noise.mp3" },
  { n: 18, title: "Heaven",                  file: "18. Heaven.mp3" },
  { n: 19, title: "Nervous",                 file: "19. Nervous.mp3" },
  { n: 20, title: "Sadderdaze",              file: "20. Sadderdaze.mp3" },
  { n: 21, title: "Beautiful Oblivion (feat. IDK)", file: "21. Beautiful Oblivion (feat. IDK).mp3" },
].map(t => ({ ...t, src: `${ALBUM_DIR}/${t.file}`.split("/").map(encodeURIComponent).join("/") }));

// ---- tickets: a small stack of evening stubs. each is a swipeable card. ----
const C = "images/curated";

// kind: "typo" — typographic ticket, no photo
// kind: "cinema" — has a film cell / photo strip
// kind: "doppel" — the doppelgänger pass (inside joke)
// rot: small rotation for "landed paper" feel
// each ticket has a serial code, an overline, title, a subtitle line, and a footer line

// kind: "thanks" — has a poster/photo + a short handwritten note thanking her for a recommendation
// kind: "note"   — a single image with a casual handwritten note (no formal ticket fields)

export const tickets = [
  {
    kind: "thanks",
    serial: "A · 01",
    overline: "from her shelf, to mine",
    title: "dead poets society",
    photo: `${C}/dead-poets.png`,
    note: "thanks for telling me to watch this one. carpe diem hit different at 1am with your voice memo open in another tab.",
    foot: ["signed,", "a quiet student"],
    stamp: "✎",
    rot: -2,
  },
  {
    kind: "thanks",
    serial: "B · 02",
    overline: "from her queue, to mine",
    title: "moriarty the patriot",
    photo: `${C}/moriarty.jpg`,
    note: "and this one. i did not know an anime could feel like a victorian poem until you sent it. the professor stays in my head rent-free now — thank you for that.",
    foot: ["signed,", "willingly recruited"],
    stamp: "♛",
    rot: 2,
  },
  {
    kind: "note",
    serial: "C · 03",
    overline: "observation no. 1",
    title: "the cat clause",
    photo: `${C}/cat.jpg`,
    note: "honestly, i love that you love cats. that's a green flag the size of a small country.",
    foot: ["filed under,", "things that matter"],
    stamp: "🐾",
    rot: -1,
  },
  {
    kind: "note",
    serial: "D · 04",
    overline: "a small love letter to",
    title: "the gyumri barbar",
    photo: `${C}/gyumri.jpg`,
    note: "just wanted to say — i love the way you talk. the gyumri բարբառ. keep speaking in it, keep teaching it. (yeah i don't even know how to translate that word properly. that's kind of the whole point.)",
    foot: ["from,", "an attentive listener"],
    stamp: "բ",
    rot: 1,
  },
  {
    kind: "doppel",
    serial: "★ · 05",
    overline: "special edition · doppelgänger pass",
    title: "stand-ins",
    photos: [
      { src: `${C}/hermione.jpg`,  caption: "hermione granger" },
      { src: `${C}/sadie.jpg`,     caption: "sadie sink" },
    ],
    note: "yk you mentioned you take notes from hannibal, so i'm putting your doppelgängers here instead of your real pics. for the safety of all parties involved.",
    notePost: "😭",
    foot: ["signed,", "the management"],
    stamp: "✦",
    rot: 0,
  },
];

