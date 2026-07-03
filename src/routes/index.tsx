import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/ml/Landing";

export const Route = createFileRoute("/")({ component: Landing });
