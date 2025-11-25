import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight",
      h2: "text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight",
      h3: "text-2xl md:text-3xl lg:text-4xl font-display font-semibold",
      h4: "text-xl md:text-2xl lg:text-3xl font-display font-semibold",
      h5: "text-lg md:text-xl lg:text-2xl font-ui font-semibold",
      h6: "text-base md:text-lg lg:text-xl font-ui font-semibold",
      body: "text-base font-body",
      "body-lg": "text-lg font-body",
      "body-sm": "text-sm font-body",
      lead: "text-lg md:text-xl font-body text-muted-foreground",
      small: "text-sm font-body text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
}

export function Typography({
  className,
  variant,
  as,
  ...props
}: TypographyProps) {
  const getDefaultTag = () => {
    if (variant?.startsWith("h")) {
      return variant as keyof JSX.IntrinsicElements;
    }
    return "p";
  };
  
  const Component = (as || getDefaultTag()) as React.ElementType;
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}

