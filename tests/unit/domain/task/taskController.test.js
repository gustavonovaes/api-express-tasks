const { mockRequest, mockResponse } = require('../../../utils/express');

const taskController = require('../../../../src/domain/task/taskController');
const mockTasks = require('../../../utils/mocks/tasks');

describe('Task', () => {
  it('taskController.index', async () => {
    const req = mockRequest();
    req.$models = {
      Task: {
        find: jest.fn().mockReturnValue(mockTasks),
      },
    };
    const res = mockResponse();

    await taskController.index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ tasks: mockTasks });
  });


  it('taskController.find', async () => {
    const req = mockRequest();
    req.$models = {
      Task: {
        findById: jest.fn().mockReturnValue(true),
      },
    }
    req.params = {
      id: 42
    };

    const res = mockResponse();

    await taskController.find(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ task: true });
  });

  it('taskController.create', async () => {
    const task = {
      name: 'New Task',
      completed: false,
    };

    const req = mockRequest();
    req.$models = {
      Task: {
        create: jest.fn().mockReturnValue(task)
      }
    };
    const res = mockResponse();

    await taskController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ task: expect.objectContaining(task) });
  });

  it('taskController.update', async () => {
    const req = mockRequest();
    req.params.id = 42;
    req.body = {
      name: 'Task updated',
    };
    req.$models = {
      Task: {
        findOneAndUpdate: jest.fn().mockReturnValue(req.body),
      },
    };

    const res = mockResponse();

    await taskController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ task: expect.objectContaining(req.body) });
  });

  it('taskController.delete', async () => {
    const req = mockRequest();
    req.params.id = 42;
    req.$models = {
      Task: {
        findByIdAndDelete: jest.fn().mockReturnValue(req.body),
      },
    };

    const res = mockResponse();

    await taskController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });
});
