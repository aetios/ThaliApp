import {
  apiRequest,
  apiUrl,
  defaultProfileImage,
  ServerError,
  url,
} from '../../app/utils/url';

const fetchPromiseResult = {
  status: 200,
  json: () => Promise.resolve('responseJson'),
  clone: global.fetch,
};
global.fetch = jest.fn().mockReturnValue(
  Promise.resolve(fetchPromiseResult));
fetchPromiseResult.clone = global.fetch;

jest.mock('react-native-locale-detector', () => 'en');

describe('url helper', () => {
  beforeEach(() => {
  });

  it('should expose the constants', () => {
    expect(url).toEqual('http://localhost:8000');
    expect(apiUrl).toEqual('http://localhost:8000/api/v1');
    expect(defaultProfileImage).toEqual('http://localhost:8000/static/members/images/default-avatar.jpg');
  });

  it('should do a fetch request', () => {
    expect.assertions(2);
    return apiRequest('route', {}, null)
      .then((response) => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
          { headers: { 'Accept-Language': 'en' } });
        expect(response).toEqual('responseJson');
      });
  });

  it('should do a fetch request with params', () => {
    expect.assertions(1);
    return apiRequest('route', {}, {
      params: 'value',
    }).then(() => {
      expect(global.fetch).toBeCalledWith(`${apiUrl}/route/?params=value`,
        { headers: { 'Accept-Language': 'en' } });
    });
  });

  it('should do a fetch request with headers', () => {
    expect.assertions(1);
    return apiRequest('route', { headers: { Authorization: 'Token abc' } }, null).then(() => {
      expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
        { headers: { 'Accept-Language': 'en', Authorization: 'Token abc' } });
    });
  });

  it('should generate the url parameters', () => {
    expect.assertions(2);
    return apiRequest('route', {}, null)
      .then((response) => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`,
          { headers: { 'Accept-Language': 'en' } });
        expect(response).toEqual('responseJson');
      });
  });

  it('should throw a server error', () => {
    expect.assertions(1);
    const response = {
      status: 404,
      json: () => Promise.resolve('responseJson'),
      clone: () => ({ status: 404 }),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .catch(e => expect(e).toEqual(new ServerError('Invalid status code: 404', response)));
  });

  it('should return an empty response on status 204', () => {
    expect.assertions(1);
    const response = {
      status: 204,
      json: () => Promise.resolve('responseJson'),
      clone: () => ({ status: 204 }),
    };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', {}, null)
      .then(res => expect(res).toEqual({}));
  });
});
