"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    moduleName?: string;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`[Resilience] ${this.props.moduleName} crashed:`, error, errorInfo);
        // In a real app, log to Sentry/Datadog here
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-zinc-900/50 rounded-2xl border border-white/5 p-8">
                    <Container>
                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-bold text-white">Temporary Glitch</h3>
                            <p className="text-zinc-400">
                                The {this.props.moduleName || "component"} encountered an issue.
                                Our engineering team has been notified.
                            </p>
                            <button
                                onClick={() => this.setState({ hasError: false })}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
                            >
                                Try Again
                            </button>
                        </div>
                    </Container>
                </div>
            );
        }

        return this.props.children;
    }
}
