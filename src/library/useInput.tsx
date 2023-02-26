import React, { useState } from "react";

type InputCallback = () => any;

export function useInput<T extends Record<string, InputCallback | undefined>>(
  inputs: T
) {
  const [data, setData] = useState<Record<keyof T, string>>();

  const handleChange =
    (discriminator: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      const value = target.value;

      setData({ ...data, [discriminator]: value } as Record<keyof T, string>);
    };

  return {
    data,
    handleChange,
  };
}
