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

var EventEmitter = require("events").EventEmitter
  , inherits = require("util").inherits

var CompilerProcessMock = module.exports = function () {
    EventEmitter.call(this)
    this.stdout = new EventEmitter()
    this.stderr = new EventEmitter()
    this.stdin = new EventEmitter()
}
inherits(CompilerProcessMock, EventEmitter)

CompilerProcessMock.prototype.emulateSuccess = function () {
    setImmediate(function () {
        this.emit("close")
    }.bind(this))
    
    setImmediate(function () {
        this.emit("exit", 0)
    }.bind(this))
}

CompilerProcessMock.prototype.emulateSpawnError = function () {
    setImmediate(function () {
        var err = new Error("spawn ENOENT")
        err.code = err.errno = "ENOENT"
        err.syscall = "spawn"
        this.emit("error", err)
    }.bind(this))
}
