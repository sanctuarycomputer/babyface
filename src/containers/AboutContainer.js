import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import Store from 'state/Store';
import {
  toggleCaseStudiesMenu,
  setupNav,
} from 'state/actions';
import Constants from 'lib/Constants';

class AboutContainer extends ContainerBase {
  view = import("views/AboutView");

  model = () => {
    if (Store.getState().showCaseStudiesMenu) toggleCaseStudiesMenu();

    setupNav({
      blurbMode: Constants.NavBlurbMode.EMAIL,
      meta: null,
    });

    return Promise.all([
      ContentfulData.getEntries({
        content_type: 'aboutPage',
        include: 2,
      }).then(res => get(res, 'items', [])[0]),
    ]).then(([aboutPage]) => {
      return { aboutPage };
    });
  }
}

export default AboutContainer;
