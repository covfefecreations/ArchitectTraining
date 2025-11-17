import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Eye } from 'lucide-react';

const ProjectDocumentationSystem = () => {
  const [activePhase, setActivePhase] = useState('phase0');
  const [phaseCollapsed, setPhaseCollapsed] = useState({});
  const [cardCollapsed, setCardCollapsed] = useState({});
  const [objectiveStates, setObjectiveStates] = useState({});
  const [completionStates, setCompletionStates] = useState({});
  const [signoffs, setSignoffs] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState(null);

  // Load saved states
  useEffect(() => {
    const savedObjectives = localStorage.getItem('objectiveStates');
    const savedCompletion = localStorage.getItem('completionStates');
    const savedSignoffs = localStorage.getItem('signoffs');
    const savedCardCollapsed = localStorage.getItem('cardCollapsed');
    const savedPhaseCollapsed = localStorage.getItem('phaseCollapsed');

    if (savedObjectives) setObjectiveStates(JSON.parse(savedObjectives));
    if (savedCompletion) setCompletionStates(JSON.parse(savedCompletion));
    if (savedSignoffs) setSignoffs(JSON.parse(savedSignoffs));
    if (savedCardCollapsed) setCardCollapsed(JSON.parse(savedCardCollapsed));
    if (savedPhaseCollapsed) setPhaseCollapsed(JSON.parse(savedPhaseCollapsed));
  }, []);

  // Save states
  const saveState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Phase definitions
  const phases = {
    phase0: {
      id: 'phase0',
      title: 'Phase 0 — Prototype & Foundation',
      objective: 'Establish core architecture with Bun-powered frontend and containerized infrastructure',
      schema: `┌─────────────────────────────────────────────────────────────┐ │                   Frontend (Bun + Next.js)                   │ │                        Port 3000                             │ └──────────────────────┬──────────────────────────────────────┘ │ HTTP/REST ┌──────────────────────▼──────────────────────────────────────┐ │                   Backend (FastAPI)                          │ │                      Port 8000                               │ └─────┬────────────┬────────────┬────────────┬────────────────┘ │            │            │            │ ▼            ▼            ▼            ▼ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │PostgreSQL│ │  Redis   │ │  MinIO   │ │  Runner  │ │   :5432  │ │  :6379   │ │:9000/9001│ │Container │ └──────────┘ └──────────┘ └──────────┘ └──────────┘`,
      objectives: [
        {
          id: '0-1',
          number: '1.1',
          title: 'Scaffold Monorepo with Bun',
          description: 'Initialize the monorepo structure with proper directory organization for apps and infrastructure.',
          tasks: [
            'Create root project directory with apps/ and infrastructure/ folders',
            'Initialize apps/backend with FastAPI scaffolding',
            'Initialize apps/frontend with: bun create next-app',
            'Set up shared configuration (ESLint, Prettier, TypeScript)',
            'Create comprehensive README.md with setup instructions'
          ],
          acceptance: 'Directory structure matches specification, all package.json files present, bun.lockb generated',
          dependencies: [],
          notes: 'Use Bun v1.x for maximum compatibility'
        },
        {
          id: '0-2',
          number: '1.2',
          title: 'Dockerize Infrastructure',
          description: 'Create Docker Compose configuration for all services with Bun-based frontend container.',
          tasks: [
            'Write docker-compose.yml with all services (Postgres, Redis, MinIO, Backend, Frontend)',
            'Create Dockerfile.backend using Python 3.11+ base image',
            'Create Dockerfile.frontend using oven/bun:1 base image',
            'Configure service networking and dependencies',
            "Test full stack deployment: docker-compose up",
            'Create docker-compose.dev.yml for development overrides with volume mounts'
          ],
          acceptance: 'All services start successfully, can access frontend at :3000 and backend at :8000',
          dependencies: ['0-1'],
          notes: 'Frontend Dockerfile must use multi-stage build for optimization'
        },
        {
          id: '0-3',
          number: '1.3',
          title: 'Implement Backend Core',
          description: 'Build FastAPI application with database models, API endpoints, and queue integration.',
          tasks: [
            'Define SQLAlchemy models: Job, TestRun, Result',
            'Implement POST /jobs endpoint for job submission',
            'Implement GET /jobs/{id} endpoint for status retrieval',
            'Configure Redis Queue (RQ) for async job processing',
            'Set up MinIO client for artifact storage',
            'Create Alembic migrations for database schema',
            'Add structured logging and basic error handling'
          ],
          acceptance: 'Can submit job via API, job queued to Redis, status retrievable',
          dependencies: ['0-2'],
          notes: 'Use Pydantic v2 for request/response validation'
        },
        {
          id: '0-4',
          number: '1.4',
          title: 'Build Simple Runner',
          description: 'Create worker process that consumes jobs from queue and executes test harnesses.',
          tasks: [
            'Create worker.py with RQ consumer setup',
            'Implement test executor using subprocess module',
            'Add result capture (stdout, stderr, exit code)',
            'Upload results and logs to MinIO',
            "Update job status in database after completion'",
            'Create simple pytest-based test harness template'
          ],
          acceptance: 'Worker consumes job from queue, executes test, stores result, updates status',
          dependencies: ['0-3'],
          notes: 'Runner should handle timeouts and resource limits'
        },
        {
          id: '0-5',
          number: '1.5',
          title: 'Create Basic Frontend with Bun',
          description: 'Build Next.js UI for job submission, status monitoring, and result viewing.',
          tasks: [
            'Create job submission form with validation',
            'Build status dashboard with real-time updates',
            'Implement result viewer for test artifacts',
            'Configure API client (fetch with error handling)',
            'Add Tailwind CSS styling',
            'Test end-to-end flow: Submit → Monitor → View Results'
          ],
          acceptance: 'Can submit job through UI, monitor progress, view results after completion',
          dependencies: ['0-4'],
          notes: 'Use React Server Components where appropriate for performance'
        }
      ]
    },
    phase1: {
      id: 'phase1',
      title: 'Phase 1 — Harden & UX Enhancement',
      objective: 'Add production-grade security, compliance, and user experience features',
      schema: `┌─────────────────────────────────────────────────────────────┐ │              Frontend (Enhanced UX + Auth)                   │ │                 JWT Token Management                         │ └──────────────────────┬──────────────────────────────────────┘ │ HTTPS + JWT ┌──────────────────────▼──────────────────────────────────────┐ │           Backend (RBAC + Analytics)                         │ │    Auth Middleware | Role Validation | Audit Logs           │ └─────┬────────────┬────────────┬────────────┬────────────────┘ │            │            │            │ ▼            ▼            ▼            ▼ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │PostgreSQL│ │  Redis   │ │  MinIO   │ │  Runner  │ │ +Retention│ │   +RQ    │ │ +Policies│ │+Egress   │ └──────────┘ └──────────┘ └──────────┘ └──────────┘`,
      objectives: [
        {
          id: '1-1',
          number: '2.1',
          title: 'Security & Access Control',
          description: 'Implement Role-Based Access Control with authentication and authorization.',
          tasks: [
            'Define roles: Admin, Developer, Viewer',
            'Implement JWT authentication system',
            'Add auth middleware to API endpoints',
            'Create result retention policy with automated cleanup jobs',
            'Implement scoped network egress rules for runner containers',
            'Add audit logging for all sensitive operations'
          ],
          acceptance: 'Users can authenticate, roles enforced, audit trail captured',
          dependencies: ['0-5'],
          notes: 'Use industry-standard libraries (e.g., python-jose, passlib)'
        },
        {
          id: '1-2',
          number: '2.2',
          title: 'Test Framework & Analytics',
          description: 'Create reusable test harness templates and build analytics for test results.',
          tasks: [
            'Create starter templates: pytest, Jest, JUnit',
            'Implement JUnit XML result parser',
            'Build JSON result parser with normalization',
            'Create analytics dashboard showing pass/fail rates',
            'Add trend charts for test performance over time',
            'Implement test result comparison and diff viewer'
          ],
          acceptance: 'Multiple test frameworks supported, analytics dashboard functional',
          dependencies: ['0-5'],
          notes: 'Parser should handle malformed XML/JSON gracefully'
        },
        {
          id: '1-3',
          number: '2.3',
          title: 'CI/CD Pipeline',
          description: 'Automate validation, testing, and deployment processes.',
          tasks: [
            'Create GitHub Actions / GitLab CI configuration',
            'Add manifest validation step',
            'Implement unit and integration test suites',
            'Set up staging environment',
            'Configure auto-deploy on merge to main',
            'Implement rollback strategy for failed deployments'
          ],
          acceptance: 'Pipeline runs on every commit, deploys to staging automatically',
          dependencies: ['1-1', '1-2'],
          notes: 'Include Bun installation in CI environment setup'
        }
      ]
    },
    phase2: {
      id: 'phase2',
      title: 'Phase 2 — Scale & Operational Excellence',
      objective: 'Enable horizontal scaling, advanced search, and comprehensive observability',
      schema: `┌─────────────────────────────────────────────────────────────┐ │         Frontend (Search + Notifications)                    │ │              OpenSearch Integration                          │ └──────────────────────┬──────────────────────────────────────┘ │ ┌──────────────────────▼──────────────────────────────────────┐ │         Backend (Event-Driven + Monitoring)                  │ │      Kafka/RabbitMQ | Prometheus | Distributed Tracing      │ └─────┬────────────┬────────────┬────────────┬────────────────┘ │            │            │            │ ▼            ▼            ▼            ▼ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │PostgreSQL│ │OpenSearch│ │  MinIO   │ │K8s Runner Pool│ │          │ │          │ │          │ │ Autoscaling   │ └──────────┘ └──────────┘ └──────────┘ └──────────────┘`,
      objectives: [
        {
          id: '2-1',
          number: '3.1',
          title: 'Containerized Runner Pool',
          description: 'Migrate runner to orchestrated container platform with autoscaling.',
          tasks: [
            'Deploy to Kubernetes or Google Cloud Run',
            'Configure Horizontal Pod Autoscaler (HPA)',
            'Build multi-language runner images (Python, Node, Go)',
            'Create runner image registry with versioning',
            'Implement resource quotas and limits per runner',
            'Add pod affinity rules for optimal scheduling'
          ],
          acceptance: 'Runners scale based on queue depth, multi-language support working',
          dependencies: ['1-3'],
          notes: 'Start with 2-10 replica range, tune based on load'
        },
        {
          id: '2-2',
          number: '3.2',
          title: 'Search & Workflow Enhancement',
          description: 'Add indexed search, event-driven architecture, and workflow improvements.',
          tasks: [
            'Deploy OpenSearch cluster (3-node minimum)',
            'Implement event-driven consumers (Kafka or RabbitMQ)',
            'Index all test results in OpenSearch',
            'Build search UI with filters, facets, and full-text search',
            'Add manual review workflow for failed tests',
            'Implement notification system (email + Slack integration)'
          ],
          acceptance: 'Search finds results in <500ms, notifications delivered reliably',
          dependencies: ['1-2'],
          notes: 'Consider Elasticsearch if OpenSearch has licensing concerns'
        },
        {
          id: '2-3',
          number: '3.3',
          title: 'Monitoring & Cost Controls',
          description: 'Implement comprehensive observability and cost management.',
          tasks: [
            'Deploy Prometheus for metrics collection',
            'Set up Grafana dashboards',
            'Implement distributed tracing (Jaeger or Tempo)',
            'Create SLO dashboards: latency, availability, error rate',
            'Set up cost monitoring with budget alerts',
            'Implement autoscaling policies based on queue depth and latency'
          ],
          acceptance: 'Metrics visible in real-time, alerts fire correctly, costs tracked',
          dependencies: ['2-1'],
          notes: 'Define SLOs: 99.5% availability, <2s p95 latency for job submission'
        }
      ]
    }
  };

  const toggleObjective = (objId) => {
    const newStates = { ...objectiveStates, [objId]: !objectiveStates[objId] };
    setObjectiveStates(newStates);
    saveState('objectiveStates', newStates);
  };

  const toggleCompletion = (phaseId, checkId) => {
    const key = `${phaseId}-${checkId}`;
    const newStates = { ...completionStates, [key]: !completionStates[key] };
    setCompletionStates(newStates);
    saveState('completionStates', newStates);
  };

  const updateSignoff = (phaseId, field, value) => {
    const newSignoffs = {
      ...signoffs,
      [phaseId]: {
        ...signoffs[phaseId],
        [field]: value
      }
    };
    setSignoffs(newSignoffs);
    saveState('signoffs', newSignoffs);
  };

  const toggleCard = (cardId) => {
    const newStates = { ...cardCollapsed, [cardId]: !cardCollapsed[cardId] };
    setCardCollapsed(newStates);
    saveState('cardCollapsed', newStates);
  };

  const togglePhase = (phaseId) => {
    const newStates = { ...phaseCollapsed, [phaseId]: !phaseCollapsed[phaseId] };
    setPhaseCollapsed(newStates);
    saveState('phaseCollapsed', newStates);
  };

  const openDrawer = (objective) => {
    setSelectedObjective(objective);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedObjective(null), 300);
  };

  const CollapsibleCard = ({ id, title, children, className = '' }) => {
    const isCollapsed = cardCollapsed[id];
    return (
      <div className={`bg-purple-900/30 rounded-lg border border-purple-700/30 mb-4 ${className}`}>
        <button
          onClick={() => toggleCard(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-900/40 transition-colors"
        >
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
        {!isCollapsed && <div className="px-6 pb-6">{children}</div>}
      </div>
    );
  };

  const currentPhase = phases[activePhase];
  const isPhaseCollapsed = phaseCollapsed[activePhase];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800/40 to-indigo-800/40 border-b border-purple-700/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Enterprise Project Architecture & Planning System
          </h1>
          <p className="text-purple-200 text-sm">
            System Architecture First | Gate-Based Governance | Continuous Documentation
          </p>
        </div>
      </div>

      {/* Phase Tabs */}
      <div className="bg-purple-900/20 border-b border-purple-700/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {Object.values(phases).map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`px-6 py-4 font-semibold transition-all border-b-2 ${
                  activePhase === phase.id
                    ? 'border-purple-400 bg-purple-900/30 text-purple-200'
                    : 'border-transparent hover:border-purple-600/50 text-gray-400 hover:text-gray-200'
                }`}
              >
                {phase.title.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Phase Container */}
        <div className="bg-purple-900/20 rounded-lg border border-purple-700/30 p-6 mb-6">
          <button
            onClick={() => togglePhase(activePhase)}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="text-left">
              <h2 className="text-2xl font-bold text-white">{currentPhase.title}</h2>
              <p className="text-purple-200 text-sm mt-1">
                <strong>Objective:</strong> {currentPhase.objective}
              </p>
            </div>
            {isPhaseCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </button>

          {!isPhaseCollapsed && (
            <>
              {/* High-Level Schema Card */}
              <CollapsibleCard id={`${activePhase}-schema`} title="High-Level Architecture Schema">
                <div className="bg-purple-950/50 rounded-lg p-6 border border-purple-700/20">
                  <pre className="text-purple-200 text-xs font-mono overflow-x-auto whitespace-pre">
                    {currentPhase.schema}
                  </pre>
                </div>
              </CollapsibleCard>

              {/* Objectives Data Table Card */}
              <CollapsibleCard id={`${activePhase}-objectives`} title="Phase Objectives">
                <div className="space-y-2">
                  {currentPhase.objectives.map((obj) => (
                    <div
                      key={obj.id}
                      className="flex items-center gap-4 p-3 bg-purple-950/30 rounded hover:bg-purple-950/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={objectiveStates[obj.id] || false}
                        onChange={() => toggleObjective(obj.id)}
                        className="w-5 h-5 rounded border-purple-600 text-purple-600 focus:ring-purple-500 cursor-pointer flex-shrink-0"
                      />
                      <div className="flex-1 flex items-center gap-3">
                        <span className="text-purple-400 font-mono text-sm flex-shrink-0">
                          {obj.number}
                        </span>
                        <span
                          className={`flex-1 ${
                            objectiveStates[obj.id]
                              ? 'line-through text-red-500'
                              : 'text-gray-200'
                          }`}
                        >
                          {obj.title}
                        </span>
                      </div>
                      <button
                        onClick={() => openDrawer(obj)}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded text-sm font-medium transition-colors flex-shrink-0"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </CollapsibleCard>

              {/* Phase Completion & Sign-off Card */}
              <CollapsibleCard id={`${activePhase}-signoff`} title="Phase Completion & Sign-Off">
                <div className="space-y-6">
                  {/* Completion Checklist */}
                  <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-700/20">
                    <h4 className="text-white font-semibold mb-3">Completion Checklist</h4>
                    <div className="space-y-2">
                      {[
                        { id: 'complete', text: `All objectives for ${currentPhase.title.split('—')[0].trim()} Complete` },
                        { id: 'qc', text: `All objectives for ${currentPhase.title.split('—')[0].trim()} QC Checked` },
                        { id: 'deliverables', text: `All deliverables for ${currentPhase.title.split('—')[0].trim()} Confirmed` }
                      ].map((check) => (
                        <label
                          key={check.id}
                          className="flex items-center gap-3 p-2 rounded hover:bg-purple-900/30 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={completionStates[`${activePhase}-${check.id}`] || false}
                            onChange={() => toggleCompletion(activePhase, check.id)}
                            className="w-5 h-5 rounded border-purple-600 text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <span className="text-gray-200">{check.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sign-off Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-700/20">
                      <h4 className="text-white font-semibold mb-3">Project Manager</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Name</label>
                          <input
                            type="text"
                            value={signoffs[activePhase]?.pmName || ''}
                            onChange={(e) => updateSignoff(activePhase, 'pmName', e.target.value)}
                            className="w-full px-3 py-2 bg-purple-950/50 border border-purple-700/30 rounded text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Date</label>
                          <input
                            type="date"
                            value={signoffs[activePhase]?.pmDate || ''}
                            onChange={(e) => updateSignoff(activePhase, 'pmDate', e.target.value)}
                            className="w-full px-3 py-2 bg-purple-950/50 border border-purple-700/30 rounded text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-700/20">
                      <h4 className="text-white font-semibold mb-3">Software Architecture Engineer</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Name</label>
                          <input
                            type="text"
                            value={signoffs[activePhase]?.saeName || ''}
                            onChange={(e) => updateSignoff(activePhase, 'saeName', e.target.value)}
                            className="w-full px-3 py-2 bg-purple-950/50 border border-purple-700/30 rounded text-white focus:outline-none focus:border-purple-500"
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">Date</label>
                          <input
                            type="date"
                            value={signoffs[activePhase]?.saeDate || ''}
                            onChange={(e) => updateSignoff(activePhase, 'saeDate', e.target.value)}
                            className="w-full px-3 py-2 bg-purple-950/50 border border-purple-700/30 rounded text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleCard>
            </>
          )}
        </div>
      </div>

      {/* Right Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-2/5 bg-gradient-to-b from-purple-900 to-indigo-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedObjective && (
          <div className="h-full flex flex-col">
            <div className="bg-purple-800/50 p-6 border-b border-purple-700/30 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Objective {selectedObjective.number}</h3>
                <p className="text-purple-200 mt-1">{selectedObjective.title}</p>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Description</h4>
                <p className="text-gray-200">{selectedObjective.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Tasks</h4>
                <ul className="space-y-2">
                  {selectedObjective.tasks.map((task, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-purple-400 flex-shrink-0">{idx + 1}.</span>
                      <span className="text-gray-200">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Acceptance Criteria</h4>
                <p className="text-gray-200 bg-purple-950/50 p-4 rounded border border-purple-700/20">
                  {selectedObjective.acceptance}
                </p>
              </div>

              {selectedObjective.dependencies.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Dependencies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedObjective.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-3 py-1 bg-purple-700/50 rounded-full text-sm text-purple-200"
                      >
                        Objective {phases[activePhase].objectives.find(o => o.id === dep)?.number}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Notes</h4>
                <p className="text-gray-200 italic">{selectedObjective.notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeDrawer}
        />
      )}
    </div>
  );
};

export default ProjectDocumentationSystem;
