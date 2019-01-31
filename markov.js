/**
Crispy - An annoying bot.
Copyright (C) 2018  Guilherme Caulada (Sighmir)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const mv = require('node-markovify')
const pos = require('pos')

class MarkovText extends mv.markovText {
  constructor(kwargs={}) {
    super()
    let json = kwargs.json
    let user_model = {}
    let mixed_model = {}
    let mixed_corpus = []
    let json_data = {}
    if (kwargs.json) {
      json_data = JSON.parse(kwargs.json)
      kwargs.json = false
      for (let user in json_data) {
        if (json_data[user].constructor !== Array) json_data[user] = Array.from(json_data[user])
        kwargs.corpus = json_data[user]
        user_model[user] = new MarkovText(kwargs)
        user_model[user].username = user
        mixed_corpus.push(...json_data[user])
      }
      kwargs.corpus = mixed_corpus
      mixed_model = new MarkovText(kwargs)
    }
    this.file = kwargs.file
    this.training = kwargs.training
    this.user_model = user_model
    this.mixed_model = mixed_model
    this.json_data = json_data
    this.json = json
    this.corpus = kwargs.corpus != null ? kwargs.corpus : []
    if (this.corpus.length > 25) {
      this.init(kwargs)
      this.ready = true
    }
  }

  make_sentence_from(message, max_chars, kwargs) {
    let tries = kwargs.tries != null ? kwargs.tries : 10
    let similarity = kwargs.similarity != null ? kwargs.similarity : 0.5
    let case_sensitive = kwargs.case_sensitive != null ? kwargs.case_sensitive : true
    let filter = kwargs.filter != null ? kwargs.filter : new Set()
    let message_pos = MarkovText.get_important_pos(message, case_sensitive)
    let model = this
    if (model.json) {
      model = this.mixed_model
      if (kwargs.username) {
        if (this.user_model[kwargs.username]) {
          model = this.user_model[kwargs.username]
          model.username = kwargs.username
        }
      }
    }
    if (model.ready) {
      let sentences = Array.from(new Set(model.predict({
        init_state: null,
        max_chars: max_chars,
        numberOfSentences: tries,
        popularFirstWord: false
      }))).filter(sentence => !filter.has(sentence))
      for (let sentence of sentences) {
        let sentence_pos = MarkovText.get_important_pos(sentence, case_sensitive)
        let score = MarkovText.sequence_matcher(message_pos, sentence_pos)
        if (kwargs.debug) console.log(score, sentence)
        if (kwargs.debug) console.log(message_pos, sentence_pos)
        if (score > similarity) {
          return sentence
        }
      }
    }
    if (model.username) {
      kwargs.username = false
      return this.make_sentence_from(message, max_chars, kwargs)
    }
  }

  make_sentence(max_len, kwargs={}) {
    return this.make_sentence_from('', max_len, {tries: kwargs.tries, filter: kwargs.cache, case_sensitive: kwargs.case_sensitive})
  }

  async add_text(text, kwargs) {
    if (!this.has_text(text, kwargs)) {
      if (this.json) {
        this.mixed_model.corpus = new Set(this.mixed_model.corpus)
        this.mixed_model.corpus.add(text)
        this.mixed_model.corpus = Array.from(this.mixed_model.corpus)
        this.mixed_model.init(this.mixed_model)
        if (kwargs.username) {
          if (!this.json_data[kwargs.username]) {
            this.json_data[kwargs.username] = new Set()
            this.user_model[kwargs.username] = new MarkovText()
          }
          this.json_data[kwargs.username] = new Set(this.json_data[kwargs.username])
          this.json_data[kwargs.username].add(text)
          this.json_data[kwargs.username] = Array.from(this.json_data[kwargs.username])
          this.user_model[kwargs.username].corpus = new Set(this.user_model[kwargs.username].corpus)
          this.user_model[kwargs.username].corpus.add(text)
          this.user_model[kwargs.username].corpus = Array.from(this.user_model[kwargs.username].corpus)
          this.user_model[kwargs.username].init(this.user_model[kwargs.username])
        }
      } else {
        this.corpus = new Set(this.corpus)
        this.corpus.add(text)
        this.corpus = Array.from(this.corpus)
        this.init(this)
      }
    }
  }

  has_text(text, kwargs) {
    if (this.json) {
      if (kwargs.username) {
        if (!this.json_data[kwargs.username]) {
          this.json_data[kwargs.username] = new Set()
          this.user_model[kwargs.username] = new MarkovText()
        }
        return new Set(this.json_data[kwargs.username]).has(text)
      } else {
        return new Set(this.mixed_model.corpus).has(text)
      }
    } else {
      return new Set(this.corpus).has(text)
    }
  }

  async del_text(text, kwargs) {
    if (this.json) {
      this.mixed_model.corpus = new Set(this.mixed_model.corpus)
      this.mixed_model.corpus.delete(text)
      this.mixed_model.corpus = Array.from(this.mixed_model.corpus)
      this.mixed_model.init(this.mixed_model)
      if (kwargs.username) {
        if (!this.json_data[kwargs.username]) {
          this.json_data[kwargs.username] = new Set()
          this.user_model[kwargs.username] = new MarkovText()
        }
        this.json_data[kwargs.username] = new Set(this.json_data[kwargs.username])
        this.json_data[kwargs.username].delete(text)
        this.json_data[kwargs.username] = Array.from(this.json_data[kwargs.username])
        this.user_model[kwargs.username].corpus = new Set(this.user_model[kwargs.username].corpus)
        this.user_model[kwargs.username].corpus.delete(text)
        this.user_model[kwargs.username].corpus = Array.from(this.user_model[kwargs.username].corpus)
        this.user_model[kwargs.username].init(this.user_model[kwargs.username])
      }
    } else {
      this.corpus = new Set(this.corpus)
      this.corpus.delete(text)
      this.corpus = Array.from(this.corpus)
      this.init(this)
    }
  }

  get_text() {
    if (this.json) return JSON.stringify(this.json_data, null, 2)
    else return this.corpus.join('\n')
  }

  static get_important_pos(message,case_sensitive) {
    let k = []
    let words = new pos.Lexer().lex(message)
    let tags = new pos.Tagger().tag(words)
    if (case_sensitive) {
      for (let t of tags) {
        if (t[1][0] == 'N' || t[1][0] == 'R' || t[1][0] == 'V' || t[1][0] == 'J') {
          k.push(t[0])
        }
      }
    } else {
      for (let t of tags) if (t[1][0] == 'N' || t[1][0] == 'R' || t[1][0] == 'V' || t[1][0] == 'J') {
        k.push(t[0].toLowerCase())
      }
    }
    return Array.from(new Set(k)).sort()
  }

  static sequence_matcher(arr1, arr2) {
    let score = (a1, a2) => {
      let value = 0
      let max_length = Math.max(a1.length, a2.length)
      for (let i = 0; i < max_length; i++) {
        if (a1[i] && a2[i]) {
          if (a1[i].length > 1 && a2[i].length > 1) {
            value += MarkovText.sequence_matcher(a1[i], a2[i])
          } else {
            if (a1[i] === a2[i]) {
              value += 1
            }
          }
        }
      }
      return value / max_length
    }
    if (arr1.length <= arr2.length) {
      return score(arr1, arr2)
    } else {
      return score(arr2, arr1)
    }
  }
}

module.exports=MarkovText