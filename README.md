# small-corpus-searcher -- TF-IDF-weighted search of small document corpus

Say you have 100-1000 documents.  They could be products, a music library,
news articles, anything.  You want to offer your SPA web app users a quick
search facility.  `small-corpus-searcher` could be for you.

To get started, `npm install` in the usual way.

To initialize,
```javascript
var index = new SmallCorpusSearcher(items, item => { item.title + ' ' + item.description});
```

The `getWords` function which you pass to the constructor must build a single string for
your document.  Normally, as above, you would just concatenate every text field that you
want to search on (remembering the blanks between).

To search,

```javascript
var hitlist = index.filter('a');
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
how often a given rare word occurs in it.  Multiply the two together and you
have the overall document ranking.  See, eg, [here](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
for more.

This module is (in its current form, anyway) suitable only for a small, static, document corpus,
since its API is synchronous and there's no `add()` function after the constructor.
