import SmallCorpus from './small-corpus';

describe('SmallCorpus', function() {

  // test data
  var DOCS = [
    'the quick brown fox jumps over the lazy dog',
    'the rain in Spain falls mainly on the plain',
    'to be, or not to be, that is the question'
  ];

  function getWords(doc) {
    return doc;
  }

  // test instance
  var that;

  beforeEach(function() {
    that = new SmallCorpus(DOCS, getWords);
  });

  describe('initialization', function() {
    it('has public interface', function() {
      expect(typeof that._wordsFromString).toEqual('function');
      expect(typeof that.search).toEqual('function');
    });
    it('has properties', function() {
      expect(typeof that.docs).toEqual('object');
      expect(typeof that.IDF).toEqual('object');
      expect(Object.keys(that).length).toEqual(2);
    });
    it('converts all documents', function() {
      expect(that.docs.length).toEqual(3);
    });
    it('converts to { doc:, words: } structure', function() {
      for (var i = 0; i < that.docs.length; i++) {
        expect(Object.keys(that.docs[i])).toEqual(['doc', 'words']);
      }
    });
    it('splits words correctly', function() {
      expect(that.docs[0].words).toEqual(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']);
    });
    it('gets IDF of "the" and "fox" in right order', function() {
      expect(that.IDF['the']).toBeLessThan(that.IDF['fox']);
    });
    it('gets IDF of "spain" and "fox" equal', function() {
      expect(that.IDF['spain']).toEqual(that.IDF['fox']);
    });
    it('gets IDF of "to" and "fox" equal', function() {
      expect(that.IDF['to']).toEqual(that.IDF['fox']);
    });
  });

  describe('_wordsFromString()', function() {
    it('splits nicely', function() {
      var res = that._wordsFromString('the quick brown fox');
      expect(res).toEqual(['the', 'quick', 'brown', 'fox']);
    });
    it('lower-cases things', function() {
      var res = that._wordsFromString('the Quick Brown Fox');
      expect(res).toEqual(['the', 'quick', 'brown', 'fox']);
    });
    it('gets rid of punctuation', function() {
      var res = that._wordsFromString('"the quick, brown, fox!"');
      expect(res).toEqual(['the', 'quick', 'brown', 'fox']);
    });
    it('ignores apostrophes without word-breaking', function() {
      var res = that._wordsFromString('it\'s got its towel');
      expect(res).toEqual(['its', 'got', 'its', 'towel']);
    });
    it('preserves numbers', function() {
      var res = that._wordsFromString('How do you do, Thing1 and Thing2?');
      expect(res).toEqual(['how', 'do', 'you', 'do', 'thing1', 'and', 'thing2']);
    });
  });
});
