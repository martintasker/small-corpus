# small-corpus -- small document corpus supporting TF-IDF-weighted search

Say you have 100-1000 documents.  They could be products, a music library,
news articles, anything.  You want to offer your SPA web app users a quick
search facility.  `small-corpus` could be for you.

To get started, `npm install` in the usual way.

To initialize,

```javascript
var corpus = new SmallCorpus(items, item => { item.title + ' ' + item.description});
```

The `getWords` function which you pass to the constructor must build a single string for
your document.  Normally, as above, you would just concatenate every text field that you
want to search on (remembering the blanks between).

To search,

```javascript
var hitlist = corpus.search('a');
hitlist.forEach(item => { console.log('found', item); });
```

The above search will _match_ all the words beginning with `a`, as you'd expect.
But it will _rank_ them in order _most interesting first_.  So, all the items where
the very common word `a` occurs will be ranked below items with rarer words, eg
perhaps `aardvark`.  And, items with _several instances_ of a rarer word will be
ranked higher than items with fewer instances.

This ranking is conventional in information retrieval and is known as TF-IDF:
"term-frequency, times inverse document-frequency": the IDF means you rank
words by their rarity in documents, and the TF means you rank documents by
how often a given word occurs in it.  Multiply the two together and you
have the overall document ranking.  See, eg, [here](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
for more.

This is for a _small_ corpus, kept in RAM and searched with a synchronous API.
Bigger corpuses would suffer search-time issues which would ordinarily be addressed with an async API.
Really big corpuses would need a sophisticated database-backed back-end.  `small-corpus` isn't going
to go there: hence the name.

Currently only a _static_ corpus is supported, built with the constructor.  There's no `addDocument()` function.
That could be added later without too much trouble.
