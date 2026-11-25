"use client";

import * as RadixSwitch from "@radix-ui/react-switch";

/** iOS-style on/off switch. Radix gives it the switch role and keyboard support. */
export function Switch({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <RadixSwitch.Root
      id={id}
      className="sw2"
      checked={checked}
      onCheckedChange={onChange}
    >
      <RadixSwitch.Thumb className="sw2-thumb" />
    </RadixSwitch.Root>
  );
}
