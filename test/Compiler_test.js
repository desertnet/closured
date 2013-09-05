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
        var job, spawner, proc
        beforeEach(function () {
            job = new Job()
            job.addSourceFile("foo.js")
            job.setOutputFile("baz.js")

            proc = new CompilerProcessMock()
            spawner = sinon.expectation.create("closureSpawner").returns(proc)
            compiler.setClosureSpawner(spawner)
        })

        it("should call the closure spawner function", function (done) {
            spawner.once().withArgs(job.compilerArguments())

            compiler.compile(job, function (err) {
                assert.ifError(err)
                spawner.verify()
                done()
            })

            proc.emulateSuccess()
        })

        it("should call the callback with an error when the spawn fails", function (done) {
            compiler.compile(job, function (err) {
                assert(err)
                done()
            })

            proc.emulateSpawnError()
        })
    })
})
