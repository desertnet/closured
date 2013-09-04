"use strict"

var closured = require("../index.js")
  , sinon = require("sinon")
  , assert = require("assert")

var compiler
beforeEach(function () {
    compiler = new closured.Compiler()
})

describe("#compile", function () {
    var runner
    beforeEach(function () {
        runner = sinon.expectation.create("closureCommandLineRunner")
        runner.callsArgWithAsync(1, null)  // Call the callback with null
        compiler.setClosureCommandLineRunner(runner)
    })

    it("should call the provided runClosureCommandLine function", function (done) {
        runner.once()
        compiler.compile(null, done)
    })
})

