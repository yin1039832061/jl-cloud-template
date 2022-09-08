import { axiosCreate } from '@emp/basic-core/js/axios';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export default axiosCreate(history);
