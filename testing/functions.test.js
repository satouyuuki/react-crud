const functions = require('./functions');

// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

// beforeAll(() => initDatabase());
// afterAll(() => closeDatabase());

// const initDatabase = () => console.log('Databases Initialized...');
// const closeDatabase = () => console.log('Databases Closed...');
const nameCheck = () => console.log('Checking Name...');

describe('Checking Names', () => {
  beforeEach(() => nameCheck());
  test('User is Feff', () => {
    const user = 'Jeff';
    expect(user).toBe('Jeff');
  });
  test('User is Karen', () => {
    const user = 'Karen';
    expect(user).toBe('Karen');
  });
});

// toBe
test('Adds 2 + 2 to equal 4', () => {
  expect(functions.add(2, 2)).toBe(4);
});

// not
test('Adds 2 + 2 to NOT equal 5', () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// check for truthy & falsy values
// tobenull matches only null
// tobeundefined matches only undefined
// tobedefined is the opposite of tobeundefuned
// tobetruthy matches anything that an if statement treats as true
// tobefalsy matches anything that an if sttement treats as false

// toBeNull
test('Should be null', () => {
  expect(functions.isNull()).toBeNull();
});

// toBeFalsy
test('Should be falsy', () => {
  expect(functions.checkValue(0)).toBeFalsy();
});

// toEqual not toBe
test('User should be Brad Traversy object', () => {
  expect(functions.createUser()).toEqual({
    firstName: 'Brad',
    lastName: 'Traversy'
  });
});

// Less than and greater than
test('Should be under 1600', () => {
  const load1 = 800;
  const load2 = 800;
  expect(load1 + load2).toBeLessThanOrEqual(1600);
});

// Regex
test('There is not I in team', () => {
  expect('team').not.toMatch(/I/i);
});

// Arrays
test('Admin should be in usernames', () => {
  usernames = ['john', 'karen', 'admin'];
  expect(usernames).toContain('admin');
});

// Working with async data

// Promise
// test('User fetched name should be Leanne Graham', async () => {
//   expect.assertions(1);
  // return functions.fetchUser()
  //   .then(data => {
  //     expect(data.name).toEqual('Leanne Graham1');
  //   })
// });

// Async Await
test('User fetched name should be Leanne Graham', async () => {
  expect.assertions(1);
  const data = await functions.fetchUser();
  expect(data.name).toEqual('Leanne Graham');
});