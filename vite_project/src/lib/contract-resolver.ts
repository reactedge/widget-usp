import {WIDGET_ID} from "../UspConfig.ts";

const CDN_URL = 'https://widgets-cdn.co.uk:8459'
export async function getCdnManifest() {
    const manifest = await fetch(`${CDN_URL}/${WIDGET_ID}/contracts/index.json`).then(r => r.json());

    const configs = await Promise.all(
        manifest.contracts.map(async (contract: string) => {
            console.log(contract)
            const data = await fetch(`${CDN_URL}/${WIDGET_ID}/contracts/${contract}`).then(r => r.json());
            console.log(data)
            return {
                url: contract,
                id: contract.split('/').pop(),
                version: data.version || 'v1',
                data
            };
        })
    );

    return configs
}