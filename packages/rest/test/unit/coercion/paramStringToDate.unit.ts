// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {test} from './utils';
import {ParameterLocation} from '@loopback/openapi-v3-types';

const DATE_PARAM = {
  in: <ParameterLocation>'path',
  name: 'aparameter',
  schema: {type: 'string', format: 'date'},
};

describe('coerce param from string to date', () => {
  test(DATE_PARAM, '2015-03-01', new Date('2015-03-01'));
});


// const regex_datetime = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/ 
// const regex_date = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])/