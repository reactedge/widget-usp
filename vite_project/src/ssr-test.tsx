import {renderHtml} from "./ssr/entry.tsx";

const run = async () => {
    const config = await fetch(
        'http://widgets-cdn.co.uk/usp/contracts/reactedge.json'
    ).then(r => r.json());

    console.log(renderHtml(config));
};

run();