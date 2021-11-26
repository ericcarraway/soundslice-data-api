/**
 * this is our module's entry point
 *
 * it serves as a DI-wrapper to return our initialization function
 *
 * by passing `axios` as a dependency, we can more easily test `get-api-client-instance`
 */

import axios from 'axios';
import { getApiClientInstance as _getApiClientInstance } from './get-api-client-instance';

function getApiClientInstance({
  SOUNDSLICE_APPLICATION_ID,
  SOUNDSLICE_PASSWORD,
}: {
  SOUNDSLICE_APPLICATION_ID: string;
  SOUNDSLICE_PASSWORD: string;
}) {
  return _getApiClientInstance({
    axios,
    SOUNDSLICE_APPLICATION_ID,
    SOUNDSLICE_PASSWORD,
  });
}

export { getApiClientInstance };

// eslint-disable-next-line import/no-default-export
export default getApiClientInstance;
