import { FeatureFlag } from 'components/core/enums';
import isProduction from './isProduction';

const PROD_FLAGS: Record<FeatureFlag, boolean> = {
  GENERAL_MEMBERSHIP_MINT: true,
  COLLECTORS_NOTE: true,
};

const DEV_FLAGS: Record<FeatureFlag, boolean> = {
  GENERAL_MEMBERSHIP_MINT: true,
  COLLECTORS_NOTE: true,
};

export const isFeatureEnabled = (flag: FeatureFlag) =>
  isProduction() ? PROD_FLAGS[flag] : DEV_FLAGS[flag];
