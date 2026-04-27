"use client";

import React, { useState, useMemo } from "react";
// Inline close icon — no external dependency
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type PIStatus = "GA" | "LA" | "Beta" | "Preview";

type Resource = { label: string; url: string };

type PI = {
  id: string;
  issueKey: string;
  title: string;
  summary: string;
  description: string;
  howToOrder: string;
  date: string;
  month: string;
  year: number;
  product: string;
  productCategory: string;
  status: PIStatus;
  featured: boolean;
  customer360: boolean;
  roadmap: boolean;
  bigRock: boolean;
  topFeature: boolean;
  tier: string;
  supportedClouds: string[];
  internalResources: Resource[];
  externalResources: Resource[];
  slack: string;
};

// ─── Category Style Map ─────────────────────────────────────────────────────────

const CAT_STYLES: Record<string, { dot: string; selected: string; unselected: string }> = {
  "Zero Trust Users": {
    dot: "bg-emerald-500",
    selected: "bg-emerald-50 border-emerald-400 text-emerald-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Data Security": {
    dot: "bg-blue-500",
    selected: "bg-blue-50 border-blue-400 text-blue-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Zero Trust Cloud": {
    dot: "bg-sky-500",
    selected: "bg-sky-50 border-sky-400 text-sky-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Zero Trust Branch": {
    dot: "bg-orange-500",
    selected: "bg-orange-50 border-orange-400 text-orange-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "SecOps": {
    dot: "bg-red-500",
    selected: "bg-red-50 border-red-400 text-red-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "AI Security": {
    dot: "bg-violet-500",
    selected: "bg-violet-50 border-violet-400 text-violet-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Data Fabric": {
    dot: "bg-indigo-500",
    selected: "bg-indigo-50 border-indigo-400 text-indigo-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Platform Experience": {
    dot: "bg-teal-500",
    selected: "bg-teal-50 border-teal-400 text-teal-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Platform": {
    dot: "bg-slate-500",
    selected: "bg-slate-100 border-slate-400 text-slate-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Unified Experience": {
    dot: "bg-rose-500",
    selected: "bg-rose-50 border-rose-400 text-rose-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
  "Engineering Uplift": {
    dot: "bg-amber-500",
    selected: "bg-amber-50 border-amber-400 text-amber-800",
    unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
  },
};

const DEFAULT_CAT_STYLE = {
  dot: "bg-gray-400",
  selected: "bg-gray-100 border-gray-400 text-gray-800",
  unselected: "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
};

function getCatStyle(category: string) {
  return CAT_STYLES[category] ?? DEFAULT_CAT_STYLE;
}

// ─── Dummy Data ─────────────────────────────────────────────────────────────────

const LOREM_DESC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_ORDER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const RES = (n: number): Resource[] =>
  Array.from({ length: n }, (_, i) => ({ label: `URL to resource ${i + 1}`, url: "#" }));

const DUMMY_PIs: PI[] = [
  // ── Zero Trust Users ─ April 2026 ──────────────────────────────────────────
  {
    id: "zdx-rum-ga",
    issueKey: "ZDX-1234",
    title: "ZDX Real User Monitoring (RUM) is Now GA",
    summary:
      "Zscaler now offers ZDX Real User Monitoring (RUM) that supplements existing synthetic monitoring to give customers a comprehensive performance view of their SaaS/Private Apps and remove the 'blame game' between Network Operations, Service Desk and Application teams.",
    description: LOREM_DESC,
    howToOrder: LOREM_ORDER,
    date: "2026-04-17",
    month: "2026-04",
    year: 2026,
    product: "Digital Experience (ZDX)",
    productCategory: "Zero Trust Users",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: false,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(3),
    externalResources: RES(3),
    slack: "#zdx-rum-ga",
  },
  {
    id: "zia-great-la",
    issueKey: "ZIA-5678",
    title: "ZIA Great Feature is Now LA",
    summary:
      "Zscaler now offers ZDX Real User Monitoring (RUM) that supplements existing synthetic monitoring to give customers a comprehensive performance view of their SaaS/Private Apps and remove the 'blame game' between Network Operations, Service Desk and Application teams.",
    description:
      "ZIA introduces a new inline security capability that allows customers to set fine-grained policies for cloud application access. This feature significantly reduces the attack surface by enforcing least-privilege access.",
    howToOrder:
      "Contact your Zscaler account team to enable this feature. Available in the ZIA admin portal under Policy → Cloud App Control.",
    date: "2026-04-12",
    month: "2026-04",
    year: 2026,
    product: "Secure Internet Access (ZIA)",
    productCategory: "Zero Trust Users",
    status: "LA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(2),
    externalResources: RES(2),
    slack: "#zia-new-features",
  },
  {
    id: "zsdk-mobile-ga",
    issueKey: "ZSDK-111",
    title: "ZSDK Mobile SDK 3.0 Released",
    summary:
      "The Zscaler SDK 3.0 for iOS and Android provides improved performance, battery optimization, and support for the latest mobile OS versions with enhanced VoIP and video conferencing support.",
    description:
      "ZSDK 3.0 delivers a 40% reduction in battery consumption for always-on security and introduces new APIs for application developers to integrate Zscaler security directly into custom mobile apps.",
    howToOrder:
      "Available on the Zscaler Developer Portal. SDK packages can be downloaded from the developer portal or integrated via CocoaPods/Maven.",
    date: "2026-04-05",
    month: "2026-04",
    year: 2026,
    product: "ZSDK",
    productCategory: "Zero Trust Users",
    status: "GA",
    featured: false,
    customer360: false,
    roadmap: false,
    bigRock: false,
    topFeature: false,
    tier: "3",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(1),
    externalResources: RES(2),
    slack: "#zsdk-releases",
  },
  // ── Zero Trust Users ─ March 2026 ──────────────────────────────────────────
  {
    id: "zpa-new-ga",
    issueKey: "ZPA-9012",
    title: "ZPA New Feature is Now GA",
    summary:
      "Zscaler now offers ZDX Real User Monitoring (RUM) that supplements existing synthetic monitoring to give customers a comprehensive performance view of their SaaS/Private Apps and remove the 'blame game' between Network Operations, Service Desk and Application teams.",
    description:
      "ZPA introduces continuous risk assessment for private application access, automatically adjusting access policies based on real-time device posture and user behavior signals.",
    howToOrder:
      "Available to all ZPA customers in the ZPA admin portal. Enable under Configuration → Risk-Based Access. Documentation available in the Zscaler Help Center.",
    date: "2026-03-17",
    month: "2026-03",
    year: 2026,
    product: "Secure Private Access (ZPA)",
    productCategory: "Zero Trust Users",
    status: "GA",
    featured: true,
    customer360: false,
    roadmap: true,
    bigRock: true,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(2),
    slack: "#zpa-ga-releases",
  },
  {
    id: "zdx-rum-ga-2",
    issueKey: "ZDX-3456",
    title: "ZDX Real User Monitoring (RUM) is Now GA",
    summary:
      "Zscaler now offers ZDX Real User Monitoring (RUM) that supplements existing synthetic monitoring to give customers a comprehensive performance view of their SaaS/Private Apps and remove the 'blame game' between Network Operations, Service Desk and Application teams.",
    description:
      "Extended RUM capabilities now cover additional SaaS applications including Microsoft Teams, Zoom, and Salesforce with detailed performance breakdowns by network segment.",
    howToOrder:
      "Available through ZDX Admin Portal. Navigate to Monitoring → Real User Monitoring and enable for target applications.",
    date: "2026-03-17",
    month: "2026-03",
    year: 2026,
    product: "Digital Experience (ZDX)",
    productCategory: "Zero Trust Users",
    status: "GA",
    featured: false,
    customer360: true,
    roadmap: false,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(1),
    externalResources: RES(1),
    slack: "#zdx-rum",
  },
  {
    id: "ztb-browser-ga",
    issueKey: "ZTB-220",
    title: "Zero Trust Browser Isolation Enhanced Controls",
    summary:
      "Zero Trust Browser now supports enhanced isolation controls with configurable clipboard restrictions, file upload/download policies, and session watermarking for sensitive web applications.",
    description:
      "The new isolation controls give organizations granular policy enforcement for browser sessions accessing sensitive internal and third-party web apps without impacting user experience.",
    howToOrder: "Available to all Zero Trust Browser customers. Enable in ZIA Admin Portal under Browser Isolation → Enhanced Controls.",
    date: "2026-03-08",
    month: "2026-03",
    year: 2026,
    product: "Zero Trust Browser",
    productCategory: "Zero Trust Users",
    status: "GA",
    featured: false,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(2),
    externalResources: RES(2),
    slack: "#zt-browser",
  },
  // ── Data Security ─ April 2026 ─────────────────────────────────────────────
  {
    id: "dlp-ai-ga",
    issueKey: "DLP-2345",
    title: "Core DLP AI-Powered Classification is Now GA",
    summary:
      "Zscaler Core DLP now uses AI-powered content classification to automatically detect and protect sensitive data across all channels with greater accuracy and reduced false positives.",
    description:
      "The new AI classification engine in Core DLP leverages machine learning models trained on millions of data samples to identify sensitive content with unprecedented accuracy, reducing manual policy configuration effort by up to 70%.",
    howToOrder:
      "Available to all Core DLP customers. Enable in ZIA Admin Portal under Data Loss Prevention → AI Classification.",
    date: "2026-04-20",
    month: "2026-04",
    year: 2026,
    product: "Core DLP",
    productCategory: "Data Security",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: true,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(2),
    slack: "#dlp-ai-classification",
  },
  {
    id: "dspm-cloud-ga",
    issueKey: "DSPM-789",
    title: "DSPM Cloud Data Discovery Enhanced",
    summary:
      "Data Security Posture Management now supports automated discovery and classification of sensitive data across 50+ cloud storage services, including AWS S3, Azure Blob, and Google Cloud Storage.",
    description:
      "DSPM's enhanced discovery engine scans structured and unstructured data across major cloud providers, automatically identifying and tagging sensitive data based on regulatory requirements (GDPR, HIPAA, PCI-DSS).",
    howToOrder:
      "Contact your Zscaler account team for DSPM licensing. Available as add-on to existing Data Security subscriptions.",
    date: "2026-04-15",
    month: "2026-04",
    year: 2026,
    product: "DSPM",
    productCategory: "Data Security",
    status: "GA",
    featured: true,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: true,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(1),
    externalResources: RES(2),
    slack: "#dspm-product",
  },
  {
    id: "email-dlp-la",
    issueKey: "EDLP-456",
    title: "Email DLP Smart Detection is Now LA",
    summary:
      "Email DLP introduces smart detection rules that leverage contextual NLP analysis to identify sensitive content in email attachments and body text across Microsoft 365 and Google Workspace.",
    description:
      "Smart Detection uses NLP and pattern matching to identify over 200 sensitive data types in email communications, dramatically reducing false positives compared to rule-based systems.",
    howToOrder: "Available in Limited Availability. Contact your Zscaler account team to enroll in the Email DLP LA program.",
    date: "2026-04-08",
    month: "2026-04",
    year: 2026,
    product: "Email DLP",
    productCategory: "Data Security",
    status: "LA",
    featured: false,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "3",
    supportedClouds: ["ZS 1"],
    internalResources: RES(1),
    externalResources: RES(1),
    slack: "#email-dlp",
  },
  {
    id: "sspm-saas-ga",
    issueKey: "SSPM-334",
    title: "SSPM SaaS Misconfiguration Auto-Remediation",
    summary:
      "Zscaler SSPM now supports automated remediation workflows for critical SaaS misconfigurations, reducing MTTR for security posture issues from days to minutes.",
    description:
      "The auto-remediation engine integrates with leading SaaS platforms to automatically apply security configuration fixes when critical misconfigurations are detected, with full audit logging.",
    howToOrder: "Available to SSPM customers. Enable Auto-Remediation in the SSPM admin console under Settings → Remediation Policies.",
    date: "2026-04-03",
    month: "2026-04",
    year: 2026,
    product: "SSPM",
    productCategory: "Data Security",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: false,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(3),
    slack: "#sspm-product",
  },
  // ── SecOps ─ March 2026 ────────────────────────────────────────────────────
  {
    id: "soc-unified-ga",
    issueKey: "SOC-1122",
    title: "SOC Workbench Unified Investigation is Now GA",
    summary:
      "The SOC Workbench now provides a unified investigation workspace that correlates alerts across Zscaler platform data, SIEM integrations, and threat intelligence feeds for faster incident response.",
    description:
      "SOC Workbench's unified investigation capability reduces mean time to respond (MTTR) by providing analysts with correlated context from all Zscaler data sources in a single pane of glass.",
    howToOrder:
      "Available to all SecOps customers. Access via ZIA Admin Portal → SOC Workbench → Enable Unified Investigation.",
    date: "2026-03-28",
    month: "2026-03",
    year: 2026,
    product: "SOC Workbench",
    productCategory: "SecOps",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: true,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(1),
    slack: "#soc-workbench",
  },
  {
    id: "idp-aem-la",
    issueKey: "IDP-334",
    title: "Identity Protection Active Exposure Management is Now LA",
    summary:
      "Identity Protection now includes Active Exposure Management to continuously monitor for identity-based attack vectors including misconfigured service accounts, stale credentials, and privilege escalation paths.",
    description:
      "Active Exposure Management automates the discovery and remediation of identity risks, providing security teams with a prioritized list of identity vulnerabilities and recommended fixes.",
    howToOrder: "Contact your Zscaler account team for Identity Protection licensing. Limited Availability access available now.",
    date: "2026-03-15",
    month: "2026-03",
    year: 2026,
    product: "Identity Protection",
    productCategory: "SecOps",
    status: "LA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: false,
    topFeature: true,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(1),
    externalResources: RES(2),
    slack: "#identity-protection",
  },
  {
    id: "easm-ga",
    issueKey: "EASM-567",
    title: "External Attack Surface Management Now GA",
    summary:
      "Zscaler EASM provides continuous discovery and risk assessment of your external-facing assets, helping security teams identify and remediate exposed infrastructure before attackers exploit it.",
    description:
      "EASM continuously scans and inventories all internet-facing assets, correlating findings with Zscaler threat intelligence to prioritize remediation based on active exploitation risk.",
    howToOrder: "Available as standalone or bundled with SecOps Suite. Contact your account team or purchase via the Zscaler marketplace.",
    date: "2026-03-10",
    month: "2026-03",
    year: 2026,
    product: "External Attack Surface Management",
    productCategory: "SecOps",
    status: "GA",
    featured: false,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(2),
    slack: "#easm-product",
  },
  // ── AI Security ─ April 2026 ───────────────────────────────────────────────
  {
    id: "ai-guard-la",
    issueKey: "AISG-445",
    title: "AI Guard GenAI Application Control is Now LA",
    summary:
      "AI Guard now provides granular control over employee use of generative AI applications, with policy enforcement for data sharing, prompt injection protection, and compliance logging.",
    description:
      "AI Guard's GenAI control capabilities help organizations manage the security risks of AI adoption while enabling productive use of tools like ChatGPT, Copilot, and Gemini.",
    howToOrder: "Available as Limited Availability to select customers. Contact your Zscaler account team to join the LA program.",
    date: "2026-04-10",
    month: "2026-04",
    year: 2026,
    product: "AI Guard",
    productCategory: "AI Security",
    status: "LA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: true,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(1),
    slack: "#ai-guard-la",
  },
  {
    id: "public-ai-ga",
    issueKey: "PAI-223",
    title: "Public AI Risk Assessment Dashboard Now Available",
    summary:
      "The new Public AI Risk Assessment Dashboard gives security teams visibility into employee usage of public AI services, risk scores, and compliance status across the organization.",
    description:
      "The dashboard aggregates AI usage signals from ZIA to provide a comprehensive view of Shadow AI risk, helping organizations balance productivity and security.",
    howToOrder: "Available to all AI Security customers. Enable in the ZIA Admin Portal under AI Security → Risk Dashboard.",
    date: "2026-04-05",
    month: "2026-04",
    year: 2026,
    product: "Public AI",
    productCategory: "AI Security",
    status: "GA",
    featured: false,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(1),
    externalResources: RES(1),
    slack: "#ai-security",
  },
  // ── Platform Experience ─ April 2026 ───────────────────────────────────────
  {
    id: "health360-ga",
    issueKey: "H360-890",
    title: "Health360 AI-Powered Anomaly Detection is Now GA",
    summary:
      "Health360 now includes AI-powered anomaly detection that automatically identifies degraded service performance and correlates it with configuration changes or infrastructure events.",
    description:
      "Health360's anomaly detection uses ML models trained on billions of Zscaler platform events to identify performance degradation 3x faster than threshold-based alerting.",
    howToOrder: "Available to all Health360 customers. Enable Anomaly Detection in the Health360 admin portal under Settings → AI Features.",
    date: "2026-04-18",
    month: "2026-04",
    year: 2026,
    product: "Health360",
    productCategory: "Platform Experience",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: false,
    topFeature: true,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(1),
    externalResources: RES(1),
    slack: "#health360",
  },
  {
    id: "risk360-exec",
    issueKey: "RISK-567",
    title: "Risk360 Executive Dashboard Enhancements",
    summary:
      "Risk360 now features an enhanced executive dashboard with drill-down capabilities, trend analysis, and benchmark comparisons to help CISOs communicate security posture to board-level stakeholders.",
    description:
      "The new Risk360 executive dashboard provides C-suite ready visualizations with industry benchmarking and peer comparisons. Custom report generation is now available with scheduled delivery.",
    howToOrder: "Available to all Risk360 customers. Access in the Risk360 portal under Dashboards → Executive View.",
    date: "2026-04-14",
    month: "2026-04",
    year: 2026,
    product: "Risk360",
    productCategory: "Platform Experience",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: false,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(1),
    externalResources: RES(2),
    slack: "#risk360-product",
  },
  // ── Zero Trust Branch ─ March 2026 ─────────────────────────────────────────
  {
    id: "ztb-sdwan-ga",
    issueKey: "ZTB-890",
    title: "Zero Trust Branch SD-WAN Integration Now GA",
    summary:
      "Zero Trust Branch now offers native SD-WAN integration allowing organizations to extend zero trust policies to branch office traffic without deploying additional hardware.",
    description:
      "The SD-WAN integration for Zero Trust Branch simplifies branch networking by replacing traditional VPN concentrators with zero trust architecture, reducing complexity and improving security posture.",
    howToOrder: "Contact your Zscaler account team for SD-WAN integration enablement and professional services.",
    date: "2026-03-15",
    month: "2026-03",
    year: 2026,
    product: "Zero Trust Branch - SD-WAN",
    productCategory: "Zero Trust Branch",
    status: "GA",
    featured: false,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(1),
    externalResources: RES(2),
    slack: "#zt-branch",
  },
  // ── Zero Trust Cloud ─ April 2026 ──────────────────────────────────────────
  {
    id: "ztc-microseg-la",
    issueKey: "ZTC-234",
    title: "ZT Cloud Microsegmentation Policy Automation is Now LA",
    summary:
      "Zero Trust Cloud Microsegmentation now supports automated policy generation using AI to analyze workload communication patterns and recommend least-privilege segmentation policies.",
    description:
      "Microsegmentation policy automation reduces the operational burden of maintaining granular workload-to-workload policies in dynamic cloud environments. AI recommendations are reviewed by administrators before enforcement.",
    howToOrder:
      "Available to ZT Cloud customers. Enable Policy Automation in the Microsegmentation admin console under Settings → Policy AI.",
    date: "2026-04-08",
    month: "2026-04",
    year: 2026,
    product: "ZT Cloud - Microsegmentation",
    productCategory: "Zero Trust Cloud",
    status: "LA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: true,
    topFeature: true,
    tier: "1",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(2),
    externalResources: RES(1),
    slack: "#zt-cloud-microseg",
  },
  // ── Data Fabric ─ March 2026 ───────────────────────────────────────────────
  {
    id: "lakehouse-v2",
    issueKey: "LH-567",
    title: "Lakehouse & Data Platform v2.0 Released",
    summary:
      "Zscaler Lakehouse & Data Platform v2.0 introduces real-time data streaming capabilities, enhanced query performance, and expanded connector support for third-party SIEM and analytics platforms.",
    description:
      "The v2.0 release delivers 10x query performance improvements and support for real-time event streaming to downstream analytics systems. New connectors for Splunk, Elastic, and Microsoft Sentinel are included.",
    howToOrder: "Available to all Data Fabric customers. Upgrade available through the Zscaler Admin Portal → Data Platform → Upgrade.",
    date: "2026-03-22",
    month: "2026-03",
    year: 2026,
    product: "Lakehouse & Data Platform",
    productCategory: "Data Fabric",
    status: "GA",
    featured: true,
    customer360: false,
    roadmap: true,
    bigRock: false,
    topFeature: false,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2", "ZS 3"],
    internalResources: RES(1),
    externalResources: RES(1),
    slack: "#data-platform",
  },
  // ── Unified Experience ─ April 2026 ────────────────────────────────────────
  {
    id: "qbr-auto-ga",
    issueKey: "QBR-789",
    title: "QBR Automated Report Generation is Now GA",
    summary:
      "Quarterly Business Review reports can now be automatically generated with one click, pulling data from Risk360, Health360, and ZDX to create comprehensive customer-ready presentations.",
    description:
      "Automated QBR generation reduces report preparation time from hours to minutes, with customizable templates and automatic data population from Zscaler platform telemetry.",
    howToOrder: "Available in the Unified Experience portal under Reports → QBR Generator. Contact your CSM to enable for your organization.",
    date: "2026-04-14",
    month: "2026-04",
    year: 2026,
    product: "QBR",
    productCategory: "Unified Experience",
    status: "GA",
    featured: true,
    customer360: true,
    roadmap: true,
    bigRock: false,
    topFeature: true,
    tier: "2",
    supportedClouds: ["ZS 1", "ZS 2"],
    internalResources: RES(1),
    externalResources: RES(2),
    slack: "#qbr-product",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleString("default", { month: "long", day: "numeric" });
}

function getProductShortName(product: string): string {
  const abbrev = product.match(/\(([A-Z0-9\-]+)\)/);
  if (abbrev) return abbrev[1];
  if (product.length <= 12) return product;
  const words = product.split(/[\s\-–]+/).filter(Boolean);
  if (words.length >= 4) return words.map((w) => w[0].toUpperCase()).join("");
  return product.slice(0, 12);
}

function getStatusStyle(status: PIStatus): string {
  switch (status) {
    case "GA":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "LA":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Beta":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Preview":
      return "bg-sky-100 text-sky-700 border-sky-200";
  }
}

// ─── PI Card ───────────────────────────────────────────────────────────────────

function PICard({
  pi,
  isSelected,
  onClick,
}: {
  pi: PI;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 cursor-pointer transition-all duration-150 ${
        isSelected
          ? "border-2 border-amber-400 shadow-md"
          : "border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
      }`}
    >
      {/* Title + date */}
      <div className="flex justify-between items-start gap-3">
        <h3
          className={`font-semibold text-base leading-snug flex-1 ${
            isSelected ? "text-amber-700" : "text-gray-900"
          }`}
        >
          {pi.title}
        </h3>
        <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full border border-green-200 shrink-0 whitespace-nowrap font-medium">
          {formatDisplayDate(pi.date)}
        </span>
      </div>

      {/* Summary */}
      <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-3">{pi.summary}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 gap-2 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="border border-blue-300 text-blue-500 text-xs px-3 py-1 rounded-full hover:bg-blue-50 transition-colors font-medium"
          >
            Learn More
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-violet-400 hover:bg-violet-500 text-white text-xs px-3 py-1 rounded-full transition-colors font-medium"
          >
            Chat
          </button>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-end">
          <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full border border-gray-200">
            {pi.productCategory}
          </span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full border border-gray-200">
            {getProductShortName(pi.product)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── PI Drawer ─────────────────────────────────────────────────────────────────

function PIDrawer({ pi, onClose }: { pi: PI; onClose: () => void }) {
  const catStyle = getCatStyle(pi.productCategory);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-start gap-3 pb-4 border-b border-gray-100">
        <h2 className="text-gray-900 font-bold text-lg leading-snug flex-1">{pi.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 transition-colors shrink-0 mt-0.5 p-1 rounded-lg hover:bg-gray-100"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap pt-3 pb-3 border-b border-gray-100">
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${getStatusStyle(pi.status)}`}>
          {pi.status}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${catStyle.selected}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${catStyle.dot}`} />
          {pi.productCategory}
        </span>
        {pi.topFeature && (
          <span className="bg-amber-100 text-amber-700 border border-amber-200 text-xs px-2.5 py-1 rounded-full font-medium">
            ⭐ Top Feature
          </span>
        )}
        {pi.featured && (
          <span className="bg-violet-100 text-violet-700 border border-violet-200 text-xs px-2.5 py-1 rounded-full font-medium">
            Featured
          </span>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto space-y-5 pt-4">
        {/* Description */}
        <section>
          <h3 className="text-blue-600 font-semibold text-sm mb-1.5">Description</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{pi.description}</p>
        </section>

        {/* How to Order */}
        <section>
          <h3 className="text-blue-600 font-semibold text-sm mb-1.5">How to Order</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{pi.howToOrder}</p>
        </section>

        {/* Supported Clouds */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-800 font-semibold text-sm">Supported Clouds</span>
            <div className="flex gap-1.5 flex-wrap">
              {pi.supportedClouds.map((c) => (
                <span
                  key={c}
                  className="border border-gray-300 text-gray-600 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 bg-gray-50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Key Resources */}
        <section>
          <h3 className="text-gray-800 font-semibold text-sm mb-2">Key Resources</h3>
          <div className="mb-3">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">Internal</p>
            <ul className="space-y-1.5">
              {pi.internalResources.map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                  <a href={r.url} className="text-blue-400 hover:text-blue-600 text-sm hover:underline transition-colors">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">External</p>
            <ul className="space-y-1.5">
              {pi.externalResources.map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                  <a href={r.url} className="text-blue-400 hover:text-blue-600 text-sm hover:underline transition-colors">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ask */}
        <section>
          <h3 className="text-gray-800 font-semibold text-sm mb-1">Ask</h3>
          <p className="text-gray-400 text-sm">Slack</p>
        </section>

        {/* Metadata grid */}
        <section className="border-t border-gray-100 pt-4">
          <h3 className="text-gray-800 font-semibold text-sm mb-3">Metadata</h3>
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
            {[
              { label: "Featured", value: pi.featured ? "Yes" : "No", positive: pi.featured },
              { label: "Customer360", value: pi.customer360 ? "Yes" : "No", positive: pi.customer360 },
              { label: "Roadmap", value: pi.roadmap ? "Yes" : "No", positive: pi.roadmap },
              { label: "Big Rock", value: pi.bigRock ? "Yes" : "No", positive: pi.bigRock },
              { label: "Tier", value: pi.tier, positive: true },
              { label: "Issue Key", value: pi.issueKey, positive: true },
            ].map(({ label, value, positive }) => (
              <div key={label} className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
                <span className="text-gray-400 text-xs">{label}</span>
                <span className={`font-semibold text-xs ${positive ? "text-gray-800" : "text-gray-400"}`}>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function InnovationFeedPage() {
  const allCategories = useMemo(
    () =>
      [
        "Zero Trust Users",
        "Data Security",
        "Zero Trust Cloud",
        "Zero Trust Branch",
        "SecOps",
        "AI Security",
        "Data Fabric",
        "Platform Experience",
        "Platform",
        "Unified Experience",
        "Engineering Uplift",
      ].filter((c) => DUMMY_PIs.some((p) => p.productCategory === c)),
    []
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Zero Trust Users"]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showTopFeaturesOnly, setShowTopFeaturesOnly] = useState(false);
  const [tierOneOnly, setTierOneOnly] = useState(false);
  const [selectedPI, setSelectedPI] = useState<PI | null>(null);

  // Products available within selected categories
  const availableProducts = useMemo(() => {
    const source =
      selectedCategories.length === 0
        ? DUMMY_PIs
        : DUMMY_PIs.filter((p) => selectedCategories.includes(p.productCategory));
    return [...new Set(source.map((p) => p.product))].sort();
  }, [selectedCategories]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => {
      const next = prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat];
      const validProds = DUMMY_PIs
        .filter((p) => (next.length === 0 ? true : next.includes(p.productCategory)))
        .map((p) => p.product);
      setSelectedProducts((sp) => sp.filter((p) => validProds.includes(p)));
      return next;
    });
  }

  function toggleProduct(prod: string) {
    setSelectedProducts((prev) =>
      prev.includes(prod) ? prev.filter((p) => p !== prod) : [...prev, prod]
    );
  }

  const filteredPIs = useMemo(() => {
    return DUMMY_PIs.filter((pi) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(pi.productCategory)) return false;
      if (selectedProducts.length > 0 && !selectedProducts.includes(pi.product)) return false;
      if (showTopFeaturesOnly && !pi.topFeature) return false;
      if (tierOneOnly && pi.tier !== "1") return false;
      return true;
    });
  }, [selectedCategories, selectedProducts, showTopFeaturesOnly, tierOneOnly]);

  // Group by year+month descending
  const grouped = useMemo((): Array<{ year: number; monthLabel: string; items: PI[] }> => {
    const map = new Map<string, PI[]>();
    for (const pi of filteredPIs) {
      const key = `${pi.year}-${pi.month}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(pi);
    }
    return [...map.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([, items]) => ({
        year: items[0].year,
        monthLabel: new Date(items[0].month + "-01T00:00:00").toLocaleString("default", { month: "long" }),
        items: [...items].sort((a, b) => b.date.localeCompare(a.date)),
      }));
  }, [filteredPIs]);

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="px-8 pt-8 pb-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Product Innovation Feed</h1>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="px-8 py-4 sticky top-0 bg-[#F5EFE6] z-10 border-b border-[#E8E0D4]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* Left: category + product chips */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => {
                const style = getCatStyle(cat);
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-150 ${
                      isSelected ? style.selected : style.unselected
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? style.dot : "bg-gray-300"}`} />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Product chips */}
            {availableProducts.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {availableProducts.map((prod) => {
                  const isSelected = selectedProducts.includes(prod);
                  const pi = DUMMY_PIs.find((p) => p.product === prod);
                  const catStyle = pi ? getCatStyle(pi.productCategory) : DEFAULT_CAT_STYLE;
                  return (
                    <button
                      key={prod}
                      onClick={() => toggleProduct(prod)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-medium transition-all duration-150 ${
                        isSelected ? catStyle.selected : catStyle.unselected
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? catStyle.dot : "bg-gray-300"}`} />
                      {getProductShortName(prod)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: secondary filters */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowTopFeaturesOnly(!showTopFeaturesOnly)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-150 ${
                showTopFeaturesOnly
                  ? "bg-amber-50 border-amber-400 text-amber-800"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${showTopFeaturesOnly ? "bg-amber-500" : "bg-gray-300"}`} />
              Top Features
            </button>
            <button
              onClick={() => setTierOneOnly(!tierOneOnly)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-150 ${
                tierOneOnly
                  ? "bg-slate-100 border-slate-400 text-slate-800"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${tierOneOnly ? "bg-slate-500" : "bg-gray-300"}`} />
              Tier 1
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="flex min-h-0">
        {/* Feed */}
        <div
          className={`flex-1 min-w-0 px-8 py-6 transition-all duration-300 ${
            selectedPI ? "mr-[440px]" : ""
          }`}
        >
          {grouped.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <div className="text-lg font-semibold text-gray-600 mb-1">No product initiatives found</div>
              <div className="text-sm">Try adjusting your filters or selecting different categories.</div>
            </div>
          ) : (
            <div className="space-y-8">
              {grouped.map((group) => (
                <div key={`${group.year}-${group.monthLabel}`} className="flex items-start gap-4">
                  {/* Year + Month */}
                  <div className="w-[72px] text-right shrink-0 pt-1">
                    <div className="text-xs text-gray-400 font-medium leading-none">{group.year}</div>
                    <div className="text-xl font-bold text-gray-500 mt-0.5 leading-tight">{group.monthLabel}</div>
                  </div>

                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-2.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-[#F5EFE6] shadow-sm z-10" />
                    {group.items.length > 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-1" style={{ minHeight: 20 }} />
                    )}
                  </div>

                  {/* PI Cards */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {group.items.map((pi: PI) => (
                      <div key={pi.id}>
                        <PICard
                          pi={pi}
                          isSelected={selectedPI?.id === pi.id}
                          onClick={() => setSelectedPI(selectedPI?.id === pi.id ? null : pi)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Drawer ─────────────────────────────────────────────── */}
        <div
          className={`fixed top-0 right-0 h-full w-[440px] bg-white border-l border-gray-200 shadow-2xl z-50 overflow-y-auto p-6 transition-transform duration-300 ease-in-out ${
            selectedPI ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedPI && <PIDrawer pi={selectedPI} onClose={() => setSelectedPI(null)} />}
        </div>
      </div>
    </div>
  );
}
