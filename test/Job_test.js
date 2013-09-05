"use strict"

var Job = require("../src/Job.js")
  , assert = require("assert")
  , path = require("path")
  , sinon = require("sinon")

describe("Job", function () {
    var job
    beforeEach(function () {
        job = new Job()
    })

    describe("-addSourceFile", function () {
        it("should put the file at the end of the source file list", function () {
            job.addSourceFile("foo.js")
            job.addSourceFile("bar.js")
            assert.strictEqual(job.sourceFiles().pop(), path.resolve("bar.js"))
        })
    })

    describe("-sourceFilesArgs", function () {
        it("should return Closure --js arguments", function () {
            job.addSourceFile("foo.js")
            job.addSourceFile("bar.js")
            assert.deepEqual(job.sourceFilesArgs(), [
                "--js", path.resolve("foo.js")
              , "--js", path.resolve("bar.js")
            ])
        })

        it("should throw an error when called without any source files having been set", function () {
            assert.throws(function () { job.sourceFilesArgs() })
        })
    })

    describe("-outputFileArgs", function () {
        it("should return Closure --js_output_file argument", function () {
            job.setOutputFile("baz.js")
            assert.deepEqual(job.outputFileArgs(), [
                "--js_output_file", path.resolve("baz.js")
            ])
        })

        it("should throw an error when called without an output file having been set", function () {
            assert.throws(function () { job.outputFileArgs() })
        })
    })
})
