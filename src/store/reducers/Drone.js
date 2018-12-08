import * as actions from "../actions";

const initialState = {
  loading: false,
  latitude: null,
  longitude: null,
  temperature: null,
  last_received: null,
  allTemperatures: [],
  allTimestamps: [],
  data: {}
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneDataReceived = (state, action) => {
  const { data } = action.data;
  const { latitude, longitude, metric } = data[data.length-1];

  return {
    ...state,
    loading: false,
    latitude,
    longitude,
    temperature: metric,
    last_received: new Date().getTime(),
    allTemperatures: data.map(d => d.metric),
    allTimestamps: data.map(d => new Date(d.timestamp)),
    data
  };
};

const handlers = {
  [actions.FETCH_DRONE]: startLoading,
  [actions.DRONE_DATA_RECEIVED]: droneDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
