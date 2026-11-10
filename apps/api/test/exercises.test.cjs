require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { print } = require('graphql');
const { ExercisesService } = require('../dist/exercises/exercises.module.js');
const { HygraphService } = require('../dist/hygraph/hygraph.module.js');
const { ListExercisesDocument } = require('../dist/hygraph/generated/operations.js');

test('list uses published content, Czech fallback, filtering, and pagination', async () => {
  const service = new ExercisesService({ query: async (query, variables) => {
    assert.match(print(query), /stage: PUBLISHED/);
    assert.deepEqual(variables, { locales: ['cs', 'en'], first: 10, skip: 20, where: { primaryMuscles_some: { slug: 'quadriceps' } } });
    return { exercises: [{ title: 'Dřep', slug: 'squat', difficulty: 'BEGINNER', primaryMuscles: [{ name: 'Quadriceps', slug: 'quadriceps' }] }] };
  }});
  assert.deepEqual(await service.list('cs', 'quadriceps', '10', '20'), [{ title: 'Dřep', slug: 'squat', difficulty: 'beginner', primaryMuscle: 'quadriceps' }]);
});
test('invalid inputs fail before querying', async () => {
  const service = new ExercisesService({ query: () => assert.fail('must not query') });
  for (const args of [['de'], ['en', undefined, '101'], ['en', undefined, '1.5'], ['en', undefined, '10', '-1']]) {
    await assert.rejects(service.list(...args), { status: 400 });
  }
});
test('muscle filter options include subsequent CMS pages', async () => {
  const firstPage = Array.from({ length: 100 }, (_, i) => ({ name: `Muscle ${i}`, slug: `muscle-${i}` }));
  const service = new ExercisesService({ query: async (query, variables) => {
    assert.match(print(query), /stage: PUBLISHED/);
    assert.deepEqual(variables.locales, ['cs', 'en']);
    return { muscleGroups: variables.skip === 0 ? firstPage : [{ name: 'Last muscle', slug: 'last' }] };
  }});
  const result = await service.muscleGroups('cs');
  assert.equal(result.length, 101);
  assert.equal(result[100].slug, 'last');
});
test('missing published exercise returns 404', async () => {
  const service = new ExercisesService({ query: async query => {
    assert.match(print(query), /stage: PUBLISHED/);
    return { exercise: null };
  }});
  await assert.rejects(service.get('draft-only'), { status: 404 });
});
test('detail maps the public DTO without exposing CMS internals', async () => {
  const service = new ExercisesService({ query: async (_query, variables) => {
    assert.deepEqual(variables, { slug: 'squat', locales: ['en'] });
    return { exercise: { id: 'internal', title: 'Squat', slug: 'squat', difficulty: 'BEGINNER',
      primaryMuscles: [], summary: 'Overview', instructions: { text: 'Instructions' },
      modality: 'BODYWEIGHT', durationMinutes: null, equipment: [], commonMistakes: ['Knees cave inward'] } };
  }});
  assert.deepEqual(await service.get('squat'), { title: 'Squat', slug: 'squat', difficulty: 'beginner',
    primaryMuscle: '', primaryMuscles: [], summary: 'Overview', instructions: 'Instructions',
    modality: 'bodyweight', durationMinutes: null, equipment: [], commonMistakes: ['Knees cave inward'] });
});
test('unconfigured content access returns 503', async () => {
  await assert.rejects(new HygraphService({ get: () => undefined }).query('query {}', {}), { status: 503 });
});
test('upstream errors are sanitized and credentials stay server-side', async () => {
  const original = global.fetch;
  global.fetch = async (_url, options) => {
    assert.equal(options.headers.Authorization, 'Bearer secret');
    assert.equal(typeof JSON.parse(options.body).query, 'string');
    assert.match(JSON.parse(options.body).query, /query ListExercises/);
    return { ok: true, json: async () => ({ errors: [{ message: 'sensitive upstream detail' }] }) };
  };
  try {
    const config = { get: () => 'configured', getOrThrow: key => key.endsWith('TOKEN') ? 'secret' : 'https://example.test' };
    await assert.rejects(new HygraphService(config).query(ListExercisesDocument, {locales:['en'],first:1,skip:0,where:{}}), error => error.status === 502 && !error.message.includes('sensitive'));
  } finally { global.fetch = original; }
});
