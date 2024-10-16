"use client";

import { useState } from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FeatureValue = string | boolean;
type TierName = "basic" | "pro" | "enterprise";

type Feature = {
  name: string;
  tooltip?: string;
} & Record<TierName, FeatureValue>;

type Tier = {
  name: string;
  nameKey: TierName;
  monthlyPrice?: number;
  annualPrice?: number;
  price?: string;
  description: string;
  color: string;
  buttonColor: string;
  popular?: boolean;
};

const features: Feature[] = [
  {
    name: "Users",
    basic: "1 user",
    pro: "5 users",
    enterprise: "Unlimited",
    tooltip: "Number of user accounts",
  },
  {
    name: "Storage",
    basic: "5GB",
    pro: "50GB",
    enterprise: "Unlimited",
    tooltip: "Cloud storage capacity",
  },
  {
    name: "Support",
    basic: "Email support",
    pro: "Priority email support",
    enterprise: "24/7 dedicated support",
    tooltip: "Customer support options",
  },
  {
    name: "Integrations",
    basic: "Limited",
    pro: "Advanced",
    enterprise: "Custom",
    tooltip: "Third-party app integrations",
  },
  {
    name: "Analytics",
    basic: false,
    pro: true,
    enterprise: true,
    tooltip: "Access to data analysis tools",
  },
  {
    name: "API Access",
    basic: false,
    pro: true,
    enterprise: true,
    tooltip: "Access to our API",
  },
  {
    name: "Service Level Agreement",
    basic: false,
    pro: false,
    enterprise: true,
    tooltip: "Guaranteed uptime and performance",
  },
];

const tiers: Tier[] = [
  {
    name: "Basic",
    nameKey: "basic",
    monthlyPrice: 9,
    annualPrice: 99,
    description: "Essential features for individuals",
    color: "bg-blue-50 dark:bg-blue-950",
    buttonColor:
      "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  },
  {
    name: "Pro",
    nameKey: "pro",
    monthlyPrice: 29,
    annualPrice: 299,
    description: "Advanced features for professionals",
    color: "bg-purple-50 dark:bg-purple-950",
    buttonColor:
      "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
    popular: true,
  },
  {
    name: "Enterprise",
    nameKey: "enterprise",
    price: "Custom",
    description: "Tailored solutions for large teams",
    color: "bg-green-50 dark:bg-green-950",
    buttonColor:
      "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
  },
];

export default function PriceTable() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Choose Your Plan
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Select the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
        <div className="flex justify-center items-center mb-8">
          <span className="mr-3 text-sm font-medium dark:text-white">Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle annual billing"
          />
          <span className="ml-3 text-sm font-medium dark:text-white">
            Annual
            <Badge className="ml-2 bg-green-500 text-white">Save 15%</Badge>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${tier.color}`}
            >
              <CardHeader className="relative">
                {tier.popular && (
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900">
                    Most Popular
                  </Badge>
                )}
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-sm">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-5xl font-bold mb-6 text-center">
                  {tier.price ||
                    (isAnnual
                      ? `$${tier.annualPrice}`
                      : `$${tier.monthlyPrice}`)}
                  <span className="text-sm font-normal block mt-1 text-gray-600 dark:text-gray-400">
                    {tier.price ? "" : isAnnual ? "per year" : "per month"}
                  </span>
                </p>
                <ul className="space-y-3">
                  {features.map((feature) => {
                    const featureValue = feature[tier.nameKey];
                    return (
                      <li key={feature.name} className="flex items-center">
                        {typeof featureValue === "boolean" ? (
                          featureValue ? (
                            <Check
                              className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                              aria-label="Included"
                            />
                          ) : (
                            <X
                              className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
                              aria-label="Not included"
                            />
                          )
                        ) : (
                          <Check
                            className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                            aria-label="Included"
                          />
                        )}
                        <span className="flex-grow">{feature.name}</span>
                        {typeof featureValue === "string" && (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {featureValue}
                          </span>
                        )}
                        {feature.tooltip && (
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle
                                className="h-4 w-4 text-gray-400 ml-1"
                                aria-label={`More info about ${feature.name}`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${tier.buttonColor} text-white transition-colors duration-300`}
                  aria-label={`Select ${tier.name} plan`}
                >
                  {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          All plans come with a 30-day money-back guarantee. Prices are in USD.
        </p>
      </div>
    </TooltipProvider>
  );
}
