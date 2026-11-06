require('reflect-metadata');
const {test} = require('node:test');
const assert = require('node:assert/strict');
const { print } = require('graphql');
const {ValidationPipe} = require('@nestjs/common');
const {Test} = require('@nestjs/testing');
const {ConfigModule} = require('@nestjs/config');
const {WorkoutIntentsModule,WorkoutIntentsService} = require('../dist/workout-intents/workout-intents.module.js');
const {CreateWorkoutIntentDto} = require('../dist/workout-intents/dto/create-workout-intent.dto.js');
const {HygraphService} = require('../dist/hygraph/hygraph.module.js');
const payload = {goal:'general-fitness',availableMinutes:45,experienceLevel:'beginner',selectedMuscles:['quadriceps'],consent:true};

test('DTO requires consent, valid values, and bounded unique muscle slugs',async()=>{
  const pipe = new ValidationPipe({whitelist:true,transform:true});
  const transform = data=>pipe.transform(data,{type:'body',metatype:CreateWorkoutIntentDto});
  for(const changes of [{consent:false},{consent:undefined},{consent:'true'},{availableMinutes:14},{availableMinutes:45.5},{experienceLevel:'expert'},{goal:'unknown'},{selectedMuscles:['x','x']},{selectedMuscles:['a','b','c','d']},{selectedMuscles:['BAD SLUG']},{contactEmail:'not-email'}]){
    await assert.rejects(transform({...payload,...changes}),{status:400});
  }
  const valid=await transform({...payload,intentStatus:'REVIEWED',unexpected:'ignored'});
  assert.equal(valid.intentStatus,undefined);
  assert.equal(valid.unexpected,undefined);
});
test('write mapping keeps the entry in draft and returns no personal data or CMS IDs',async()=>{
  let wrote=false;
  const service = new WorkoutIntentsService({query:async()=>({muscleGroups:[{slug:'quadriceps'}]}),mutate:async(query,variables)=>{
    wrote=true;assert.match(print(query),/createWorkoutIntent/);assert.doesNotMatch(print(query),/publishWorkoutIntent/);
    assert.deepEqual(variables.data,{goal:'GENERAL_FITNESS',availableMinutes:45,experienceLevel:'BEGINNER',consent:true,intentStatus:'NEW',selectedMuscles:{connect:[{slug:'quadriceps'}]}});
    return {createWorkoutIntent:{id:'private-id'}};
  }});
  assert.deepEqual(await service.create(payload),{accepted:true});assert.equal(wrote,true);
});
test('unknown muscle groups are rejected before a write',async()=>{
  const service = new WorkoutIntentsService({query:async()=>({muscleGroups:[]}),mutate:()=>assert.fail('must not write')});
  await assert.rejects(service.create(payload),{status:400});
});
test('mutation credentials are required and never fall back to a read token',async()=>{
  const service = new HygraphService({get:key=>key.startsWith('HYGRAPH_CONTENT_')?'read-only':undefined});
  await assert.rejects(service.mutate('mutation {}',{}),{status:503});
});
test('HTTP pipeline enforces origin, JSON, validation, rate limiting, and sanitized receipts',async()=>{
  let writes=0;
  const module=await Test.createTestingModule({imports:[ConfigModule.forRoot({isGlobal:true,ignoreEnvFile:true,load:[()=>({WEB_ORIGIN:'http://localhost:5173'})]}),WorkoutIntentsModule]})
    .overrideProvider(HygraphService).useValue({query:async()=>({muscleGroups:[{slug:'quadriceps'}]}),mutate:async()=>{writes++;return {createWorkoutIntent:{id:'private'}};}}).compile();
  const app=module.createNestApplication();app.setGlobalPrefix('api');app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true}));
  await app.listen(0,'127.0.0.1');
  try {
    const url=(await app.getUrl())+'/api/workout-intents';
    const send=(data,origin='http://127.0.0.1:5173',contentType='application/json')=>fetch(url,{method:'POST',headers:{Origin:origin,'Content-Type':contentType},body:JSON.stringify(data)});
    assert.equal((await send(payload,'https://other.example')).status,403);
    assert.equal((await send(payload,'http://localhost:5173','text/plain')).status,403);
    assert.equal((await send({...payload,consent:false})).status,400);
    const saved=await send({...payload,contactEmail:'test@example.com'});
    assert.equal(saved.status,201);assert.deepEqual(await saved.json(),{accepted:true});assert.equal(writes,1);
    let last;for(let i=0;i<5;i++)last=await send(payload);
    assert.equal(last.status,429);assert.ok(writes<=5);
  } finally {await app.close();}
});
