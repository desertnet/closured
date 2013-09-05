"use strict"

var Compiler = require("../src/Compiler.js")
  , Job = require("../src/Job.js")
  , CompilerProcessMock = require("./CompilerProcessMock.js")
  , sinon = require("sinon")
  , assert = require("assert")
  , path = require("path")

describe("Compiler", function () {
    var compiler
    beforeEach(function () {
        compiler = new Compiler()
    })

    describe("-compile", function () {
        var runner, proc
        beforeEach(function () {
            proc = new CompilerProcessMock()
            runner = sinon.expectation.create("closureCommandLineRunner").returns(proc)
            compiler.setClosureCommandLineRunner(runner)
        })

        it("should call runClosureCommandLine function", function (done) {
            var job = new Job()
            job.addSourceFile("foo.js")
            job.setOutputFile("baz.js")

            runner.once().withArgs(job.compilerArguments())

            compiler.compile(job, function () {
                runner.verify()
                done()
            })

            proc.emulateSuccess()
        })
    })
})
