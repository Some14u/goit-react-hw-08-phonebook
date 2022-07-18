import { useCallback, useMemo, useState } from "react";
import s from "./AsyncIndicator.module.css";

import { ReactComponent as Cloud } from "resources/cloud-sync.svg";
import { useSelector } from "react-redux";
import { getLoadingStatus } from "redux/selectors";
import { status } from "redux/asyncStatusSlice";
import { useLanguagesContext } from "components/LanguageProvider";


export default function Loader() {
  const { text } = useLanguagesContext();

  const asyncStatus = useSelector(getLoadingStatus);
  const [errorInfoMode, setErrorInfoMode] = useState(false);

  const showErrorInfo = useCallback(() => {
    if (asyncStatus.status !== status.ERROR) {
      setErrorInfoMode(false);
      return;
    }
    setErrorInfoMode(old => !old);
  }, [asyncStatus]);

  const iconClassName = useMemo(() => {
    let className = s.svg;
    if (asyncStatus.status === status.PENDING) className += " visible";
    if (asyncStatus.status === status.ERROR) className += " visible error"
    else setErrorInfoMode(false);
    return className;
  }, [asyncStatus.status]);

  const containerClassName = useMemo(() => {
    let className = s.container;
    if (errorInfoMode) className += " extended";
    return className;
  }, [errorInfoMode]);

  return (
    <div className={containerClassName}>
      <div className={s.info}>
        {asyncStatus.error
          ?
          <>
            <b>{asyncStatus.error.code}</b>
            <div>{asyncStatus.error.message}</div>
          </>
          :
          <div>{text.unknownError}</div>
        }
      </div>
      <Cloud onClick={showErrorInfo} className={iconClassName} />
    </div>
  );
}