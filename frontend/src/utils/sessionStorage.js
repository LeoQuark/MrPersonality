const setUserSessionStorage = (token,user)=>{
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user',user)
}

const removeUserSessionStorage=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
}

const setRememberUser = (user) => {
    sessionStorage.setItem("user", user);
};

const getTokenSessionStorage = () => {
    const existToken = sessionStorage.getItem("token");
    if (!existToken) {
      return null;
    }
    return existToken;
};
  
const getUserSessionStorage = () => {
    const existUser = sessionStorage.getItem("user");
    if (!existUser) {
      return null;
    }
    return JSON.parse(existUser);
};


export default {
    setUserSessionStorage,
    removeUserSessionStorage,
    getUserSessionStorage,
    getTokenSessionStorage,
    setRememberUser
}
