/**
 * Button Component
 * Highly customizable button with variants, sizes, and loading states
 * Perfect for e-commerce interactions with smooth animations
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

// Button variants using CVA for consistent styling
const buttonVariants = cva(
  // Base styles - always applied
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
        secondary: 'border-2 border-primary-600 text-primary-600 bg-white hover:bg-primary-50 active:bg-primary-100 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
        accent: 'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
        ghost: 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 active:bg-neutral-200',
        danger: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95',
        outline: 'border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 active:bg-neutral-100',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
        icon: 'p-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows loading spinner and disables button */
  loading?: boolean
  /** Icon to display before text */
  leftIcon?: React.ReactNode
  /** Icon to display after text */
  rightIcon?: React.ReactNode
  /** Custom loading text */
  loadingText?: string
}

/**
 * Button component with multiple variants and states
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleSubmit}>
 *   Add to Cart
 * </Button>
 * 
 * @example
 * <Button variant="secondary" loading loadingText="Processing...">
 *   Place Order
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
        )}
        
        {/* Left icon when not loading */}
        {!loading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text */}
        <span>
          {loading && loadingText ? loadingText : children}
        </span>

        {/* Right icon when not loading */}
        {!loading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }