const csscolors = require('css-color-names');

import buttons from './lib/buttons';
import getDirectory from './lib/getDirectory';

main();

async function main(){
    const dir = await getDirectory(['/config', '~/.homeassistant'], true);

    console.log(`PATH: ${dir}`)
    
}