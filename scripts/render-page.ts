import fs from 'fs/promises';
import {renderHtml} from "../vite_project/src/ssr/entry.tsx";

const run = async () => {
    const config = await fetch(
        'http://widgets-cdn.co.uk:8098/usp/contracts/reactedge.json'
    ).then(r => r.json());

    const page = await fs.readFile(
        './vite_project/src/ssr/index.html',
        'utf8'
    );

    const finalHtml = page.replace(
        '<!-- REACTEDGE_USP -->',
        renderHtml(config)
    );

    await fs.writeFile(
        './dist/page-ssr.html',
        finalHtml
    );

    console.log('SSR page generated');
};

run();