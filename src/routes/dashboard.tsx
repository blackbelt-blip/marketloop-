import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/ml/Dashboard";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });
