"use client";
import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';

export function WebVitals() {
    useReportWebVitals((metric) => {
        // In a real production app, you would send this to an analytics endpoint
        // e.g. sendToAnalytics(metric)
        // For now, we log to console in a readable format for developers/stakeholders
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Telemetry] ${metric.name}:`, Math.round(metric.value), metric.rating);
        }
    });

    return null;
}
