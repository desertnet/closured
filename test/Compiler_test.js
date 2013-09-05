"use strict"

var Compiler = require("../src/Compiler.js")
  , Job = require("../src/Job.js")
  , sinon = require("sinon")
  , assert = require("assert")
  , path = require("path")

describe("Compiler", function () {
    var compiler
    beforeEach(function () {
        compiler = new Compiler()
    })

    describe("-compile", function () {
        var runner
        beforeEach(function () {
            runner = sinon.expectation.create("closureCommandLineRunner")
            runner.callsArgWithAsync(1, null)  // Call the callback with null
            compiler.setClosureCommandLineRunner(runner)
        })

        it("should call runClosureCommandLine function", function (done) {
            var job = new Job()
            job.addSourceFile("foo.js")
            job.setOutputFile("baz.js")

            runner.once().withArgs(job.compilerArguments())

            compiler.compile(job, done)
        })
    })
})

