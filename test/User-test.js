import { expect } from 'chai';
import User from '../src/classes/User';
import usersData from '../src/data/users.js';

describe('User', () => {

  let user;

  beforeEach(() => {

    user = new User(usersData[0]);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should hold a single user', () => {
    expect(user.singleUser).to.equal(usersData[0]);
  });

  it('should have a name', () => {
	   expect(user.singleUser.name).to.equal('Saige O\'Kon');
  });

  it('should have an id', () => {
	   expect(user.singleUser.id).to.equal(1);
  });

  it('should have a pantry', () => {
	   expect(user.singleUser.pantry).to.equal(usersData[0].pantry);
  });

  it('should be able to split user\'s name', () => {
	   expect(user.returnUserFirstName()).to.equal('Saige');
  });


});
