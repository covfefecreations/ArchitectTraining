const phases = {
  phase0: {
    id: "phase0",
    title: "Phase 0 — Vision, Constraints & System Framing",
    objective:
      "Define purpose, constraints, invariants, and the architecture boundaries that will govern all later decisions.",
    schema: `┌──────────────────────────────────────────────────────────────┐
│                Phase 0 — System Framing Layer                 │
│  Purpose | Constraints | Core Capabilities | Architecture Lens│
└──────────────────────────────────────────────────────────────┘`,
    objectives: [
      {
        id: "0-1",
        number: "0.1",
        title: "Define Purpose & Core Value Loop",
        description:
          "Clarify what the system must accomplish, who it serves, and what the 'value loop' looks like end-to-end.",
        tasks: [
          "Map primary user groups",
          "Describe the core transformation: Input → Process → Output → Feedback",
          "Document 'essential value' the system provides",
          "Identify what makes this system non-negotiably useful"
        ],
        acceptance:
          "Purpose narrative written, value loop diagrammed, non-negotiables listed",
        dependencies: [],
        notes: "This becomes the architectural north star"
      },
      {
        id: "0-2",
        number: "0.2",
        title: "Identify Constraints & Invariants",
        description:
          "List every hard technical, organizational, financial, and timeline constraint. Define architectural invariants that must always remain true.",
        tasks: [
          "Document technical constraints (hosting, platform, languages)",
          "Document business constraints (timeline, cost ceiling)",
          "Define architecture invariants (e.g., 'stateless services only', 'single DB', etc.)",
          "Capture maximum acceptable system complexity"
        ],
        acceptance:
          "Clear constraint sheet, approved invariants list, edge constraints mapped",
        dependencies: ["0-1"],
        notes: "Constraints eliminate bad choices early and reduce exploration cost"
      },
      {
        id: "0-3",
        number: "0.3",
        title: "System Boundaries & Module Constellation",
        description:
          "Define what is inside the system versus external integrations. Identify the major modules and how they relate.",
        tasks: [
          "Draw boundary map of system vs external providers",
          "Define module constellation (major units of responsibility)",
          "Document interface expectations between modules",
          "Specify high-level data flow between modules"
        ],
        acceptance:
          "Boundary diagram complete, module constellation documented, interfaces described",
        dependencies: ["0-1", "0-2"],
        notes: "This is the skeleton the final architecture will hang on"
      }
    ]
  },

  phase1: {
    id: "phase1",
    title: "Phase 1 — Architecture Extraction & System Blueprint",
    objective:
      "Translate constraints and purpose into a coherent architecture, including data model, flow models, stability diagrams, and scale strategy.",
    schema: `┌────────────────────────────────────────────────────────────┐
│       Phase 1 — Architecture Blueprint & Flow Models         │
│  Data Model | Flow Architecture | Interaction Surfaces       │
└────────────────────────────────────────────────────────────┘`,
    objectives: [
      {
        id: "1-1",
        number: "1.1",
        title: "Data Model Definition",
        description:
          "Define the core domain objects, relationships, lifecycles, persistence rules, and storage strategy.",
        tasks: [
          "Map domain objects and relationships",
          "Define lifecycle for each entity",
          "Decide on persistence layer(s)",
          "Define data invariants and constraints"
        ],
        acceptance:
          "Canonical data model documented, diagrams validated, constraints defined",
        dependencies: ["0-3"],
        notes: "Data model often outlives every other part of the system"
      },
      {
        id: "1-2",
        number: "1.2",
        title: "Process Flow Architecture",
        description:
          "Define how the system behaves: synchronous flows, async flows, choke points, durability, and ordering guarantees.",
        tasks: [
          "Create system sequence diagrams",
          "Define async vs sync boundaries",
          "Identify choke points and latency-sensitive flows",
          "Define failure modes and fallback paths"
        ],
        acceptance:
          "Clear flow documentation, latencies mapped, async boundaries justified",
        dependencies: ["1-1"],
        notes: "Flow architecture defines perceived performance"
      },
      {
        id: "1-3",
        number: "1.3",
        title: "Interaction Surface Mapping",
        description:
          "Map the surfaces through which users, automations, and other systems interact with the product.",
        tasks: [
          "Define UI surfaces",
          "Define API surfaces",
          "Define service-to-service communication contracts",
          "Document auth requirements for each surface"
        ],
        acceptance:
          "Surface catalog complete, contracts defined, auth linkage documented",
        dependencies: ["1-1", "1-2"],
        notes: "Interaction surfaces often become your stability boundaries"
      }
    ]
  },

  phase2: {
    id: "phase2",
    title: "Phase 2 — Implementation Roadmap, Risks & Scaling Strategy",
    objective:
      "Produce an actionable engineering plan: milestone sequencing, risk mapping, resource projections, and scale strategy.",
    schema: `┌────────────────────────────────────────────────────────────┐
│           Phase 2 — Delivery Roadmap & Scaling               │
│  Milestones | Risks | Resource Plan | Scaling Strategy       │
└────────────────────────────────────────────────────────────┘`,
    objectives: [
      {
        id: "2-1",
        number: "2.1",
        title: "Milestone Sequencing & Critical Path",
        description:
          "Plan the order of implementation, identifying dependencies and critical path.",
        tasks: [
          "Break architecture into milestones",
          "Map dependency graph",
          "Define critical path and risk gates",
          "Assign rough time estimates"
        ],
        acceptance:
          "Sequencing defined, critical path clear, timeline believable",
        dependencies: ["1-3"],
        notes: "This becomes the execution spine"
      },
      {
        id: "2-2",
        number: "2.2",
        title: "Risk Surfaces & Failure Forecasting",
        description:
          "Identify risks across: technology, operational, financial, and architectural surfaces.",
        tasks: [
          "Define risk categories (tech, ops, cost, schedule)",
          "Map risk per module",
          "Propose mitigations and contingencies",
          "Assign likelihood and impact"
        ],
        acceptance:
          "Risk register complete with mitigations and owners",
        dependencies: ["2-1"],
        notes: "Forecasting risks saves months later"
      },
      {
        id: "2-3",
        number: "2.3",
        title: "Scaling Strategy & Resource Plan",
        description:
          "Define how the system scales horizontally/vertically and what resources are needed to operate it.",
        tasks: [
          "Define scaling model (horizontal/vertical)",
          "Define compute/storage/network projections",
          "Define cost envelope for early scale phases",
          "Specify operational runbook outlines"
        ],
        acceptance:
          "Scalable architecture validated, resource plan documented, operating model defined",
        dependencies: ["2-1", "2-2"],
        notes: "Scaling strategy keeps you from painting yourself into a corner"
      }
    ]
  }
};