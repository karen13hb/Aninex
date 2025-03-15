import React from 'react';
import styles from "./Alert.module.css";

type Props = {
    message: string;
    type?: "success" | "error" | "warning";
};

function Alert({ message, type = "success" }: Props) {
  if (!message) return null;
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {message}
    </div>
  );
}

export default Alert;
