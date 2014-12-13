React = require 'react'
_ = require 'lodash'
$ = require 'jquery'

AudioContext = window.audioContext or window.webkitAudioContext
audioContext = new AudioContext

{a, p, div, input} = React.DOM

AppClass = React.createClass

App = React.createFactory AppClass
  render: ->
    div {},
      div {className: 'spacer'}
      div {className: 'indent'},
        div {className: 'container'},
          div {className: 'row'},
            p
              className: 'point'
              'HELLO'

whereIsDickButt = new App

element = document.getElementById 'content'
React.render whereIsDickButt, element

