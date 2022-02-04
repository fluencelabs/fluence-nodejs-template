import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { getRelayTimestamp } from './_aqua/export';

// a node in Krasnodar network to connect to
// NOTE: please, choose another index for your app :)
const relay = krasnodar[3];

// private key for own peer
// NOTE: please, create a new one with `npx aqua create_keypair` command
const sk = Buffer.from('SVz4T4yW718wt0rziDVOfiv6+WQbS4lvEtJHEieXcAk=', 'base64');

async function main() {
    // Here is where we create our peer and connect to the network
    await Fluence.start({
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: relay,
    });

    // Fluence.getStatus() returns useful information about peer and it's connection
    console.log('own peer id: ', Fluence.getStatus().peerId);
    console.log('connected to relay: ', Fluence.getStatus().relayPeerId);
    console.log('---\n');

    // here we call aqua function from typescript
    const timestamp = await getRelayTimestamp();
    console.log(new Date(timestamp));

    console.log('\n\npress any key to quit...');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        // Stopping the peer before exiting application \ unit test \ etc is a good practice
        await Fluence.stop();
        process.exit(0);
    });
}

main().catch((err) => console.error(err));
