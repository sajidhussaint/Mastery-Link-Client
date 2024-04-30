import { Spinner } from "@material-tailwind/react";

export function CustomSpinner() {
  return <Spinner className="h-16 w-16 text-gray-900/50" />;
}

export function SmallSpinner() {
  return <Spinner className="text-[#a5a5a5]  h-4 w-4" />;
}
