import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';

class AboutContainer extends ContainerBase {
  view = import("views/AboutView");

  model = () => {
    return ContentfulData.getEntries({
      content_type: 'aboutPage',
      include: 2,
    }).then(res => get(res, 'items', [])[0]);
  }
}

export default AboutContainer;
