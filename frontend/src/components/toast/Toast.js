import { Toast } from "primereact/toast";
import { forwardRef } from "react";

const ToastNotification = forwardRef(({ severity, summary, detail }, ref) => {
  return (
    <Toast ref={ref} severity={severity} summary={summary} detail={detail} />
  );
});

export default ToastNotification;
