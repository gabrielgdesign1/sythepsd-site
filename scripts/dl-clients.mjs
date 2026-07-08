import sharp from "sharp";
import { mkdirSync } from "fs";
const OUT = "public/clients";
mkdirSync(OUT, { recursive: true });
const BASE = "https://www.sythepsd.com";
const list = [
  ["oCmz","/pfps/oCmz.jpg"],["Clix","/pfps/Clix.jpg"],["Mitzuu","/pfps/Mitzuu.png"],
  ["Letshe","/pfps/Letshe.jpg"],["Amar","/pfps/Amar.jpg"],["Peterbot","/pfps/Peterbot.jpg"],
  ["Maxsialtele","/pfps/Max.jpg"],["Wolfiez","/pfps/Wolfiez.jpg"],["Reet","/pfps/Reet.jpg"],
  ["Setty","/pfps/Setty.jpg"],["Malibuca","/pfps/Malibuca.jpg"],["Highman","/pfps/Highman.jpg"],
  ["Merstach","/pfps/Merstach.jpg"],["Paul2M","/pfps/Paul2m.jpg"],["Rubix","/pfps/Rubix.jpg"],
  ["DestinyJesus","/pfps/DestinysJesus.jpg"],["ZyzTM","/pfps/Zyztm.jpg"],["Hardfind","/pfps/Hardfind.jpg"],
  ["Oatley","/pfps/Oatley.jpg"],["LolliFN","/pfps/LolliFN.jpg"],["ThomasHD","/pfps/Th0masHD.jpg"],
];
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]/g, "");
let ok = 0;
for (const [name, path] of list) {
  try {
    const res = await fetch(BASE + path);
    if (!res.ok) { console.log("FAIL", name, res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).resize(300, 300, { fit: "cover" }).webp({ quality: 86 }).toFile(`${OUT}/${slug(name)}.webp`);
    ok++;
  } catch (e) { console.log("ERR", name, e.message); }
}
console.log("done", ok, "/", list.length);
