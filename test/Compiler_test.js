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
        var spawner, proc
        beforeEach(function () {
            proc = new CompilerProcessMock()
            spawner = sinon.expectation.create("closureSpawner").returns(proc)
            compiler.setClosureSpawner(spawner)
        })

        it("should call the closure spawner function", function (done) {
            var job = new Job()
            job.addSourceFile("foo.js")
            job.setOutputFile("baz.js")

            spawner.once().withArgs(job.compilerArguments())

            compiler.compile(job, function () {
                spawner.verify()
                done()
            })

            proc.emulateSuccess()
        })
    })
})
