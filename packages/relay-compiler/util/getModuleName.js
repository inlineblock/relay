/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

const path = require('path');

function getModuleName(filePath: string): string {
  // index.js -> index
  // index.js.flow -> index.js
  let filename = path.basename(filePath, path.extname(filePath));

  // index.js -> index (when extension has multiple segments)
  filename = filename.replace(/(?:\.\w+)+/, '');

  // /path/to/button/index.js -> button
  let moduleName =
    filename === 'index' ? path.basename(path.dirname(filePath)) : filename;

  // Example.ios -> Example
  // Example.product.android -> Example
  moduleName = moduleName.replace(/(?:\.\w+)+/, '');

  // foo-bar -> fooBar
  // Relay compatibility mode splits on _, so we can't use that here.
  moduleName = moduleName.replace(/[^a-zA-Z0-9]+(\w?)/g, (match, next) =>
    next.toUpperCase(),
  );

  return moduleName;
}

module.exports = getModuleName;
