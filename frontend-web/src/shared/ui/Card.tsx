/**
 * Card Component
 * Flexible card container with multiple variants and hover effects
 * Perfect for product displays, content sections, and information panels
 */

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

// Card variants using CVA
const cardVariants = cva(
  // Base styles - always applied
  'rounded-xl border bg-white transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 shadow-sm hover:shadow-md',
        elevated: 'border-neutral-200 shadow-lg hover:shadow-xl',
        outline: 'border-neutral-300 shadow-none hover:shadow-sm',
        ghost: 'border-transparent shadow-none hover:bg-neutral-50',
        product: 'border-neutral-200 shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Card header content */
  header?: React.ReactNode
  /** Card footer content */
  footer?: React.ReactNode
  /** Whether the card is interactive (adds hover effects) */
  interactive?: boolean
}

/**
 * Card component for containing and organizing content
 * 
 * @example
 * <Card variant="elevated" padding="lg">
 *   <h3>Product Title</h3>
 *   <p>Product description...</p>
 * </Card>
 * 
 * @example
 * <Card 
 *   variant="product" 
 *   header={<h3>Featured Product</h3>}
 *   footer={<Button>Add to Cart</Button>}
 * >
 *   Product content here
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      header,
      footer,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          cardVariants({ variant, padding }),
          interactive && 'cursor-pointer transform hover:scale-105',
          className
        )}
        {...props}
      >
        {/* Card Header */}
        {header && (
          <div className={clsx(
            'border-b border-neutral-200 pb-4 mb-4',
            padding === 'none' ? 'px-6 pt-6' : ''
          )}>
            {header}
          </div>
        )}

        {/* Card Content */}
        <div className={padding === 'none' ? 'px-6' : ''}>
          {children}
        </div>

        {/* Card Footer */}
        {footer && (
          <div className={clsx(
            'border-t border-neutral-200 pt-4 mt-4',
            padding === 'none' ? 'px-6 pb-6' : ''
          )}>
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Subcomponents for better composition
const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('border-b border-neutral-200 pb-4 mb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx('border-t border-neutral-200 pt-4 mt-4', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter, cardVariants }