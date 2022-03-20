import generalSlice from "./generalSlice";
import settingSlice from "./settingSlice";
import userSlice from "./userSlice";

const allSlices = {
  user: userSlice,
  setting: settingSlice,
  general: generalSlice,
};

export default allSlices;
