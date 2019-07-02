import SubscribableTaxonomy from './Subscribable'

interface SearchableTaxonomy extends SubscribableTaxonomy {
  search (input: string): Promise<SearchResults> | void
}

// a search result
type Result = {
  id: string,
  value: string,
  relevance: number
}

type SubscribableTaxonomyConfig = {
  maxResults: 6
}

export default class STaxonomy extends SubscribableTaxonomy implements SearchableTaxonomy {
  protected map: Map<string, string> = new Map()
  readonly _results: Result[] = []

  constructor (protected config: SubscribableTaxonomyConfig) {
    super(...arguments)
  }

  clearResults () {
    Object.keys(this.results).forEach(result => this.results[result] = [])
  }

  get results () {
    return this._results
      .sort((a, b) => Number(a.relevance) - Number(b.relevance))
      .reverse()
      .slice(0, this.config.maxResults)
  }

  /**
   * Cauta in searchMap
   * @param input - string de cautat
   * @alias Taxonomy.search
   */
  search (
    input: string
  ) {
    if (!input) return

    const iterator = this.map.entries()

    for (let [key, value] of iterator) {
      if (typeof value === 'function') continue
      const relevance = string_similarity(String(input), value)
      const id = String(key)
      this._results.push({ id, relevance, value })
    }
  }
}

/**
 * Helpers
 */
export const get_bigrams = function (string: string) {
  var i, j, ref, s, v;
  s = string.toLowerCase();
  v = new Array(s.length - 1);
  for (i = j = 0, ref = v.length; j <= ref; i = j += 1) {
    v[i] = s.slice(i, i + 2);
  }
  return v;
};

export const string_similarity = function (str1: string, str2: string) {
  var hit_count, j, k, len, len1, pairs1, pairs2, union, x, y;
  if (str1.length > 0 && str2.length > 0) {
    pairs1 = get_bigrams(str1);
    pairs2 = get_bigrams(str2);
    union = pairs1.length + pairs2.length;
    hit_count = 0;
    for (j = 0, len = pairs1.length; j < len; j++) {
      x = pairs1[j];
      for (k = 0, len1 = pairs2.length; k < len1; k++) {
        y = pairs2[k];
        if (x === y) {
          hit_count++;
        }
      }
    }
    if (hit_count > 0) {
      return (2.0 * hit_count) / union;
    }
  }
  return 0.0;
};
