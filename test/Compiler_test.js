/**
 * @license Copyright 2013-2014 DesertNet, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict"

var Compiler = require("../lib/Compiler.js")
  , Job = require("../lib/Job.js")
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
