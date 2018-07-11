import ContainerBase from "lib/ContainerBase";
import ContentfulData from 'lib/ContentfulData';
import get from 'utils/get';
import Store from 'state/Store';
import {
  toggleCaseStudiesMenu,
  setupNav,
  consideredLoading,
  setKeyImage,
} from 'state/actions';
import Constants from 'lib/Constants';
import loadImage from 'utils/loadImage';

class StudiesContainer extends ContainerBase {
  view = import("views/StudiesShowView");

  model = () => {
    consideredLoading(true);

    const mainInner = document.querySelector(".MainInner");
    if (mainInner) mainInner.scrollLeft = 0;

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

      setKeyImage(
        get(study, 'fields.images', [])[0]
      );

      let imagesLoaded = Promise.all(get(study, 'fields.images', []).filter(media => {
        return (media.fields.file.contentType !== "video/mp4");
      }).map(image => {
        let url = get(image, 'fields.file.url');
        return loadImage(url);
      }));

      imagesLoaded.then(() => {
        consideredLoading(false);
      });

      return study;
    }).catch(() => {
      consideredLoading(false);
    });
  };
}

export default StudiesContainer;
