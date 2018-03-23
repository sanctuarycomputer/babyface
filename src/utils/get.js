import _ from 'lodash';
export default (obj, path='', fallback) => _.get(obj, path, fallback) || fallback;
