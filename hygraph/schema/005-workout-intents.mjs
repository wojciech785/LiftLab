/** Private intake entries; never publish these or grant public read permissions. */
export function scheduleWorkoutIntents(client) {
  client.createModel({apiId:"WorkoutIntent",apiIdPlural:"WorkoutIntents",displayName:"Workout Intent",description:"Private saved workout request. Draft only; do not grant public read or publish access."});
  client.createEnumerableField({parentApiId:"WorkoutIntent",apiId:"goal",enumerationApiId:"TrainingGoal",displayName:"Training Goal",isRequired:true});
  client.createSimpleField({parentApiId:"WorkoutIntent",apiId:"availableMinutes",type:"INT",displayName:"Available Minutes",isRequired:true});
  client.createEnumerableField({parentApiId:"WorkoutIntent",apiId:"experienceLevel",enumerationApiId:"Difficulty",displayName:"Experience Level",isRequired:true});
  client.createSimpleField({parentApiId:"WorkoutIntent",apiId:"consent",type:"BOOLEAN",displayName:"Storage Consent",isRequired:true,initialValue:"false"});
  client.createSimpleField({parentApiId:"WorkoutIntent",apiId:"contactEmail",type:"STRING",displayName:"Contact Email",description:"Optional. Store only with explicit consent. Do not publish."});
  client.createEnumerableField({parentApiId:"WorkoutIntent",apiId:"intentStatus",enumerationApiId:"WorkoutIntentStatus",displayName:"Intent Status",isRequired:true,initialValue:"NEW"});
  client.createRelationalField({parentApiId:"WorkoutIntent",apiId:"selectedMuscles",type:"RELATION",displayName:"Selected Muscles",isList:true,
    reverseField:{apiId:"workoutIntentMuscleUses",modelApiId:"MuscleGroup",displayName:"Workout Intent Uses",isList:true,isUnidirectional:true,position:-1}});
}
