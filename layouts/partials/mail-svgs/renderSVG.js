var TextToSVG = require('text-to-svg');

const textToSVG = TextToSVG.loadSync('Arial.otf');
//const svg = textToSVG.getSVG('fabio.bertagna@fsmib.ch', {
//const svg = textToSVG.getSVG('andreas.gsponer@fsmib.ch', {
//const svg = textToSVG.getSVG('patrick.hodel@fsmib.ch', {
const svg = textToSVG.getSVG('yannik.daellenbach@fsmib.ch', {
//const svg = textToSVG.getSVG('unihack@fsmib.ch', {
    x: 0,
    y: 14,
    fontSize: 16
});
console.log(svg);