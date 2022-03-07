import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth.reducer";
import studentReducer from "./student.reducer";
import collegeReducer from "./college.reducer";
import programReducer from "./program.reducer";
export const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  college: collegeReducer,
  program: programReducer,
});
const configStorage = {
  key: "root",
  storage,
};
export default persistReducer(configStorage, rootReducer);
