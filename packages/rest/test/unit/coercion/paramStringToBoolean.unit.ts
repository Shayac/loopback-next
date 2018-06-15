// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {test} from './utils';
import {RestHttpErrors} from './../../../';
import {ParameterLocation} from '@loopback/openapi-v3-types';
import { BOOLEAN } from '@loopback/repository';

const BOOLEAN_PARAM = {
  in: <ParameterLocation>'path',
  name: 'aparameter',
  schema: {type: 'boolean'},
};

const REQUIRED_BOOLEAN_PARAM = {
  in: <ParameterLocation>'path',
  name: 'aparameter',
  schema: {type: 'boolean'},
  required: true
}

describe('coerce param from string to boolean', () => {
  test(BOOLEAN_PARAM, 'false', false);
  test(BOOLEAN_PARAM, 'true', true);
});

describe('coerce param from string to boolean - required', function() {
  context('valid values', () => {
    test(REQUIRED_BOOLEAN_PARAM, 'false', false);
    test(REQUIRED_BOOLEAN_PARAM, 'true', true);
  });

  context('empty values trigger ERROR_BAD_REQUEST', () => {
    // null, '' sent from request are converted to raw value ''
    test(
      REQUIRED_BOOLEAN_PARAM,
      '',
      RestHttpErrors.missingRequired(REQUIRED_BOOLEAN_PARAM.name),
    );
  });
});

describe('coerce param from string to boolean - optional', function() {
  context('valid values', () => {
    test(BOOLEAN_PARAM, 'false', false);
    test(BOOLEAN_PARAM, 'true', true);
  });

  context('invalid values should trigger ERROR_BAD_REQUEST', () => {
    test(
      BOOLEAN_PARAM,
      'text',
      RestHttpErrors.invalidData('text', BOOLEAN_PARAM.name),
    );
    test(
      BOOLEAN_PARAM, 
      'null', 
      RestHttpErrors.invalidData('null', BOOLEAN_PARAM.name)
    );
    // {a: true}, [1,2] are converted to object
    test(
      BOOLEAN_PARAM,
      {a: true},
      RestHttpErrors.invalidData({a: true}, BOOLEAN_PARAM.name),
    );
    test(BOOLEAN_PARAM, '1', RestHttpErrors.invalidData(1, BOOLEAN_PARAM.name))
    test(BOOLEAN_PARAM, '0', RestHttpErrors.invalidData(0, BOOLEAN_PARAM.name))
  });

  context('empty collection converts to undefined', () => {
    test(BOOLEAN_PARAM, undefined, undefined);
  });

  context('empty values trigger ERROR_BAD_REQUEST', () => {
    // null, '' sent from request are converted to raw value ''
    test(
      BOOLEAN_PARAM,
      '',
      RestHttpErrors.missingRequired(BOOLEAN_PARAM.name),
    );
  });
});