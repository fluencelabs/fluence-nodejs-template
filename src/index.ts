import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { getRelayTimestamp } from './_aqua/export';

const relay = krasnodar[3];

async function main() {
    await Fluence.start({
        connectTo: relay,
    });

    const timestamp = await getRelayTimestamp();
    console.log(new Date(timestamp));

    await Fluence.stop();
}

main().catch((err) => console.error(err));
