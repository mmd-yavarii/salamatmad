import common from './common.json';
import auth from './auth.json';
import developer from './developer.json';
import profile from './profile.json';

const fa = {
    ...profile,
    ...developer,
    ...auth,
    ...common,
};

export default fa;
