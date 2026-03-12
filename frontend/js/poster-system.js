window.addEventListener("load",()=>{

const rows = document.querySelectorAll(
".movie-row, .trailer-row, .picks-row"
);

rows.forEach(row=>{

const posters = row.querySelectorAll("img");

/* FIRST 10 POSTERS */

posters.forEach((img,index)=>{

/* FIX 1: CORS issue */
img.crossOrigin = "anonymous";

if(index < 10){

img.onload = ()=>{

try{

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = img.naturalWidth;
canvas.height = img.naturalHeight;

ctx.drawImage(img,0,0);

const data = ctx.getImageData(
0,0,canvas.width,canvas.height
).data;

let brightness = 0;

for(let i=0;i<data.length;i+=4){
brightness += (data[i]+data[i+1]+data[i+2])/3;
}

brightness = brightness/(data.length/4);

/* IF POSTER DARK */

if(brightness < 85){

img.style.filter =
"brightness(1.4) contrast(1.2) saturate(1.4)";

}

}catch(e){
console.log("Poster brightness check skipped");
}

};

}

});

/* SCROLL AREA = MIXED */

row.addEventListener("scroll",()=>{

posters.forEach((img,index)=>{

if(index >= 10){
img.style.filter = "none";
}

});

});

});

});
