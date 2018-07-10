import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import { setupNav, consideredLoading } from 'state/actions';
import Constants from 'lib/Constants';

class HomeContainer extends ContainerBase {
  view = import("views/HomeView");

  model = () => {
    consideredLoading(true);

    setupNav({
      blurbMode: Constants.NavBlurbMode.HOME,
      meta: null,
    });

    return ContentfulData.getEntries({
      content_type: 'homePage',
      include: 2,
    }).then(res => {
      consideredLoading(false);
      return get(res, 'items', [])[0];
    }).catch(() => {
      consideredLoading(false);
    });
  }
}

export default HomeContainer;
