import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

/**
 * @param {*} option null: 누구나, true: 인증된 사용자만, false: 인증된 사용자는 접근불가
 * @param {*} isAdmin 관리자 전용 컴포넌트인지
 */
export default function (WrappedComponent, option, isAdmin = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response);

        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (isAdmin && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <WrappedComponent />;
  }

  return AuthenticationCheck;
}
