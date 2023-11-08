import React from "react";

import Button from "../Button";
import { useToast } from "../ToastProvider";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const DEFAULT_VARIANT_OPTION = VARIANT_OPTIONS[0];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT_OPTION);

  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    addToast(message, variant);

    setMessage("");
    setVariant(DEFAULT_VARIANT_OPTION);
  };

  const id = React.useId();
  const messageFieldId = `${id}-message`;
  const variantFieldId = `${id}-variant`;

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor={messageFieldId}
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              className={styles.messageInput}
              id={messageFieldId}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              required
              minLength={1}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantOption) => {
              const radioId = `${variantFieldId}-${variantOption}`;
              return (
                <label key={radioId} htmlFor={radioId}>
                  <input
                    id={radioId}
                    type="radio"
                    name={variantFieldId}
                    value={variantOption}
                    checked={variant === variantOption}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {variantOption}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
