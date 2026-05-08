import { useId } from 'react';

export const NeoBox = ({ children, className = '', style = {}, ...rest }) => (
  <div className={`neo-box ${className}`} style={style} {...rest}>
    {children}
  </div>
);

export const NeoButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  disabled = false,
  type = 'button',
  download = false,
  target,
  rel,
  ariaLabel
}) => {
  const classes = `neo-button neo-button--${variant} ${disabled ? 'is-disabled' : ''} ${className}`;

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export const NeoInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  isTextArea,
  id,
  name,
  required = false,
  helperText,
  rows = 4,
  autoComplete,
  inputMode
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="neo-input-group">
      {label && (
        <label className="neo-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      {isTextArea ? (
        <textarea
          id={inputId}
          name={name}
          className="neo-input"
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          className="neo-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
        />
      )}
      {helperText && <p className="neo-helper">{helperText}</p>}
    </div>
  );
};

export const NeoSticker = ({ text, className = '', style }) => (
  <div className={`sticker ${className}`} style={style}>
    {text}
  </div>
);
