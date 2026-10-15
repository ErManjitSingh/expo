import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>}
      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-400 focus:ring-2 focus:ring-brand-100',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>}
      <textarea
        className={cn(
          'min-h-28 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100',
          className,
        )}
        {...props}
      />
    </label>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>}
      <select
        className={cn(
          'h-11 w-full rounded-xl border border-line bg-white px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100',
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
