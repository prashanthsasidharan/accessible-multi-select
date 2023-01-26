import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react"
import Alert from "react-bootstrap/Alert";

type NotifyConfigType = {
  msg?: string,
  type?: string
}

type NotifyValueType = (config: NotifyConfigType) => void

let NotificationContext = createContext<NotifyValueType | null>(null);

export function useNotifyContext() {
  return useContext(NotificationContext) as NotifyValueType;
}

export default function Notify({ children } : { children: ReactNode}) {
  let [canNotify, setCanNotify] = useState(false);
  let [notifyConfig, setNotifyConfig] = useState<NotifyConfigType>({});

  const notify = useCallback((config: NotifyConfigType) => {
    setCanNotify(true);
    setNotifyConfig(config)
  }, []);

  return (
  <NotificationContext.Provider value={notify}>
    {canNotify && (
      <Alert variant={notifyConfig.type} onClose={() => setCanNotify(false)} className="mt-4 text-center w-25 position-absolute start-50 top-0 translate-middle" dismissible>
      <p className="mb-0">
        {notifyConfig.msg}
      </p>
    </Alert>
    )}

    {children}
  </NotificationContext.Provider>)
}