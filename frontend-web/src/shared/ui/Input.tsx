/**
 * Input Component
 * Modern input field with variants, validation states, and accessibility features
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

// Input variants using CVA
const inputVariants = cva(
  // Base styles - always applied
  'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-neutral-400',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20 bg-white',
        error: 'border-error-500 focus:border-error-600 focus:ring-error-500/20 bg-error-50/50',
        success: 'border-accent-500 focus:border-accent-600 focus:ring-accent-500/20 bg-accent-50/50',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-sm',
        lg: 'px-5 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Input label */
  label?: string
  /** Error message to display */
  error?: string
  /** Success message to display */
  success?: string
  /** Helper text */
  helperText?: string
  /** Icon to display on the left */
  leftIcon?: React.ReactNode
  /** Icon to display on the right */
  rightIcon?: React.ReactNode
  /** Show password toggle for password inputs */
  showPasswordToggle?: boolean
  /** Required field indicator */
  required?: boolean
}

/**
 * Input component with validation states and accessibility features
 * 
 * @example
 * <Input 
 *   label="Email Address" 
 *   type="email" 
 *   placeholder="Enter your email"
 *   required
 * />
 * 
 * @example
 * <Input 
 *   label="Password" 
 *   type="password" 
 *   showPasswordToggle
 *   error="Password must be at least 8 characters"
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      required = false,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputId = id || `input-${React.useId()}`
    
    // Determine variant based on validation state
    const inputVariant = error ? 'error' : success ? 'success' : variant

    // Handle password visibility toggle
    const inputType = type === 'password' && showPassword ? 'text' : type

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
            {required && (
              <span className="text-error-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={clsx(
              inputVariants({ variant: inputVariant, size }),
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle || error || success) && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error 
                ? `${inputId}-error` 
                : success 
                ? `${inputId}-success`
                : helperText 
                ? `${inputId}-helper` 
                : undefined
            }
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {/* Validation icons */}
            {error && (
              <AlertCircle className="w-4 h-4 text-error-500" aria-hidden="true" />
            )}
            {success && (
              <CheckCircle className="w-4 h-4 text-accent-500" aria-hidden="true" />
            )}

            {/* Password toggle */}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-neutral-400 hover:text-neutral-600 focus:outline-none focus:text-neutral-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Custom right icon */}
            {rightIcon && !error && !success && (
              <span className="text-neutral-400">
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {/* Helper/Error/Success text */}
        {(error || success || helperText) && (
          <div className="mt-2">
            {error && (
              <p 
                id={`${inputId}-error`}
                className="text-sm text-error-600 flex items-center"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {error}
              </p>
            )}
            {success && !error && (
              <p 
                id={`${inputId}-success`}
                className="text-sm text-accent-600 flex items-center"
              >
                <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p 
                id={`${inputId}-helper`}
                className="text-sm text-neutral-500"
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }