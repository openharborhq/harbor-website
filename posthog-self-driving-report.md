# PostHog Self-driving setup report

## Summary

PostHog Self-driving was configured for this web project. Session Replay, Error Tracking, and Support were enabled; health, error, and support signal sources were enabled; and a small scout troop was tuned for the site’s web traffic.

Findings will begin appearing in the [Self-driving inbox](https://us.posthog.com/project/617573/inbox) within about 30 minutes as fresh traffic and scheduled scout runs arrive.

## AI data processing

Approved by the wizard’s organization-level gate before setup began.

## GitHub

GitHub is already connected through the PostHog GitHub App. No additional GitHub setup was required or changed.

## Products enabled

| Product | Result | Web SDK check |
| --- | --- | --- |
| Session Replay | enabled | The existing `posthog.init` configuration has no `disable_session_recording: true` override. |
| Error Tracking | enabled | The existing `posthog.init` configuration has `capture_exceptions: true`. |
| Support | enabled | Support requires an inbound email, inbox, or Slack channel before support tickets can arrive. |

## Signal sources

| Source product | Source type | Result |
| --- | --- | --- |
| `signals_scout` | `cross_source_issue` | On by default; no opt-out row existed, so none was created. |
| `health_checks` | `health_issue` | Enabled. |
| `error_tracking` | `issue_created` | Enabled. |
| `error_tracking` | `issue_reopened` | Enabled. |
| `error_tracking` | `issue_spiking` | Enabled. |
| `conversations` | `ticket` | Enabled. |
| `session_replay` | `session_analysis_cluster` | Deliberately skipped; Replay Vision scanners are the supported route for replay findings. |

## Connected tools

No optional issue-tracker or external-work sources were selected. The interactive selection prompt timed out and was treated as a decline, so no data-warehouse sources or external responders were added.

| Tool family | Result |
| --- | --- |
| GitHub Issues, Linear, Jira, Sentry, Zendesk, and other optional integrations | Not used in this run; no responder was enabled. |

## Scout troop

The project has a verified budget of **100 runs per day**; **0** had been used at setup time and **100** remained. The current banner says: “Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.”

| Status | Scouts | Reason |
| --- | --- | --- |
| Enabled | `signals-scout-general` | Covers cross-product patterns and gaps not owned by a focused specialist. |
| Enabled | `signals-scout-web-analytics` | Best fit for this web-focused project: traffic, attribution, landing-page health, and web journeys. |
| Disabled | `signals-scout-error-tracking` | Covered by the native Error Tracking sources. |
| Disabled | `signals-scout-session-replay` | Covered by Replay Vision scanners once authentication is restored. |
| Disabled | All remaining built-in specialists | No evidence that their corresponding products or surfaces are in active use; keeping the troop selective avoids noisy, low-value runs. |
| Disabled | `signals-scout-inbox-validation` | There are no resolved Self-driving reports to validate yet. |

The remaining disabled specialists can be enabled later if the project adopts their surfaces: AI observability, anomaly detection, APM, Conversations, CSP violations, customer analytics, data pipelines, data warehouse, experiments, feature flags, insight alerts, logs, MCP tool calls, observability gaps, product analytics, Replay Vision, revenue analytics, skills store, surveys, tasks, and web vitals.

## Custom scouts

No custom scouts were created. Two candidates were proposed and the interactive prompt timed out, so they were treated as declined:

- **Homepage demo-to-install journey:** would watch whether visitors who start the homepage walkthrough continue to the installation guide, raising a finding only when the handoff weakens while demo engagement stays stable.
- **Documentation-to-install journey:** would watch whether active documentation readers progress to copying setup instructions or opening the installation guide, raising a finding only when that focused learning journey weakens despite stable documentation interest.

These candidates were based on the existing `product_walkthrough_started`, `documentation_page_selected`, `code_block_copied`, and `installation_guide_opened` instrumentation. Generic website health is already covered by the enabled web-analytics scout; error tracking and replay are routed through their dedicated pipelines. If a future custom scout becomes noisy, set `emit: false` on its scout configuration in PostHog to run it in dry-run mode.

## Replay Vision scanners

Replay Vision scanners were **not created**. A scanner is an LLM that watches individual session recordings on a schedule and pushes confirmed defects to the inbox; it is the only part of this setup that spends Replay Vision quota. Findings carry half weight and require corroboration before being promoted into a report.

| Monitor brief | Intended scope | Status |
| --- | --- | --- |
| Breakage monitor | The site’s key completion journey, scoped to the installation/documentation flow; would watch for visibly broken navigation, loading, code-copy, and installation-guide interactions. Sampling rate: 0.5. | Deferred: the Replay Vision API call failed because the available access token had expired. Existing scanner inventory and quota estimates could not be read. |
| Frustration monitor | Sessions containing `$rageclick` only; would watch for clear frustration with navigation, the homepage walkthrough, documentation controls, or installation actions. Sampling rate: 1.0. | Deferred: the available access token had expired before the scanner could be safely created. |

No recordings were observed during the earlier 30-day replay probe. Once scanner access is restored, the intended monitors can be created safely and will remain idle until recordings arrive.

## Files modified or created

| File | Change |
| --- | --- |
| `posthog-self-driving-report.md` | Created this setup report. |

No application source files were modified.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) so the enabled Support source can receive tickets.
- [ ] Re-authenticate the PostHog MCP connection or refresh its access token, then create the two deferred Replay Vision monitors and verify their projected credit usage.
- [ ] Optionally re-run setup to select external issue-tracker, support, or error-tracker integrations.
- [ ] Optionally re-run custom-scout selection to approve either of the two proposed adoption-journey monitors.

## What happens next

Fresh scout configurations are picked up by the coordinator within about 30 minutes and draw from the daily scout budget. As product traffic, errors, support conversations, and scout findings arrive, PostHog Self-driving clusters them into reports in the inbox; immediately actionable reports can begin coding tasks.

## References

- [PostHog Self-driving Signals documentation](https://posthog.com/docs/self-driving/signals)
- [PostHog signal-source documentation](https://posthog.com/docs/self-driving/inbox/sources)
- [PostHog Replay Vision documentation](https://posthog.com/docs/replay-vision)
