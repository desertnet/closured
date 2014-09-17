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

var path = require("path")

/**
 * Compiler job. Contains the source files to compile, and their destination.
 * @constructor
 */
var Job = module.exports = function () {
    this._sourceFiles = []
    this._outputFile = null
}

/**
 * @return {Array.<string>} Command line arguments for the compiler command.
 */
Job.prototype.compilerArguments = function () {
    return [
        this.sourceFilesArgs()
      , this.outputFileArgs()
    ].reduce(function (left, right) { return left.concat(right) })
}

/**
 * Add the path of a JS source file to the list of files to comile.
 * @param {string} file The path to the source file.
 */
Job.prototype.addSourceFile = function (file) {
    this._sourceFiles.push(path.resolve(file))
}

/**
 * The paths to the source files files for this job.
 * @return {Array.<string>}
 */
Job.prototype.sourceFiles = function () {
    return this._sourceFiles.slice(0)
}

/**
 * Arguments to pass to the compiler for the source files.
 * @return {Array.<string>}
 */
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

/**
 * Sets the path of the compiled JS output file.
 * @param {string} file The path to the destination file.
 */
Job.prototype.setOutputFile = function (file) {
    this._outputFile = path.resolve(file)
}

/**
 * Arguments to pass to the compiler for the destination file.
 * @return {Array.<string>}
 */
Job.prototype.outputFileArgs = function () {
    if (! this._outputFile) {
        throw new Error("Did not specify an output file to compile to.")
    }

    return ["--js_output_file", this._outputFile]
}
