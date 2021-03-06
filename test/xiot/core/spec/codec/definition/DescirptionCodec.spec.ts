import { expect } from 'chai';
import 'mocha';
import {diff} from 'yajsondiff';
import * as fs from 'async-file';
import {DescriptionCodec} from '../../../../../../src';

describe('EventDefinitionCodec', async () => {

    const folder = './resources/spec/xiot/description/';

    const dir = await fs.readdir(folder);

    it('reading descriptions, folder: ' + folder, () => {
        expect(true).to.equal(true);
    });

    for (const file of dir) {
        it('  check: ' + file, async () => {
            const a = await fs.readFile(folder + file);
            const json = JSON.parse(a.toString());
            const def = DescriptionCodec.decode(json);

            const differences = diff(json, DescriptionCodec.encode(def));
            if (differences == null) {
                expect(true).to.equal(true);
            } else {
                expect(JSON.stringify(json)).to.equal(JSON.stringify(DescriptionCodec.encode(def)));
            }
        });
    }
});
