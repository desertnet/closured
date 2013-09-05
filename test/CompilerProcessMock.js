"use strict"

var EventEmitter = require("events").EventEmitter
  , inherits = require("util").inherits

var CompilerProcessMock = module.exports = function () {
    EventEmitter.call(this)
    this.stdout = new EventEmitter()
    this.stderr = new EventEmitter()
    this.stdin = new EventEmitter()
}
inherits(CompilerProcessMock, EventEmitter)

CompilerProcessMock.prototype.emulateSuccess = function () {
    setImmediate(function () {
        this.emit("close")
    }.bind(this))
    
    setImmediate(function () {
        this.emit("exit", 0)
    }.bind(this))
}
