"use strict"

var Job = require("../src/Job.js")
  , assert = require("assert")
  , path = require("path")
  , sinon = require("sinon")

describe("Job", function () {
    var job
    beforeEach(function () {
        job = new Job()
        job.addSourceFile("foo.js")
        job.addSourceFile("bar.js")
        job.setOutputFile("baz.js")
    })

    describe("-addSourceFile", function () {
        it("should put the file at the end of the source file list", function () {
            assert.strictEqual(job.sourceFiles().pop(), path.resolve("bar.js"))
        })
    })

    describe("-sourceFilesArgs", function () {
        it("should return Closure --js arguments", function () {
            assert.deepEqual(job.sourceFilesArgs(), [
                "--js", path.resolve("foo.js")
              , "--js", path.resolve("bar.js")
            ])
        })

        it("should throw an error when called without any source files having been set", function () {
            var emptyJob = new Job()  // Get an empty job object
            assert.throws(function () { emptyJob.sourceFilesArgs() })
        })
    })

    describe("-outputFileArgs", function () {
        it("should return Closure --js_output_file argument", function () {
            assert.deepEqual(job.outputFileArgs(), [
                "--js_output_file", path.resolve("baz.js")
            ])
        })

        it("should throw an error when called without an output file having been set", function () {
            var emptyJob = new Job()  // Get an empty Job object
            assert.throws(function () { emptyJob.outputFileArgs() })
        })
    })

    describe("-compilerArguments", function () {
        it("should return an array containing the source files in the right order", function () {
            assertStringArrayContains(job.compilerArguments(), [
                "--js", path.resolve("foo.js")
              , "--js", path.resolve("bar.js")
            ])
        })

        it("should return an array containing the output file arguments", function () {
            assertStringArrayContains(job.compilerArguments(), [
                "--js_output_file", path.resolve("baz.js")
            ])
        })
    })
})

function assertStringArrayContains (outer, inner) {
    var outerStr = outer.join(",")
      , innerStr = inner.join(",")
      , msg = outerStr + " does not contain " + innerStr
    assert(outerStr.indexOf(innerStr) !== -1, msg)
}
