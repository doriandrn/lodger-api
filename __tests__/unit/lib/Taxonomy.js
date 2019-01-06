import { Taxonomy } from '~/lib/Taxonomy';
describe('Taxonomy class', () => {
    describe('constructor', () => {
        describe('positive', () => {
            test('it inits ok for a known tax', () => {
                const asociatie = new Taxonomy('asociatie');
                expect(asociatie).toBeDefined();
            });
        });
        describe('negative', () => {
            test('it throws for an unknown taxonomy', () => {
                try {
                    new Taxonomy('masina');
                }
                catch (e) {
                    expect(e).toBeDefined();
                }
                try {
                    new Taxonomy();
                }
                catch (e) {
                    expect(e).toBeDefined();
                }
                // this  should work actually
                try {
                    new Taxonomy(3);
                }
                catch (e) {
                    expect(e).toBeDefined();
                }
            });
        });
    });
    describe('', () => {
    });
});
/**
 *

taxonomii: {
  asociatie: {
    referencesTaxonomies:
  }
}

Taxonomies holder
+:
  it creates a container that holds all requested taxonomies

-:


Taxonomy
  .plural getter
    +:
      it returns the plural string based on name
    -:
      throws if invalid

  subscribe

*/
//# sourceMappingURL=Taxonomy.js.map