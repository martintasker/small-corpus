class SmallCorpus {
  constructor(docs, getString) {
    var self = this;

    this.docs = [];
    this.IDF = {};

    this.docs = docs.map(function(doc) {
      return {
        doc: doc,
        words: self._wordsFromString(getString(doc))
      };
    });

    var corpusWordIndex = {}; // count of documents in corpus including each word

    this.docs.forEach(function(doc) {
      var docWordIndex = {};
      doc.words.forEach(function(word) {
        docWordIndex[word] = true;
      });
      Object.keys(docWordIndex).forEach(function(word) {
        corpusWordIndex[word] = corpusWordIndex[word] + 1 || 1;
      });
    });

    Object.keys(corpusWordIndex).forEach(function(word) {
      self.IDF[word] = 1 / (1 + Math.log(corpusWordIndex[word]));
    });

    corpusWordIndex = null; // free the memory
  }

  _wordsFromString(string) {
    string = string.replace(/'/gi, '');
    string = string.replace(/[^\w\s]/gi, ' ');
    return string.toLowerCase().split(" ").filter(function(v) {
      return !!v;
    });
  };

  search(term) {
    var self = this;
    var terms = this._wordsFromString(term);
    var hits = this.docs.map(function(item) {
      var missedAnyTerm = false;
      var bestTermRank = 0;
      terms.forEach(function(term) {
        var hitThisTerm = false;
        var thisTermRank = 0;
        item.words.forEach(function(word) {
          if (word.indexOf(term) === 0) {
            thisTermRank = Math.max(thisTermRank, self.IDF[word]);
            hitThisTerm = true;
          }
        });
        if (!hitThisTerm) {
          missedAnyTerm = true;
        } else {
          bestTermRank = Math.max(bestTermRank, thisTermRank);
        }
      });
      var res = {
        item: item,
        rank: missedAnyTerm
          ? 0
          : bestTermRank
      };
      return res;
    }).filter(function(item) {
      return !term || item.rank > 0;
    }).sort(function(a, b) {
      return b.rank - a.rank;
    }).map(function(item) {
      return item.item.doc;
    });
    return hits;
  }
}

export default SmallCorpus;
