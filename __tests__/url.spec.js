import {
  url, apiUrl, defaultProfileImage,
  tokenSelector, loggedInSelector, apiRequest, ServerError,
} from '../app/url';

global.fetch = jest.fn().mockReturnValue(
  Promise.resolve({ status: 200, json: () => 'responseJson' }));

describe('url helper', () => {
  beforeEach(() => {
  });

  it('should expose the constants', () => {
    expect(url).toEqual('http://localhost:8000');
    expect(apiUrl).toEqual('http://localhost:8000/api/v1');
    expect(defaultProfileImage).toEqual('http://localhost:8000/static/members/images/default-avatar.jpg');
  });

  it('should expose the selectors', () => {
    expect(tokenSelector({ session: { token: 'abc123' } })).toEqual('abc123');
    expect(loggedInSelector({ navigation: { loggedIn: true } })).toEqual(true);
  });

  it('should do a fetch request', () => {
    expect.assertions(2);
    return apiRequest('route', 'fetchOpts', null)
      .then((response) => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`, 'fetchOpts');
        expect(response).toEqual('responseJson');
      });
  });

  it('should do a fetch request with params', () => {
    expect.assertions(1);
    return apiRequest('route', 'fetchOpts', {
      params: 'value',
    }).then(() => {
      expect(global.fetch).toBeCalledWith(`${apiUrl}/route/?params=value`, 'fetchOpts');
    });
  });

  it('should generate the url parameters', () => {
    expect.assertions(2);
    return apiRequest('route', 'fetchOpts', null)
      .then((response) => {
        expect(global.fetch).toBeCalledWith(`${apiUrl}/route/`, 'fetchOpts');
        expect(response).toEqual('responseJson');
      });
  });

  it('should throw a server error', () => {
    expect.assertions(1);
    const response = { status: 404, json: () => 'responseJson' };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', 'fetchOpts', null)
      .catch(e => expect(e).toEqual(new ServerError('Invalid status code: 404', response)));
  });

  it('should return an empty response on status 204', () => {
    expect.assertions(1);
    const response = { status: 204, json: () => 'responseJson' };
    global.fetch.mockReturnValue(Promise.resolve(response));
    return apiRequest('route', 'fetchOpts', null)
      .then(res => expect(res).toEqual({}));
  });
});
