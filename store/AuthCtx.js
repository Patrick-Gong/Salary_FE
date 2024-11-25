// 소셜 로그인 과정에서 발생하는 토큰을 담기 위한 
// 전역 상태관리 컴포넌트 구현 예정


import { useReducer, useEffect } from 'react';

const AuthCtx = createContext({});
const [state, dispatch] = useReducer(
  (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignOut: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignOut: true,
          userToken: null,
        };
    }
  },
  { isLoading: true, isSignOut: false, userToken: null }
);



