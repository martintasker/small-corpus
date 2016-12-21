(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SmallCorpus"] = factory();
	else
		root["SmallCorpus"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SmallCorpus = function () {
	  function SmallCorpus(docs, getString) {
	    _classCallCheck(this, SmallCorpus);
	
	    var self = this;
	
	    this.docs = [];
	    this.IDF = {};
	
	    this.docs = docs.map(function (doc) {
	      return {
	        doc: doc,
	        words: self._wordsFromString(getString(doc))
	      };
	    });
	
	    var corpusWordIndex = {}; // count of documents in corpus including each word
	
	    this.docs.forEach(function (doc) {
	      var docWordIndex = {};
	      doc.words.forEach(function (word) {
	        docWordIndex[word] = true;
	      });
	      Object.keys(docWordIndex).forEach(function (word) {
	        corpusWordIndex[word] = corpusWordIndex[word] + 1 || 1;
	      });
	    });
	
	    Object.keys(corpusWordIndex).forEach(function (word) {
	      self.IDF[word] = 1 / (1 + Math.log(corpusWordIndex[word]));
	    });
	
	    corpusWordIndex = null; // free the memory
	  }
	
	  _createClass(SmallCorpus, [{
	    key: '_wordsFromString',
	    value: function _wordsFromString(string) {
	      string = string.replace(/'/gi, '');
	      string = string.replace(/[^\w\s]/gi, ' ');
	      return string.toLowerCase().split(" ").filter(function (v) {
	        return !!v;
	      });
	    }
	  }, {
	    key: 'search',
	    value: function search(term) {
	      var self = this;
	      var terms = this._wordsFromString(term);
	      var hits = this.docs.map(function (item) {
	        var missedAnyTerm = false;
	        var bestTermRank = 0;
	        terms.forEach(function (term) {
	          var hitThisTerm = false;
	          var thisTermRank = 0;
	          item.words.forEach(function (word) {
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
	          rank: missedAnyTerm ? 0 : bestTermRank
	        };
	        return res;
	      }).filter(function (item) {
	        return !term || item.rank > 0;
	      }).sort(function (a, b) {
	        return b.rank - a.rank;
	      }).map(function (item) {
	        return item.item.doc;
	      });
	      return hits;
	    }
	  }]);
	
	  return SmallCorpus;
	}();
	
	exports.default = SmallCorpus;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=small-corpus.js.map