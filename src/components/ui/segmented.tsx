"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

export type SegmentOption<T extends string> = { value: T; label: string };

/** Segmented control: pick one option. Radix handles arrow keys and roving focus. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  const pick = (next: string) => {
    const option = options.find((o) => o.value === next);
    if (option) onChange(option.value);
  };
  return (
    <ToggleGroup.Root
      type="single"
      aria-label={label}
      className="seg"
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      value={value}
      onValueChange={pick}
    >
      {options.map((option) => (
        <ToggleGroup.Item key={option.value} value={option.value}>
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
