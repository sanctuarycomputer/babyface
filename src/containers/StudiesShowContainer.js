import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import Store from 'state/Store';
import {
  toggleCaseStudiesMenu,
  setupNav,
} from 'state/actions';
import Constants from 'lib/Constants';

class StudiesContainer extends ContainerBase {
  view = import("views/StudiesShowView");

  model = () => {
    if (Store.getState().showCaseStudiesMenu) toggleCaseStudiesMenu();

    return ContentfulData.getEntries({
      content_type: 'study',
      include: 2
    }).then(res => {
      const slug = get(this, 'props.match.params.slug');
      const study = get(res, 'items', []).find(study => {
        return get(study, 'fields.slug') === slug;
      });

      setupNav({
        blurbMode: Constants.NavBlurbMode.DETAILS,
        meta: study,
      });

      return study;
    });
  };
}

export default StudiesContainer;
