import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const api = axios.create({
  baseURL: "https://shazz.api.stdlib.com/pool@dev/",
  timeout: 8000,
});

module.exports = {
  getThoughts: async () => {
    try {
      console.log("getting list of thoughts");
      const user_uuid = await AsyncStorage.getItem("@user-uuid");
      if (user_uuid !== null) {
        const headers = { "x-user-uuid": user_uuid };
        const res = await api.get("thought/", { headers });
        return res.data;
      }
      return [];
    } catch (err) {
      console.log(err.response);
      throw new Error(err.message);
    }
  },

  getThisDayThoughts: async (period) => {
    try {
      console.log("getting thought on this day: " + period);
      const user_uuid = await AsyncStorage.getItem("@user-uuid");
      if (user_uuid !== null) {
        const headers = { "x-user-uuid": user_uuid };
        const res = await api.get("on_this_day/", {
          params: { period },
          headers,
        });
        return res.data;
      }
      return [];
    } catch (err) {
      console.log(err.response);
      throw new Error(err.message);
    }
  },

  submitThought: async (thought) => {
    try {
      console.log("submitting thought: " + thought);
      const user_uuid = await AsyncStorage.getItem("@user-uuid");
      let res;
      if (user_uuid !== null) {
        const headers = { "x-user-uuid": user_uuid };
        res = await api.post("thought/", { text: thought }, { headers });
      } else {
        res = await api.post("thought/", { text: thought });
        await AsyncStorage.setItem("@user-uuid", res.data.user_uuid);
      }
      return res.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err.message);
    }
  },
};
