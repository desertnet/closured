"use strict"

var closured = require("../index.js")
  , sinon = require("sinon")
  , assert = require("assert")

var compiler
beforeEach(function () {
    compiler = new closured.Compiler()
})

function runClosureCommandLineMockSuccess (args, cb) {
    setImmediate(cb(null))
}

describe("#compile", function () {
    var runner
    beforeEach(function () {
        runner = sinon.spy(runClosureCommandLineMockSuccess)
        compiler.setClosureCommandLineRunner(runner)
    })

    it("should call the provided runClosureCommandLine function", function (done) {
        compiler.compile(null, done)
    })
})

