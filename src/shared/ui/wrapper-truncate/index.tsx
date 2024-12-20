import { useState } from "react";
import { Button } from "../button";
import { Typography } from "../typography";
import styles from "./styles.module.css"

type WrapperTruncateProps = {
  symbolsForCutting: number;
  textButtonForReading: string;
  textButtonForCollapsing: string;
  text: string;
}

export const WrapperTruncate = ({ symbolsForCutting, textButtonForReading, textButtonForCollapsing, text }: WrapperTruncateProps) => {
  const [openedText, setOpenedText] = useState(false);

  const handleLimitation = (text: string, numberOfSymbols: number) => {
    let newText = text;
    if (!openedText) {
      newText = text.slice(0, numberOfSymbols) + "...";
    }

    return newText + " "
  }

  return (
    <div className={styles.container}>
      <Typography>
        {text.length < symbolsForCutting ? text : (
          <>
            {handleLimitation(text, symbolsForCutting)}
            <Button buttonType="primary" onClick={() => setOpenedText(!openedText)} label={openedText ? textButtonForCollapsing : textButtonForReading} extClassName={styles.button} />
          </>
        )}
      </Typography>
    </div>
  )
}