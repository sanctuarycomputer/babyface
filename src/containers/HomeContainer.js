import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import { setupNav } from 'state/actions';
import Constants from 'lib/Constants';

class HomeContainer extends ContainerBase {
  view = import("views/HomeView");

  model = () => {
    setupNav({
      blurbMode: Constants.NavBlurbMode.HOME,
      meta: null,
    });

    return ContentfulData.getEntries({
      content_type: 'homePage',
      include: 2,
    }).then(res => get(res, 'items', [])[0]);
  }
}

export default HomeContainer;
