// Track list — file names match what's in /songs/
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

// Constellations — each is a tiny named star arrangement, shown as an SVG card
// stars: [x, y, bright?]; lines: pairs of star indices
export const constellations = [
  {
    name: "the owl",
    tag: "watcher",
    quote: "she keeps the night honest. eyes wide, asking nothing.",
    stars: [[20,30],[35,22,1],[50,18],[65,22,1],[80,30],[42,40],[58,40],[50,60,1],[35,80],[65,80]],
    lines: [[0,1],[1,2],[2,3],[3,4],[1,5],[3,6],[5,6],[5,7],[6,7],[7,8],[7,9]],
  },
  {
    name: "the cat",
    tag: "warm",
    quote: "sleeps where the lamplight is best. understands you, doesn't say so.",
    stars: [[15,55],[25,40,1],[35,30],[45,40,1],[55,30],[65,40],[80,55,1],[70,75],[50,85],[30,75]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0]],
  },
  {
    name: "the vinyl",
    tag: "side b",
    quote: "every revolution is the same song, told slightly later.",
    stars: [[50,15,1],[78,30],[88,55],[78,80],[50,90,1],[22,80],[12,55],[22,30],[50,55,1]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,8],[2,8],[4,8],[6,8]],
  },
  {
    name: "the reel",
    tag: "cinema",
    quote: "every long film you've ever loved had this exact kind of dark.",
    stars: [[15,30],[25,30,1],[40,30],[55,30,1],[70,30],[85,30],[15,70],[30,70,1],[50,70],[70,70,1],[85,70]],
    lines: [[0,6],[1,7],[2,8],[3,9],[4,10],[5,10],[0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10]],
  },
  {
    name: "the long drive",
    tag: "highway",
    quote: "headlights, low fm, no destination required.",
    stars: [[12,75,1],[28,72],[44,68],[60,64,1],[76,60],[88,55,1],[40,35],[60,30,1],[78,28]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8]],
  },
  {
    name: "the autumn window",
    tag: "october",
    quote: "the season she always returns to. so do i.",
    stars: [[20,20,1],[80,20,1],[20,80,1],[80,80,1],[20,50],[80,50],[50,20],[50,80],[50,50,1]],
    lines: [[0,1],[1,3],[3,2],[2,0],[0,8],[1,8],[2,8],[3,8],[4,5],[6,7]],
  },
];

// Reel — references to films & anime + the available image assets
export const reel = [
  { kind: "image", src: "images/MV5BY2VmN2U2M2QtNGI5ZS00ZDY2LWI5MDYtMmMyMzdhMDVlYTcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    title: "Cowboy Bebop", note: "see you, space cowboy.", rot: -3 },
  { kind: "quote", text: "“the dead don't talk. but they listen.”", note: "— 91 days, in spirit", rot: 2 },
  { kind: "image", src: "images/353258_original.png",
    title: "Attack on Titan", note: "the wall, the wind, the wanting.", rot: -1 },
  { kind: "image", src: "images/Sherlock_Holmes_Full_Body.webp",
    title: "Sherlock", note: "deduction as a love language.", rot: 3 },
  { kind: "image", src: "images/William_James_Moriarty_(Anime).webp",
    title: "Moriarty the Patriot", note: "a quieter kind of devotion.", rot: -2 },
  { kind: "quote", text: "“carpe diem. seize the day, boys.”", note: "— dead poets society", rot: 1 },
  { kind: "image", src: "images/2f5fee6d6073d4253786a1a25b97db0dff-28-mads-mikkelson.rvertical.w330.webp",
    title: "Mads Mikkelsen", note: "the kind of face that holds the room still.", rot: -3 },
  { kind: "quote", text: "“we live in twilight — between memory and dream.”", note: "— a nolan kind of line", rot: 2 },
  { kind: "image", src: "images/Lana_Del_Rey_@_Grammy_Museum_10_13_2019_(49311023203)_(2).jpg",
    title: "Lana Del Rey", note: "cinematic sadness, summer that never ended.", rot: 3 },
  { kind: "image", src: "images/20190715_CigarettesAfterSex_EbruYildiz_388-2-e1571392845870.jpg",
    title: "Cigarettes After Sex", note: "the slow, reverbed kind of evening.", rot: -2 },
  { kind: "image", src: "images/frank-sinatra-circa-1960-color-billboard-1548.webp",
    title: "Sinatra, after hours", note: "for cultural nights and slow drinks.", rot: 1 },
  { kind: "quote", text: "“take my whole life too — i can't help falling.”", note: "— the way old songs stay", rot: -2 },
];
