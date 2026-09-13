import common from './common.json';
import auth from './auth.json';
import profile from './profile.json';

const en = {
    ...profile,
    ...auth,
    ...common,
};

export default en;
