import { merge, groupBy, indexBy, prop, mapObjIndexed } from 'ramda';

import { ActionTypes } from 'modules/org/constants';


const defaultState = {
  org: {
    data: undefined,
    status: undefined,
  },
  indexedProperties: {},
};

const TypeConverters = {
  'json': JSON.parse,
  'boolean': Boolean,
  'number': Number,
  'string': String,
}

const unconvertProperty = ({ name, type, namespace, value }) => {
  try {
    const convertedValue = TypeConverters[type](value);

    return {
      name,
      namespace,
      value: convertedValue
    };
  } catch (err) {
    console.warn('Could not unconvert attribute', `type: ${type}`, `value: ${value}`, `name ${name}`, err);
    return {
      name,
      namespace,
      value,
    };
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.fetchPublicOrgSuccess:
      const org = action.payload;
      // take list of [{ name, namespace, value, type }]
      // and turn it into:
      // { namespace: { name: { value } } }
      const indexedProperties = mapObjIndexed(
        (props) => indexBy(prop('name'), props.map(unconvertProperty)),
        groupBy(
          prop('namespace'),
          org.properties
        )
      )
      return merge(state, { org, indexedProperties });
    default:
      return state;
  }
}