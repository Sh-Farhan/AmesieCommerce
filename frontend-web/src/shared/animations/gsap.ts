/**
 * GSAP Animation Configuration
 * Centralized setup for all GSAP animations with performance optimizations
 * and accessibility considerations
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Configure GSAP defaults for performance and accessibility
gsap.defaults({
  duration: prefersReducedMotion ? 0 : 0.6,
  ease: 'power2.out',
})

// Animation configurations
export const animations = {
  // Page transitions
  pageTransition: {
    duration: prefersReducedMotion ? 0 : 0.5,
    ease: 'power2.inOut',
  },
  
  // Reveal animations for scroll-triggered content
  revealUp: {
    duration: prefersReducedMotion ? 0 : 0.8,
    y: prefersReducedMotion ? 0 : 50,
    opacity: 0,
    ease: 'power2.out',
  },
  
  // Stagger animations for product grids
  staggerReveal: {
    duration: prefersReducedMotion ? 0 : 0.6,
    y: prefersReducedMotion ? 0 : 30,
    opacity: 0,
    ease: 'power2.out',
    stagger: prefersReducedMotion ? 0 : 0.1,
  },
  
  // Micro-interactions
  hover: {
    duration: prefersReducedMotion ? 0 : 0.3,
    scale: prefersReducedMotion ? 1 : 1.05,
    ease: 'power2.out',
  },
  
  // Modal animations
  modalEnter: {
    duration: prefersReducedMotion ? 0 : 0.4,
    scale: prefersReducedMotion ? 1 : 0.9,
    opacity: 0,
    ease: 'power2.out',
  },
  
  // Cart drawer animations
  slideIn: {
    duration: prefersReducedMotion ? 0 : 0.5,
    x: prefersReducedMotion ? 0 : '100%',
    ease: 'power2.out',
  },
}

/**
 * Create a GSAP context for component cleanup
 * Use this in React components to ensure proper cleanup
 */
export const createGSAPContext = () => gsap.context(() => {})

/**
 * Animate elements on scroll with ScrollTrigger
 * @param element - Target element
 * @param animation - Animation properties
 * @param trigger - ScrollTrigger options
 */
export const animateOnScroll = (
  element: HTMLElement | string,
  animation: gsap.TweenVars = animations.revealUp,
  trigger: ScrollTrigger.Vars = {}
) => {
  if (prefersReducedMotion) return
  
  return gsap.fromTo(element, animation, {
    ...animation,
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...trigger,
    },
  })
}

/**
 * Stagger animation for multiple elements
 * Perfect for product grids and lists
 */
export const staggerElements = (
  elements: HTMLElement[] | string,
  animation: gsap.TweenVars = animations.staggerReveal
) => {
  if (prefersReducedMotion) return
  
  return gsap.fromTo(elements, animation, {
    ...animation,
    opacity: 1,
    y: 0,
  })
}

/**
 * Page transition animation
 * Use when navigating between routes
 */
export const pageTransition = {
  enter: (element: HTMLElement) => {
    if (prefersReducedMotion) return Promise.resolve()
    
    return gsap.fromTo(element, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ...animations.pageTransition }
    )
  },
  
  exit: (element: HTMLElement) => {
    if (prefersReducedMotion) return Promise.resolve()
    
    return gsap.to(element, {
      opacity: 0,
      y: -20,
      ...animations.pageTransition,
    })
  },
}

/**
 * Hover animation utility
 * Use for product cards and interactive elements
 */
export const createHoverAnimation = (element: HTMLElement) => {
  if (prefersReducedMotion) return { play: () => {}, reverse: () => {} }
  
  const tl = gsap.timeline({ paused: true })
  tl.to(element, animations.hover)
  
  return {
    play: () => tl.play(),
    reverse: () => tl.reverse(),
  }
}

/**
 * Loading animation for skeletons and loading states
 */
export const loadingPulse = (element: HTMLElement) => {
  if (prefersReducedMotion) return
  
  return gsap.to(element, {
    opacity: 0.5,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
  })
}

/**
 * Cart animation for adding items
 * Creates a satisfying feedback animation
 */
export const cartAnimation = {
  addToCart: (element: HTMLElement) => {
    if (prefersReducedMotion) return Promise.resolve()
    
    const tl = gsap.timeline()
    
    // Scale pulse effect
    tl.to(element, {
      scale: 1.1,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
    
    return tl
  },
  
  removeFromCart: (element: HTMLElement) => {
    if (prefersReducedMotion) return Promise.resolve()
    
    return gsap.to(element, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  },
}

export default gsap