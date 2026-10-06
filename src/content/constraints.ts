/**
 * SPEC §3.4 — claims that must not appear on this site, kept in the codebase
 * so a future edit does not reintroduce them by accident.
 *
 * "100% accuracy" for the Vietnamese command classifier is a *training set*
 * number, not a test-set number. A sharp interviewer will check, and the
 * answer costs more than the claim was ever worth.
 */
export const forbiddenClaims = [
  '100% accuracy — that is a training-set result, not a test-set result',
  '"AI Engineer" as the headline — the competitive edge is CAN and MISRA, not AI',
  '"Commercial" as a claim about licensing — describe technical scope only',
  'Coursera certificates presented as achievements rather than as the reason the on-device work is possible',
  'Any comparison with other candidates',
] as const;
