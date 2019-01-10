interface SearchableTaxonomy extends SubscribableTaxonomy {
  searchMap: Map<string, string>
  searchResults: SearchResults

  search (input: string): Promise<SearchResults>
}

type SubscriberList<N> = {
  [k: string]: Subscriber<N>[]
}

type SearchResults = {
  [k: string]: Result[]
}

// a search result
type Result = {
  id: string,
  value: string,
  relevance: number
}

