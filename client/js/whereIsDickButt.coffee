React = require 'react'
_ = require 'lodash'
$ = require 'jquery'

{a, p, div, input, canvas} = React.DOM

AppClass = React.createClass

App = React.createFactory AppClass
  dickbuttClick: ->
    console.log 'A'
    
  render: ->
    div {},
      div {className: 'spacer'}
      div {className: 'indent'},
        div {className: 'container'},
          div {className: 'row'},
            p
              className: 'point'
              'Where is dickbutt?'

          div {className: 'row'},
            canvas
              className: 'dickbutt'
              id: 'primaryDickbutt'
              onClick: @dickbuttClick



whereIsDickButt = new App

element = document.getElementById 'content'
React.render whereIsDickButt, element

