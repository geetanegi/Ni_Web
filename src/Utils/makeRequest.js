import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const {
  REACT_APP_API_URL,
  REACT_APP_FEEDBACK_APIKEY,
  REACT_APP_LUMENORE_APIKEY,
  REACT_APP_BENEFICIARY_TOKEN,
} = process.env;
export const checkError = (response, resolve) => {
  const { data } = response;
  const { description, error, display } = data;
  if (error && display) {
    showError(description);
  }
  if (resolve) {
    resolve(response);
  }
};
export const showError = (error) => {
  if (error?.length) {
    notification.error({
      message: error,
      duration: 5,
    });
  }
};
export const setNewToken = () => {
  const token = Cookies.get("accessToken") || null;
  return token;
};
export const getFeedbackToken = () => {
  return (
    REACT_APP_FEEDBACK_APIKEY ||
    "fiAIR428tlADxPKgoZWhwdmV1D5cyVkhJ9sDJJri8QGjzDfUrTYhd7Xz2LD2EkuE"
  );
};
export const getLumenoreToken = () => {
  return REACT_APP_LUMENORE_APIKEY;
};

export const getRegistrationToken = () => {
  return REACT_APP_BENEFICIARY_TOKEN || "e0b0ae13-3127-48e2-8e64-451b34c203e9";
};

const MakeRequest = {
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${REACT_APP_API_URL}${url}`,
        data: data,
      })
        .then((response) => {
          // checkError(response, resolve);
          resolve(response);
        })
        .catch((error) => {
          reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  postParam(url, data, id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${REACT_APP_API_URL}${url}${id}`,
        data: data,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  postAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${REACT_APP_API_URL}${url}`,
        data: data,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  deleteAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: `${REACT_APP_API_URL}${url}`,
        data: data,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  getAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        data: data,
        url: `${REACT_APP_API_URL}${url}`,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  putAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        data: data,
        url: `${REACT_APP_API_URL}${url}`,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  get(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${REACT_APP_API_URL}${url}`,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error?.response?.data?.message } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  postLumenoreAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${REACT_APP_API_URL}${url}`,
        data: data,
        headers: {
          Authorization: `bearer ${getLumenoreToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  postfeedbackAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${REACT_APP_API_URL}${url}`,
        data: data,
        headers: {
          Authorization: `bearer ${getFeedbackToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  getfeedbackAuth(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${REACT_APP_API_URL}${url}`,
        headers: {
          Authorization: `bearer ${getFeedbackToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  getBeneficiaryAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        data: data,
        url: `${REACT_APP_API_URL}${url}${data}`,
        headers: {
          Authorization: `bearer ${getRegistrationToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  getBeneficiaryAuthe(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        data: data,
        url: `${REACT_APP_API_URL}${url}`,
        headers: {
          Authorization: `bearer ${getRegistrationToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },

  postBeneficiaryAuth(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${REACT_APP_API_URL}${url}`,
        data: data,
        headers: {
          Authorization: `bearer ${getRegistrationToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  // postBeneficiaryAuth(url, data) {
  //   return new Promise((resolve, reject) => {
  //     axios({
  //       method: "post",
  //       url: `${REACT_APP_API_URL}${url}`,
  //       data: data,
  //       headers: {
  //         Authorization: `bearer ${getRegistrationToken()}`,
  //       },
  //     })
  //       ?.then((response) => {
  //         checkError(response, resolve);
  //       })
  //       ?.catch((error) => {
  //         if (error?.status !== 401)
  //           reject({ data: { description: error.toString() } });
  //         else
  //           reject({ data: { description: error?.response?.data?.message } });
  //       });
  //   });
  // },
  getLoction(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        data: data,
        url: `${REACT_APP_API_URL}${url}${data}`,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
  put(url, data, id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        data: data,
        url: `${REACT_APP_API_URL}${url}${id}`,
        headers: {
          Authorization: `bearer ${setNewToken()}`,
        },
      })
        ?.then((response) => {
          checkError(response, resolve);
        })
        ?.catch((error) => {
          if (error?.status !== 401)
            reject({ data: { description: error.toString() } });
          else
            reject({ data: { description: error?.response?.data?.message } });
        });
    });
  },
};

export default MakeRequest;
