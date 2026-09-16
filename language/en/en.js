import common from './common.json';
import auth from './auth.json';
import profile from './profile.json';
import about from './aboout.json';
import support from './support.json';
import article from './articles.json';

const en = {
    ...article,
    ...support,
    ...about,
    ...profile,
    ...auth,
    ...common,
};

export default en;
