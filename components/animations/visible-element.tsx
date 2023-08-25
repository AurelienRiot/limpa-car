"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const motionVariant = {
  fade: {
    variations: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    transition: { duration: 0.4 },
  },
  right: {
    variations: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    },
    transition: { duration: 0.4 },
  },
  left: {
    variations: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    },
    transition: { duration: 0.4 },
  },
  top: {
    variations: {
      initial: { opacity: 0, y: -100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -100 },
    },
    transition: { duration: 0.4 },
  },
  bottom: {
    variations: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 100 },
    },
    transition: { duration: 0.4 },
  },
  scaleY: {
    variations: {
      initial: { scaleY: 0 },
      animate: { scaleY: 1 },
      exit: { scaleY: 0 },
    },
    transition: { duration: 0.4 },
  },
  scaleX: {
    variations: {
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      exit: { scaleX: 0 },
    },
    transition: { duration: 0.4 },
  },
};

type VisibleElementProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: keyof typeof motionVariant;
  as?:
    | "div"
    | "section"
    | "article"
    | "span"
    | "header"
    | "footer"
    | "aside"
    | "nav"
    | "ul"
    | "li"
    | "ol"
    | "main"
    | "div"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "a"
    | "button"
    | "input"
    | "textarea"
    | "img"
    | "iframe"
    | "svg";
  amount?: number;
};
export const VisibleElement: React.FC<VisibleElementProps> = ({
  children,
  className,
  id,
  variant = "fade",
  as = "div",
  amount = 0.1,
}) => {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount });

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={elementRef}
      variants={motionVariant[variant].variations}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      exit="exit"
      transition={motionVariant[variant].transition}
      className={className}
      id={id}
    >
      {children}
    </MotionComponent>
  );
};
