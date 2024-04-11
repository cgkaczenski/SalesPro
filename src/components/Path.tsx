import { CheckIcon } from "@heroicons/react/20/solid";
import { useLeadContext } from "@/lib/hooks";

const steps = [
  { id: 1, name: "New", href: "#" },
  { id: 2, name: "Nurturing", href: "#" },
  { id: 3, name: "Proposal", href: "#" },
  { id: 4, name: "Closed", href: "#" },
];

export default function Path() {
  const leadContext = useLeadContext();
  if (!leadContext) {
    throw new Error("useLeadContext must be used within a LeadContextProvider");
  }
  const { selectedLead } = leadContext;

  const getStepStatus = (stepName: string) => {
    const currentStepIndex = steps.findIndex(
      (step) =>
        step.name ===
        (selectedLead?.stage === "Closed Won" ||
        selectedLead?.stage === "Closed Lost"
          ? "Closed"
          : selectedLead?.stage)
    );
    const stepIndex = steps.findIndex((step) => step.name === stepName);

    if (selectedLead?.stage === "Closed Lost" && stepName === "Closed") {
      return "current-lost";
    } else if (stepIndex < currentStepIndex) {
      return selectedLead?.stage === "Closed Lost" ? "upcoming" : "complete";
    } else if (stepIndex === currentStepIndex) {
      return "current";
    } else {
      return "upcoming";
    }
  };

  return (
    <div className="flex-1 text-center overflow-hidden hidden md:block">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 lg:flex lg:divide-y-0"
        >
          {steps.map((step, stepIdx) => {
            const stepStatus = getStepStatus(step.name);

            return (
              <li key={step.name} className="relative lg:flex lg:flex-1">
                {stepStatus === "complete" ? (
                  <div className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </div>
                ) : stepStatus === "current" ? (
                  <div
                    className="flex items-center px-6 py-4 text-sm font-medium"
                    aria-current="step"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-green-500">
                      <span className="text-green-500">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm">{step.name}</span>
                  </div>
                ) : stepStatus === "current-lost" ? (
                  <div
                    className="flex items-center px-6 py-4 text-sm font-medium"
                    aria-current="step"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500">
                      <span className="text-red-500">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm">{step.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                      <span className="text-gray-500">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                  </div>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    <div
                      className="absolute right-0 top-0 hidden h-full w-5 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          vectorEffect="non-scaling-stroke"
                          stroke="currentcolor"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
