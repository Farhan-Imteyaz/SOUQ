import { CheckCircle2, Circle } from "lucide-react";
import { useAuth } from "@/app/providers/authProvider";

export const Header = () => {
  const { user } = useAuth();

  // Later you can calculate this dynamically
  const steps = [
    { label: "Address created", completed: true },
    { label: "Place first order", completed: false },
    { label: "Create shipment", completed: false },
  ];

  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="mb-8 space-y-3">
      {/* Progress */}
      <p className="text-sm border border-blue-500/10 px-3 py-2 rounded-lg w-fit font-medium bg-blue-50/30 text-blue-700">
        {completedCount} of {steps.length} steps completed
      </p>

      {/* Welcome */}
      <h1 className="text-2xl tracking-tight font-medium font-reddit">
        Welcome back {user?.firstName}
      </h1>

      {/* Helper text */}
      <p className="max-w-xl text-sm text-gray-600">
        Your virtual address is ready. Complete the steps below to start
        shipping from India.
      </p>

      {/* Steps */}
      <div className="flex flex-wrap gap-4 pt-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {step.completed ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400" />
            )}
            <span
              className={step.completed ? "text-gray-900" : "text-gray-500"}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-xs font-medium text-yellow-700 uppercase">
          Next recommended step
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-800">
            Place your first order using your Indian virtual address
          </p>

          <button className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium">
            Shop from India
          </button>
        </div>
      </div>
    </div>
  );
};
