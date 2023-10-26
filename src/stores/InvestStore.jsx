import React from 'react';
import axios from 'axios';
import {BASE_API_URL} from '../../app.json';
import {auth} from '../util/firebase/firebaseConfig';
import {store} from '../util/redux/store';

//get login token
const reduxStore = store.getState().userAuth;
let uploadProgress = 0;

let headers;
if (reduxStore !== null || reduxStore !== undefined) {
  token =
    JSON.parse(reduxStore.user)?.user?.stsTokenManager?.accessToken != null ||
    JSON.parse(reduxStore.user)?.user?.stsTokenManager?.accessToken != undefined
      ? JSON.parse(reduxStore.user)?.user?.stsTokenManager?.accessToken
      : JSON.parse(reduxStore.user)?.stsTokenManager?.accessToken;
}
const axiosInstance = axios.create({baseURL: BASE_API_URL});

const getAllLendaProduct = async () => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(
          `/lenda-investment/lenda-investment-plans`,
          {
            headers,
          },
        );
        return {
          title: 'Lenda Investment Plans',
          error: false,
          data: response?.data,
          message: 'success',
        };
      } catch (error) {
        return {
          title: 'Lenda Investment Plans',
          error: true,
          data: null,
          message: error,
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getAllArmProduct = async () => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(`/investment/arm-products`, {
          headers,
        });
        return {
          title: 'ARM Investment',
          error: false,
          data: response?.data?.data,
          message: 'success',
        };
      } catch (error) {
        return {
          title: 'ARM Investment',
          error: true,
          data: null,
          message: error,
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getArmProductYield = async productCode => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(
          `/investment/arm-product-yield?productCode=${productCode}`,
          {
            headers,
          },
        );
        return {
          title: 'ARM Investment Yield',
          error: false,
          data: response?.data?.data,
          message: 'success',
        };
      } catch (error) {
        return {
          title: 'ARM Investment',
          error: true,
          data: null,
          message: error,
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getAllLendaInvestment = async () => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(
          `/lenda-investment/All-lenda-investments`,
          {
            headers,
          },
        );
        return {
          title: 'Get All Investment',
          error: false,
          data: response?.data,
          message: 'success',
        };
      } catch (error) {
        return {
          title: 'Get All Investment',
          error: true,
          data: null,
          message: error,
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getAllArmInvestment = async () => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(
          `/investment/active-investments`,
          {
            headers,
          },
        );
        return {
          title: 'Get All Investment',
          error: false,
          data: response?.data,
          message: 'success',
        };
      } catch (error) {
        return {
          title: 'Get All Investment',
          error: true,
          data: null,
          message: error,
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getSingleArmInvestment = async (membershipId, productCode) => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(
          `/investment/single-investment/?membershipId=${membershipId}&productCode=${productCode}`,
          {
            headers,
          },
        );
        return {
          title: 'Get Single Investment ',
          error: false,
          data: response?.data?.data,
          message: 'success',
        };
      } catch (error) {
        return {
          title: 'Get Single Investment ',
          error: true,
          data: null,
          message: 'Failed to retrieve investment data!',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const createLendaInvestment = async details => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/lenda-investment/create-user-lenda-investment`,
          details,
          {
            headers,
          },
        );
        if (response?.data?.error) {
          return {
            title: 'Create Lenda Investment ',
            error: true,
            data: null,
            message: response?.data?.message,
          };
        }
        return {
          title: 'Create Lenda Investment',
          error: false,
          data: response?.data,
          message: 'Investment Created successfully',
        };
      } catch (error) {
        return {
          title: 'Create Lenda Investment',
          error: true,
          data: null,
          message: 'Investment Creation Failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const createArmInvestment = async details => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/investment/create-arm-investment`,
          details,
          {
            headers,
          },
        );
        if (response?.data?.data?.error) {
          return {
            title: 'Create ARM Investment ',
            error: true,
            data: null,
            message: response?.data?.data?.message,
          };
        }
        return {
          title: 'Create ARM Investment ',
          error: false,
          data: response?.data?.data,
          message:
            'Investment successful, you will be notified once it is active.',
        };
      } catch (error) {
        return {
          title: 'Create ARM Investment ',
          error: true,
          data: null,
          message: 'Investment creation failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const topUpArmInvestment = async details => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/investment/topup-arm-investment`,
          details,
          {
            headers,
          },
        );
        if (response?.data?.data?.error) {
          return {
            title: 'Top-Up Investment',
            error: true,
            data: null,
            message: response?.data?.data?.message,
          };
        }
        return {
          title: 'Top-Up Investment',
          error: false,
          data: response?.data,
          message: 'Investment Top-Up successful',
        };
      } catch (error) {
        return {
          title: 'Top-Up Investment',
          error: true,
          data: null,
          message: 'Investment Top-Up Failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const topUpLendaInvestment = async details => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/lenda-investment/topUp-lenda-investment`,
          details,
          {
            headers,
          },
        );
        if (response?.data?.error) {
          return {
            title: 'Top-Up Investment',
            error: true,
            data: null,
            message: response?.data?.message,
          };
        }
        return {
          title: 'Top-Up Investment',
          error: false,
          data: response?.data,
          message: 'Investment Top-Up successful',
        };
      } catch (error) {
        return {
          title: 'Top-Up Investment',
          error: true,
          data: null,
          message: 'Investment Top-Up Failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const redeemArmInvestment = async details => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/investment/redeem-arm-investment`,
          details,
          {
            headers,
          },
        );
        if (response?.data?.error) {
          return {
            title: 'Redeem Investment',
            error: true,
            data: null,
            message: response?.data?.message,
          };
        }
        return {
          title: 'Redeem Investment',
          error: false,
          data: response?.data,
          message: 'Investment redeemption successful.',
        };
      } catch (error) {
        return {
          title: 'Redeem Investment',
          error: true,
          data: null,
          message: 'Investment redeemption failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getArmOTP = async membershipId => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.get(
          `/investment/otp/?membershipId=${membershipId}`,
          {
            headers,
          },
        );
        return {
          title: 'Get Investment OTP',
          error: false,
          data: response?.data,
          message: response?.data?.message,
        };
      } catch (error) {
        return {
          title: 'Get Investment OTP',
          error: true,
          data: null,
          message: error,
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const redeemLendaInvestment = async details => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/lenda-investment/complete-redemption`,
          details,
          {
            headers,
          },
        );
        if (response?.data?.error) {
          return {
            title: 'Redeem Investment',
            error: true,
            data: null,
            message: response?.data?.message,
          };
        }
        return {
          title: 'Redeem Investment',
          error: false,
          data: response?.data,
          message: 'Investment redeemption successful',
        };
      } catch (error) {
        return {
          title: 'Redeem Investment',
          error: true,
          data: null,
          message: 'Investment redeemption failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

const getLendaOTP = async data => {
  if (
    store.getState().networkState &&
    store.getState().networkState.network.isConnected &&
    store.getState().networkState.network.isInternetReachable
  ) {
    if (auth?.currentUser?.stsTokenManager?.accessToken) {
      headers = {
        accept: 'application/json',
        Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axiosInstance.post(
          `/lenda-investment/initiate-redemption-to-get-otp`,
          data,
          {
            headers,
          },
        );
        if (response?.data?.error) {
          return {
            title: 'Get Investment OTP',
            error: true,
            data: null,
            message: response?.data?.message,
          };
        }
        return {
          title: 'Get Investment OTP',
          error: false,
          data: response?.data,
          message: response?.data?.message,
        };
      } catch (error) {
        return {
          title: 'Top-Up Investment',
          error: true,
          data: null,
          message: 'Get investment OTP failed',
        };
      }
    }
  } else {
    return {
      error: true,
      data: null,
      message: 'No Internet Connection',
    };
  }
};

export {
  getAllLendaProduct,
  getAllArmProduct,
  getArmProductYield,
  getAllLendaInvestment,
  getAllArmInvestment,
  getSingleArmInvestment,
  createLendaInvestment,
  createArmInvestment,
  topUpLendaInvestment,
  topUpArmInvestment,
  redeemArmInvestment,
  redeemLendaInvestment,
  getArmOTP,
  getLendaOTP,
};
