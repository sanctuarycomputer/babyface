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

const loadImage = url => {
  return new Promise(resolve => {
    const img = new window.Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = url;
  });
}

class StudiesContainer extends ContainerBase {
  view = import("views/StudiesShowView");

  model = () => {
    consideredLoading(true);

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

      let imagesLoaded = Promise.all(get(study, 'fields.images', []).map(image => {
        let url = get(image, 'fields.file.url');
        return loadImage(url);
      }));

      return imagesLoaded.then(() => {
        consideredLoading(false);
        return study;
      });
    }).catch(() => {
      consideredLoading(false);
    });
  };
}

export default StudiesContainer;
