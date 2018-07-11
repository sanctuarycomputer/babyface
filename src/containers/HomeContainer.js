import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import { setupNav, consideredLoading, setKeyImage } from 'state/actions';
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

      const homePage = get(res, 'items', [])[0];

      setKeyImage(
        get(homePage, 'fields.images', [])[0]
      );

      return homePage;
    }).catch(() => {
      consideredLoading(false);
    });
  }
}

export default HomeContainer;
