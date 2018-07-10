import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import Store from 'state/Store';
import {
  toggleCaseStudiesMenu,
  setupNav,
  consideredLoading,
} from 'state/actions';
import Constants from 'lib/Constants';

class AboutContainer extends ContainerBase {
  view = import("views/AboutView");

  model = () => {
    consideredLoading(true);

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
      consideredLoading(false);
      return { aboutPage };
    }).catch(() => {
      consideredLoading(false);
    });
  }
}

export default AboutContainer;
