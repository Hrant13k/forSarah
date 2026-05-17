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

// ---- constellations: SVG arrangements; tap-to-reveal lines + a quote ----
export const constellations = [
  {
    name: "the owl",
    tag: "watcher",
    quote: "she keeps the night honest. eyes wide, asking nothing.",
    stars: [[20,30],[35,22,1],[50,18],[65,22,1],[80,30],[42,40],[58,40],[50,60,1],[35,80],[65,80]],
    lines: [[0,1],[1,2],[2,3],[3,4],[1,5],[3,6],[5,6],[5,7],[6,7],[7,8],[7,9]],
  },
  {
    name: "the lamplight cat",
    tag: "soft",
    quote: "sleeps where the lamplight is best. understands you, doesn't say so.",
    stars: [[15,55],[25,40,1],[35,30],[45,40,1],[55,30],[65,40],[80,55,1],[70,75],[50,85],[30,75]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0]],
  },
  {
    name: "the autumn window",
    tag: "october",
    quote: "the season she always returns to. so do most of her songs.",
    stars: [[20,20,1],[80,20,1],[20,80,1],[80,80,1],[20,50],[80,50],[50,20],[50,80],[50,50,1]],
    lines: [[0,1],[1,3],[3,2],[2,0],[0,8],[1,8],[2,8],[3,8],[4,5],[6,7]],
  },
  {
    name: "the slow record",
    tag: "side b",
    quote: "every revolution is the same song, told slightly later.",
    stars: [[50,15,1],[78,30],[88,55],[78,80],[50,90,1],[22,80],[12,55],[22,30],[50,55,1]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,8],[2,8],[4,8],[6,8]],
  },
  {
    name: "the long sentence",
    tag: "reader",
    quote: "underlining the parts she thinks no one else has noticed.",
    stars: [[10,30],[28,28,1],[44,32],[62,28,1],[80,30],[90,55],[72,72,1],[50,76],[28,72,1],[12,55]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0]],
  },
  {
    name: "the small distance",
    tag: "introvert",
    quote: "the polite step back. the deeper kind of attention.",
    stars: [[28,28,1],[72,28],[50,50,1],[28,72],[72,72,1]],
    lines: [[0,2],[1,2],[3,2],[4,2]],
  },
];

// ---- reel: atmospheric vignettes (no portraits). each is a mood she lives in. ----
const C = "images/curated";
export const reel = [
  { src: `${C}/cosmos.jpg`,        title: "the cosmos",          note: "vast, quiet, on her side.",            rot: -3 },
  { src: `${C}/owl.jpg`,           title: "the watcher",          note: "owls keep the night honest.",          rot:  2 },
  { src: `${C}/cat.jpg`,           title: "the lamplight cat",    note: "yellow-eyed, half asleep, listening.", rot: -1 },
  { src: `${C}/cathedral.jpg`,     title: "devotion",             note: "a quieter kind. cathedral acoustics.", rot:  3 },
  { src: `${C}/candle.jpg`,        title: "one candle",           note: "for the patrick watson hours.",        rot: -2 },
  { src: `${C}/smoke.jpg`,         title: "slow reverb",          note: "the kind of evening that hums.",       rot:  1 },
  { src: `${C}/misty-forest.jpg`,  title: "wildflower country",   note: "where the long songs live.",           rot: -3 },
  { src: `${C}/americana.jpg`,     title: "endless summer",       note: "summer that never quite ended.",       rot:  2 },
  { src: `${C}/library.jpg`,       title: "a poem before bed",    note: "carpe diem, then turn the page.",      rot: -1 },
  { src: `${C}/cobblestone.jpg`,   title: "a cultural night",     note: "a street that knew she'd come.",       rot:  3 },
  { src: `${C}/typewriter.jpg`,    title: "the unsent letter",    note: "kept for safekeeping. for warmth.",    rot: -2 },
  { src: `${C}/autumn-leaves.jpg`, title: "october, kept",        note: "the season as a personality trait.",   rot:  1 },
];
