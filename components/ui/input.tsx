import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          //  w-full border border-2 border-primary-light focus-within:outline focus-within:outline-offset-2 focus-within:outline-grey-base focus-within:outline-2 rounded-lg bg-transparent py-2 px-4 placeholder:text-white placeholder:opacity-40 text-lg
          "flex rounded-lg border-2 border-primary-light bg-transparent py-2 px-4 placeholder:text-white placeholder:opacity-40 text-white text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:outline-grey-base disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
