import { ShieldCheck, MapPin, PackageCheck, Globe } from "lucide-react";

const Process = () => {
  const workflowSteps = [
    {
      title: "Secure warehouse",
      description: "Your items are stored in our protected facility",
      icon: ShieldCheck,
      color: "bg-blue-500",
    },
    {
      title: "Unique address",
      description: "Get your personal Indian shipping address",
      icon: MapPin,
      color: "bg-purple-500",
    },
    {
      title: "Safe storage",
      description: "Items stored safely until you're ready to ship",
      icon: PackageCheck,
      color: "bg-green-500",
    },
    {
      title: "Global shipping",
      description: "We ship your parcels anywhere in the world",
      icon: Globe,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative group">
              <div className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.color}`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Connector line */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Process;
