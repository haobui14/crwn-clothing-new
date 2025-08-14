// Environment variable validation
const validateEnvironment = () => {
  const requiredVars = {
    VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars);
    if (import.meta.env.PROD) {
      throw new Error(
        `Missing environment variables: ${missingVars.join(", ")}`
      );
    }
  }
};

validateEnvironment();

export const ENV = {
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!,
} as const;
