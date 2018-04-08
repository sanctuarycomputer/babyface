import hashify from 'object-hash';
import { createClient } from "contentful";

const {
  REACT_APP_CONTENTFUL_SPACE_ID,
  REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  REACT_APP_CONTENTFUL_HOST,
} = process.env;

const ContentfulData = {
  cache: {
    getEntries: {}
  },
  setRef(contentful) {
    this.contentful = contentful;
  },
  getEntries(query) {
    const hashified = hashify(query);
    if (!!this.cache.getEntries[hashified]) return new Promise(resolve => resolve(this.cache.getEntries[hashified]));

    const promise = this.contentful.getEntries(query).then(val => {
      this.cache.getEntries[hashified] = val;
      return val;
    });
    this.cache.getEntries[hashified] = promise;
    return promise;
  }
};

const contentful = createClient({
  space: REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  host: REACT_APP_CONTENTFUL_HOST
});

ContentfulData.setRef(contentful);

export default ContentfulData;
