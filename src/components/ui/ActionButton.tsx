import type { ButtonHTMLAttributes } from 'react';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  emphasis?: 'normal' | 'required';
}

export function ActionButton({ emphasis = 'normal', className = '', ...props }: ActionButtonProps) {
  const classes = [className, emphasis === 'required' ? 'gi-pulse required-action' : '']
    .filter(Boolean)
    .join(' ');
  return <button {...props} className={classes} />;
}
