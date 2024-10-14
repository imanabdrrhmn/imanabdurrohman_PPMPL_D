const sinon = require('sinon');
const { expect } = require('chai');
const Service = require('../src/service');
const Repository = require('../src/repository');
const PrimaryRepository = require('../src/repository');
const SecondaryRepository = require('../src/secondaryRepository');
const { describe, beforeEach, it } = require('mocha');

//NOMOR 1
describe('Service Integration Tests', () => {
  let service;
  let repositoryStub;
  let secondaryRepositoryStub;
  let primaryRepositoryStub;

  beforeEach(() => {
    repositoryStub = sinon.createStubInstance(Repository);
    primaryRepositoryStub = sinon.createStubInstance(Repository);
    secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
    
    
    service = new Service;
    service.repository = repositoryStub;
    service.primaryRepository = primaryRepositoryStub; 
    service.secondaryRepository = secondaryRepositoryStub;
  });

  it('should return all items', () => {
    const items = [{id: 1, name:'Item 1'},{id:2, name:'Item 2'}];
    repositoryStub.getAllItems.returns(items);
    const result = service.getAllItems();
    expect(result).to.equal(items);
    expect(repositoryStub.getAllItems.calledOnce).to.be.true;
  });

  it('should return an item by id', () => {
    const item = {id: 1, name:'Item 1'};
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);
    const result = service.getItemById(1);
    expect(result).to.deep.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
  });

  it('should throw an error when item is not found', () => {
    primaryRepositoryStub.getItemById.withArgs(3).returns(null);
    secondaryRepositoryStub.getItemById.withArgs(3).returns(null);
    expect(() => service.getItemById(3)).to.throw('Item not found in both repositories');
    expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
  });

  it('should add a new item', () => {
    repositoryStub.getAllItems.returns([{id: 1, name:'Item 1'},{id:2, name:'Item 2'}]);
    const newItem = { id: 3, name: 'Item 3' };
    repositoryStub.addItem.returns(newItem);
    const result = service.addItem('Item 3');
    expect(result).to.deep.equal(newItem);
    expect(repositoryStub.addItem.calledOnceWith(newItem)).to.be.true;
});
});



// NOMOR 3
describe('Service Integration Tests with Multiple Stubs',() => {
  let service;
  let primaryRepositoryStub;
  let secondaryRepositoryStub;
  
  beforeEach(() => {
    primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
    secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
    service = new Service();
    
    service.primaryRepository = primaryRepositoryStub;
    service.secondaryRepository = secondaryRepositoryStub;
  });

  it('should return item from primary repository if found', () => {
    const item = {id:1, name: 'Item 1'};
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);
    const result = service.getItemById(1);
    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true
  });

  it('should return item from secondary repository if not found in primary', () => {
    primaryRepositoryStub.getItemById.withArgs(3).returns(null);
    const item = { id: 3, name: 'Item 3'};
    secondaryRepositoryStub.getItemById.withArgs(3).returns(item);
    const result = service.getItemById(3);
    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
  });

  it('should throw an error if item is not found in both repositories', ()=> {
    primaryRepositoryStub.getItemById.withArgs(5).returns(null);
    secondaryRepositoryStub.getItemById.withArgs(5).returns(null);

    expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
    expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
  })
  it('should delete an item by id from the primary repository', () => {
    const item = { id: 1, name: 'Item 1' };
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);
    primaryRepositoryStub.deleteItemById.withArgs(1).returns(item);
    const result = service.deleteItemById(1);
    expect(result).to.deep.equal(item);
    expect(primaryRepositoryStub.deleteItemById.calledOnceWith(1)).to.be.true;
  });

  it('should delete an item by id from the secondary repository if not found in primary', () => {
    const item = { id: 3, name: 'Item 3' };
    primaryRepositoryStub.getItemById.withArgs(3).returns(null); // Not in primary
    secondaryRepositoryStub.getItemById.withArgs(3).returns(item); // Found in secondary
    secondaryRepositoryStub.deleteItemById.withArgs(3).returns(item);
    const result = service.deleteItemById(3);
    expect(result).to.deep.equal(item);
    expect(secondaryRepositoryStub.deleteItemById.calledOnceWith(3)).to.be.true;
  });

  it('should throw an error if item is not found in both repositories', () => {
    primaryRepositoryStub.getItemById.withArgs(5).returns(null);
    secondaryRepositoryStub.getItemById.withArgs(5).returns(null);
    expect(() => service.deleteItemById(5)).to.throw('Item not found in both repositories');
    expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
  });
});