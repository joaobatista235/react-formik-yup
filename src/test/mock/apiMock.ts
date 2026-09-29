import AxiosMockAdapter from 'axios-mock-adapter';

import { api } from '../../services/api';

export const apiMock = new AxiosMockAdapter(api);