// @vitest-environment jsdom
import {afterEach,beforeEach,expect,it,vi} from "vitest";
import {cleanup,fireEvent,render,screen,waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {WorkoutIntentPage} from "./WorkoutIntentPage";
import {getMuscleGroups,saveWorkoutIntent} from "./api/client";
vi.mock('./api/client',()=>({getMuscleGroups:vi.fn(),saveWorkoutIntent:vi.fn()}));
beforeEach(()=>{
  vi.mocked(getMuscleGroups).mockResolvedValue([{name:'Quadriceps',slug:'quadriceps'},{name:'Glutes',slug:'glutes'},{name:'Chest',slug:'chest'},{name:'Back',slug:'back'}]);
  vi.mocked(saveWorkoutIntent).mockResolvedValue();
});
afterEach(()=>{cleanup();vi.resetAllMocks();});
it('requires consent before submission',async()=>{
  render(<WorkoutIntentPage locale="en" />);
  await screen.findByLabelText('Quadriceps');
  fireEvent.submit(screen.getByRole('button',{name:'Save workout request'}).closest('form')!);
  expect(await screen.findByRole('alert')).toBeTruthy();expect(saveWorkoutIntent).not.toHaveBeenCalled();
});
it('submits minimal preferences and a clear receipt without returning personal data',async()=>{
  const user=userEvent.setup();render(<WorkoutIntentPage locale="en" />);
  await user.click(await screen.findByLabelText('Quadriceps'));
  await user.click(screen.getByLabelText(/I agree to store/));
  await user.click(screen.getByRole('button',{name:'Save workout request'}));
  await screen.findByRole('heading',{name:'Workout request saved'});
  expect(saveWorkoutIntent).toHaveBeenCalledWith({goal:'general-fitness',availableMinutes:45,experienceLevel:'beginner',selectedMuscles:['quadriceps'],consent:true});
});
it('caps muscle selection at three',async()=>{
  const user=userEvent.setup();render(<WorkoutIntentPage locale="en" />);
  await user.click(await screen.findByLabelText('Quadriceps'));await user.click(screen.getByLabelText('Glutes'));await user.click(screen.getByLabelText('Chest'));
  expect((screen.getByLabelText('Back') as HTMLInputElement).disabled).toBe(true);
});
it('disables duplicate submissions while saving and reports failure',async()=>{
  const user=userEvent.setup();let reject!: (e:Error)=>void;
  vi.mocked(saveWorkoutIntent).mockImplementation(()=>new Promise((_resolve,rejectPromise)=>{reject=rejectPromise;}));
  render(<WorkoutIntentPage locale="en" />);
  await user.click(screen.getByLabelText(/I agree to store/));await user.click(screen.getByRole('button',{name:'Save workout request'}));
  expect((screen.getByRole('button',{name:'Saving…'}) as HTMLButtonElement).closest('fieldset')?.disabled).toBe(true);
  reject(new Error('Saving is not configured.'));
  await waitFor(()=>expect(screen.getByRole('alert').textContent).toBe('Saving is not configured.'));
  expect(saveWorkoutIntent).toHaveBeenCalledTimes(1);
});
