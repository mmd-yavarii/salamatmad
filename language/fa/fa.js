import common from './common.json';
import auth from './auth.json';
import profile from './profile.json';

const fa = {
    ...profile,
    ...auth,
    ...common,
};

export default fa;
