React = require 'react'
_ = require 'lodash'
$ = require 'jquery'

AudioContext = window.audioContext or window.webkitAudioContext
audioContext = new AudioContext

{a, p, div, input} = React.DOM

App = React.createFactory AppClass

ctdpnqptfs = new App
  project: project

element = document.getElementById 'content'
React.render ctdpnqptfs, element