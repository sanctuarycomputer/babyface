import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';

class HomeContainer extends ContainerBase {
  view = import("views/HomeView");

  model = () => {
    return ContentfulData.getEntries({
      content_type: 'homePage',
      include: 2,
    }).then(res => get(res, 'items', [])[0]);
  }
}

export default HomeContainer;
