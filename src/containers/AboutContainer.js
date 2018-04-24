import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import Store from 'state/Store';
import { toggleCaseStudiesMenu } from 'state/actions';

class AboutContainer extends ContainerBase {
  view = import("views/AboutView");

  model = () => {
    if (Store.getState().showCaseStudiesMenu) {
      toggleCaseStudiesMenu();
    }

    return ContentfulData.getEntries({
      content_type: 'aboutPage',
      include: 2,
    }).then(res => get(res, 'items', [])[0]);
  }
}

export default AboutContainer;
