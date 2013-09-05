/**
 * @license 
 * Copyright 2013 Eric McCarthy <eric@limulus.net>.
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

var path = require("path")

var Job = module.exports = function () {
    this._sourceFiles = []
    this._outputFile = null
}

Job.prototype.compilerArguments = function () {
    return [
        this.sourceFilesArgs()
      , this.outputFileArgs()
    ].reduce(function (left, right) { return left.concat(right) })
}

Job.prototype.addSourceFile = function (file) {
    this._sourceFiles.push(path.resolve(file))
}

Job.prototype.sourceFiles = function () {
    return this._sourceFiles.slice(0)
}

Job.prototype.sourceFilesArgs = function () {
    if (this.sourceFiles().length === 0) {
        throw new Error("Did not specify any source files to compile.")
    }

    var args = []
    this.sourceFiles().forEach(function (file) {
        args.push("--js", file)
    })
    return args
}

Job.prototype.setOutputFile = function (file) {
    this._outputFile = path.resolve(file)
}

Job.prototype.outputFileArgs = function () {
    if (! this._outputFile) {
        throw new Error("Did not specify an output file to compile to.")
    }

    return ["--js_output_file", this._outputFile]
}
