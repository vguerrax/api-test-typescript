import { allure } from 'allure-mocha/runtime';

function objectToArray(object: any) {
  let array: string = '';
  Object.keys(object).forEach((key) => {
    array += (`  ${key}='${object[key]}'\n`);
  });
  return array;
}

function mountResponse(response: any, reqBody?: any) {
  return `${String(response.request.method).toUpperCase()} ${response.request.url}\n
Status Code: ${response.statusCode}\n
Request Headers:\n${objectToArray(response.request.header)}
Response Headers:\n${objectToArray(response.headers)}
${reqBody ? `Request Body:\n${JSON.stringify(reqBody, null, 2)}\n` : ''}
Response Body:\n${JSON.stringify(response.body, null, 2)}`;
}

export function attachResponse(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  if (typeof descriptor.value === 'function') {
    const declaredFn = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async (...args: any) => {
      const response = await declaredFn.apply(target, args);
      allure.testAttachment(propertyKey, mountResponse(response, (['put', 'post'].includes(response.request.method) ? args[0] : null)), 'text/plain');
      return response;
    };
  }
}
