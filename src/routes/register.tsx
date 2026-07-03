import { createFileRoute } from "@tanstack/react-router";
import { Register } from "@/components/ml/Register";

export const Route = createFileRoute("/register")({ component: Register });
