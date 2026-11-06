require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { print } = require('graphql');
const { EditorialService } = require('../dist/editorial/editorial.module.js');
const rich = { raw: { children: [{ type: 'paragraph', children: [{text:'Content'}] }] } };

test('programme list uses published content, Czech fallback, and bounded pagination', async () => {
  const service = new EditorialService({query: async (query, variables) => {
    assert.match(print(query), /stage:\s*PUBLISHED/);
    assert.deepEqual(variables,{locales:['cs','en'],first:13,skip:12});
    return {workoutProgrammes:[{title:'Practice',slug:'practice',goal:'GENERAL_FITNESS',level:'BEGINNER',durationWeeks:2,sessionsPerWeek:3}]};
  }});
  assert.deepEqual(await service.programmes('cs','13','12'),[{title:'Practice',slug:'practice',goal:'general_fitness',level:'beginner',durationWeeks:2,sessionsPerWeek:3}]);
});
test('programme detail unwraps rich text and includes missing exercise links safely', async () => {
  const service = new EditorialService({query: async query => {
    assert.match(print(query),/orderBy:\s*order_ASC/);
    return {workoutProgramme:{id:'internal',title:'Practice',slug:'practice',goal:'GENERAL_FITNESS',level:'BEGINNER',durationWeeks:2,sessionsPerWeek:3,overview:rich,coach:null,heroAsset:null,
      sessions:[{title:'Session',order:1,estimatedMinutes:20,warmup:rich,cooldown:null,exerciseSets:[{order:1,sets:2,repRange:'6–8',restSeconds:90,tempo:null,coachNote:rich,exercise:null}]}]}};
  }});
  const result = await service.programme('practice');
  assert.equal(result.id,undefined);
  assert.deepEqual(result.overview,rich.raw);
  assert.deepEqual(result.sessions[0].warmup,rich.raw);
  assert.equal(result.sessions[0].exerciseSets[0].exercise,null);
});
test('article converts all seven modular block types without exposing CMS IDs', async () => {
  const service = new EditorialService({query: async query => {
    assert.match(print(query),/stage:\s*PUBLISHED/);
    return {article:{title:'Guide',slug:'guide',excerpt:'Overview',author:null,heroAsset:null,relatedExercises:[],relatedProgrammes:[],contentBlocks:[
      {__typename:'RichTextBlock',body:rich}, {__typename:'ExerciseCarouselBlock',heading:'Moves',exercises:[{title:'Squat',slug:'squat'}]},
      {__typename:'MuscleMapBlock',body:rich,muscleGroups:[]}, {__typename:'ComparisonTableBlock',columnHeadings:['A'],rows:[{cells:['B']}]},
      {__typename:'CoachQuoteBlock',quote:'Quote',coach:null}, {__typename:'CalloutBlock',callout:{tone:'TIP',heading:'Tip',body:rich,destination:null}},
      {__typename:'ImageGalleryBlock',heading:'Images',items:[{asset:null,caption:'Missing',altTextOverride:null}]}, {__typename:'FutureBlock'}]}};
  }});
  const result = await service.article('guide');
  assert.deepEqual(result.contentBlocks.map(b=>b.kind),['richText','exercises','muscles','table','quote','callout','gallery','unsupported']);
  assert.deepEqual(result.contentBlocks[0].body,rich.raw);
  assert.deepEqual(result.contentBlocks[3].rows,[['B']]);
  assert.equal(result.contentBlocks[5].tone,'tip');
});
test('article list and missing details have predictable contracts', async () => {
  const service = new EditorialService({query: async query => print(query).includes('ArticleList') ? {articles:[]} : print(query).includes('ProgrammeDetail') ? {workoutProgramme:null} : {article:null}});
  assert.deepEqual(await service.articles(),[]);
  await assert.rejects(service.article('missing'),{status:404});
  await assert.rejects(service.programme('missing'),{status:404});
});
test('invalid inputs never reach the CMS', async () => {
  const service = new EditorialService({query:()=>assert.fail('must not query')});
  await assert.rejects(service.programmes('de'),{status:400});
  await assert.rejects(service.articles('en','101'),{status:400});
  await assert.rejects(service.articles('en','10','-1'),{status:400});
  await assert.rejects(service.article('guide','invalid'),{status:400});
});
