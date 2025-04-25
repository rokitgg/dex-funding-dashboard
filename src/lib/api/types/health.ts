export interface HealthCheck {
    status: "ok" | "fail" | "warn";
    version?: string;
    releaseId?: string;
    serviceId?: string;
    description?: string;
    notes?: string[];
    output?: string;
    checks?: {
      [key: string]: Array<{
        componentId?: string;
        componentType?: "component" | "datastore" | "system";
        observedValue?: number | string | boolean;
        observedUnit?: string;
        status?: "ok" | "fail" | "warn";
        time?: string;
        output?: string;
      }>;
    };
    links?: {
      [key: string]: string;
    };
  }