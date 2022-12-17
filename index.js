const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- bg -->
        <!-- head -->
        <!-- hair -->
        <!-- eyes -->
        <!-- nose -->
        <!-- mouth -->
        <!-- beard -->
    </svg>
`

const takenNames = {};
const takenFaces = {};
let idx = 999;

function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function getRandomName() {
    const adjectives = 'admirable adorable alluring angelic appealing beauteous bewitching captivating charming classy comely cute dazzling delicate delightful divine elegant enthralling enticing excellent exquisite fair fascinating fetching fine foxy good-looking gorgeous graceful grand handsome ideal inviting lovely magnetic magnificent marvelous mesmeric nice pleasing pretty pulchritudinous radiant ravishing refined resplendent shapely slightly splendid statuesque stunning sublime superb symmetrical taking tantalizing teasing tempting well-formed winning wonderful'.split(' ');
    const names = 'Ajit Ajmal Alok Akash Akil Alvi Aman Amoy Amil Abdullah Amir Amit Anil Araf Ajmal Bahar Baman Bablu Babor Bijoy Bikas Bikrom Badhan Chintu Chondon Chandru Chpndu Chinku Chotu Das Dip Don Debu Dev Deepu Damon Dahak Disha Dihan Dulal Dhruvo Ditto Dipro Doyel Eshaan Evaan Emon Eshaan Zaman Raisa Tanha Prangoon Rahi Navid Jushraf Aaqil Toke Tarin Alphy Anika Zaman Zeeshan Zyra Lima Messi Ronaldo Alo Samree Mahareen Maha'.split(' ');
    
    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name =  `${randAdj}-${randName}`;


    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}

function getLayer(name, skip=0.0) {
    const svg = readFileSync(`./layers/${name}.svg`, 'utf-8');
    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g
    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : '';
}

async function svgToPng(name) {
    const src = `./out/${name}.svg`;
    const dest = `./out/${name}.png`;

    const img = await sharp(src);
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}


function createImage(idx) {

    const bg = randInt(5);
    const hair = randInt(7);
    const eyes = randInt(9);
    const nose = randInt(4); 
    const mouth = randInt(5);
    const beard = randInt(3);
   
   
  

    const face = [hair, eyes, mouth, nose, beard].join('');

    if (face[takenFaces]) {
        createImage();
    } else {
        const name = getRandomName()
        console.log(name)
        face[takenFaces] = face;

        const final = template
            .replace('<!-- bg -->', getLayer(`bg${bg}`))
            .replace('<!-- head -->', getLayer('head0'))
            .replace('<!-- hair -->', getLayer(`hair${hair}`))
            .replace('<!-- eyes -->', getLayer(`eyes${eyes}`))
            .replace('<!-- nose -->', getLayer(`nose${nose}`))
            .replace('<!-- mouth -->', getLayer(`mouth${mouth}`))
            .replace('<!-- beard -->', getLayer(`beard${beard}`, 0.5))

        const meta = {
            name,
            description: `A drawing of ${name.split('-').join(' ')}`,
            image: `${idx}.png`,
            attributes: [
                { 
                    beard: '',
                    rarity: 0.5
                }
            ]
        }
        writeFileSync(`./out/${idx}.json`, JSON.stringify(meta))
        writeFileSync(`./out/${idx}.svg`, final)
        svgToPng(idx)
    }


}

if (!existsSync('./out')){
    mkdirSync('./out');
}

readdirSync('./out').forEach(f => rmSync(`./out/${f}`));


do {
    createImage(idx);
    idx--;
  } while (idx >= 0);