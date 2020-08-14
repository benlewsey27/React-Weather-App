const helper = require('./index.js');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (city) => {
  const req = {};

  req.params = { city }
  return req;
};

test('successful call to OpenWeatherMap API should respond with a 200 status code', async () => {
  helper.getWeatherData = jest.fn();
  helper.getWeatherData.mockImplementation(() => {
    return ({
      data: {
        main: {
          temp: 0
        }
      }
    })
  })
  
  const req = mockRequest('test');
  const res = mockResponse();

  await helper.getTemp(req, res);

  expect(helper.getWeatherData).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith({
    city: 'Test',
    temp: -273.1
  });
});

test('failed call to OpenWeatherMap API should throw error', async () => {
  helper.getWeatherData = jest.fn();
  helper.getWeatherData.mockImplementation(() => {
    throw new Error('Hello World');
  })
  
  const req = mockRequest('test');
  const res = mockResponse();

  await helper.getTemp(req, res);

  expect(helper.getWeatherData).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith("ERROR: Failed to retrive weather data")
});

