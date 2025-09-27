import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextValue = {
  value?: string;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  registerItem: (value: string, label: string) => void;
  getLabel: (value?: string) => string | undefined;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext(component: string) {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(`${component} must be used within a Select`);
  }
  return context;
}

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

export function Select({ value, onValueChange, children }: SelectProps) {
  const [items, setItems] = React.useState<Record<string, string>>({});
  const [open, setOpen] = React.useState(false);

  const registerItem = React.useCallback((itemValue: string, label: string) => {
    setItems((prev) => {
      if (prev[itemValue] === label) return prev;
      return { ...prev, [itemValue]: label };
    });
  }, []);

  const getLabel = React.useCallback(
    (current?: string) => (current ? items[current] ?? current : undefined),
    [items]
  );

  const contextValue = React.useMemo<SelectContextValue>(
    () => ({
      value,
      setValue: (val: string) => {
        onValueChange?.(val);
        setOpen(false);
      },
      open,
      setOpen,
      registerItem,
      getLabel
    }),
    [value, onValueChange, open, registerItem, getLabel]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative inline-block w-max">{children}</div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const ctx = useSelectContext("SelectTrigger");
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={ctx.open}
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cn(
        "inline-flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm",
        className
      )}
      {...props}
    >
      {children}
      <span className="ml-2 text-xs">▾</span>
    </button>
  );
}

type SelectContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SelectContent({ className, children, ...props }: SelectContentProps) {
  const ctx = useSelectContext("SelectContent");
  if (!ctx.open) return null;
  return (
    <div
      role="listbox"
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SelectItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function SelectItem({ value: itemValue, children, className, ...props }: SelectItemProps) {
  const ctx = useSelectContext("SelectItem");

  React.useEffect(() => {
    const label = typeof children === "string" ? children : undefined;
    if (label) {
      ctx.registerItem(itemValue, label);
    }
  }, [children, ctx, itemValue]);

  const label = typeof children === "string" ? children : String(children ?? itemValue);

  return (
    <button
      role="option"
      type="button"
      onClick={() => ctx.setValue(itemValue)}
      className={cn(
        "w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-neutral-100",
        ctx.value === itemValue && "bg-neutral-100",
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}

type SelectValueProps = {
  placeholder?: string;
  className?: string;
};

export function SelectValue({ placeholder, className }: SelectValueProps) {
  const ctx = useSelectContext("SelectValue");
  const label = ctx.getLabel(ctx.value);
  return <span className={cn("text-sm", className)}>{label ?? placeholder ?? ""}</span>;
}

