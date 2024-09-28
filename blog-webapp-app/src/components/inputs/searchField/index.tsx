// SearchField.tsx

import React, { useState, ChangeEvent, CSSProperties } from "react";
import { Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import styles from "./styles.module.sass";

interface SearchField {
  placeHolder?: string;
  size?: SizeType;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const defaultInputStyle: CSSProperties = {
  border: "1px solid #D9E0DC",
  backgroundColor: "#FFF",
};

const SearchField: React.FC<SearchField> = ({
  placeHolder,
  size,
  onInputChange,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const mergedStyle: CSSProperties = {
    ...defaultInputStyle,
    border: isFocused ? "1px solid #009241" : defaultInputStyle.border,
  };

  return (
    <Input
      className={styles.FieldClass}
      placeholder={placeHolder}
      size={size}
      bordered={false}
      onChange={onInputChange}
      style={mergedStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default SearchField;
