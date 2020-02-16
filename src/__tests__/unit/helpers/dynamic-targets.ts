/**
 * This is only used for dev
 */

import dynamicTargets from 'dynamic-targets';

describe('behaviour', () => {
  test('returns the files" content', () => {
    expect(dynamicTargets['Asociatie.ts']()).toBeDefined()
  })
})
